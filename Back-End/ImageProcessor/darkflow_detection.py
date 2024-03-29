from darkflow.net.build import TFNet
import cv2
import json
from PIL import Image

options = {"model": "./cfg/yolo.cfg", "load": "./bin/yolo.weights", "threshold": 0.25}
tfnet = TFNet(options)


def analyze_img(img, count):
    # INPUT IMAGE HERE
    imgcv = cv2.imread(img)
    results = tfnet.return_predict(imgcv)
    print(results)
    chairs = []
    people = []
    tables = []
    jsonDict = { 'tables': {},
                 'seats': {},
                 'door': {"corner": "BL", "opens": "L"}}
    seatsDictArr = []
    tablesDictArr = []
    peopleDictArr = []
    
    for result in results:
        if (result["confidence"] > 0.25):
            print(result)
            if (result["label"] == 'chair'):
                chairs.append(result)
            if (result["label"] == 'person'):
                people.append(result)
                peopleDictArr.append(result)
            if (result["label"] == 'diningtable' or result["label"] == 'bed' or result["label"] == 'fridge'):
                tables.append(result)
            if (result["label"] == 'laptop' and (abs(result["topleft"]["y"] - result["bottomright"]["y"]) > 100)):
                tables.append(result)

            
            cv2.rectangle(imgcv,
                          (result["topleft"]["x"], result["topleft"]["y"]),
                          (result["bottomright"]["x"], result["bottomright"]["y"]),
                          (0, 255, 0), 4)

        text_x, text_y = result["topleft"]["x"] - 10, result["topleft"]["y"] - 10

        cv2.putText(imgcv, result["label"], (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2,
                    cv2.LINE_AA)

    print("number of chairs: " + str(len(chairs)))
    print("number of people: " + str(len(people)))

    for table in tables:
        tableDict = {}
        tableDict['xmin'] = round(table["topleft"]["x"])
        tableDict['ymin'] = round(table["topleft"]["y"])
        tableDict['xmax'] = round(table["bottomright"]["x"])
        tableDict['ymax'] = round(table["bottomright"]["y"])

        tablesDictArr.append(tableDict)

    tablesDictArr = sorted(tablesDictArr, key=lambda i: (i['xmin'], i['ymin']))

    distance = 400
    occupiedSeats = 0
    rerun = 0

    #eliminate duplicate people
    for person in peopleDictArr:
        rectCentre = (int(round(person["topleft"]["x"] + person["bottomright"]["x"]) / 2),
                          int(round((person["topleft"]["y"] + person["bottomright"]["y"]) / 2)))
        personX = rectCentre[0]
        personY = rectCentre[1]
        for nextPerson in peopleDictArr:
            rectCentre2 = (int(round(nextPerson["topleft"]["x"] + nextPerson["bottomright"]["x"]) / 2),
                          int(round((nextPerson["topleft"]["y"] + nextPerson["bottomright"]["y"]) / 2)))
            nextPersonX = rectCentre2[0]
            nextPersonY = rectCentre2[1]
            if ((personX != nextPersonX) and (personY != nextPersonY)):
                if (abs(personX - nextPersonX) < 250 and abs(personY - nextPersonY) < 250):
                    peopleDictArr.remove(nextPerson)
                    print("person removed!")
                    cv2.circle(imgcv, rectCentre, 30,(0, 225, 255), -1)

   
    people = peopleDictArr
    
    # Calculate if a chair is occupied by a person
    while True:

        seatsDictArr = []

        for chair in chairs:
            seatsDict = {}
            rectCentre = (int(round(chair["topleft"]["x"] + chair["bottomright"]["x"]) / 2),
                          int(round((chair["topleft"]["y"] + chair["bottomright"]["y"]) / 2)))
            occupiedFlag = False
            for person in people:
                perRectCentre = (int(round(person["topleft"]["x"] + person["bottomright"]["x"]) / 2),
                                 int(round((person["topleft"]["y"] + person["bottomright"]["y"]) / 2)))
                if abs(rectCentre[0] - perRectCentre[0]) < distance and abs(rectCentre[1] - perRectCentre[1]) < distance:
                    occupiedFlag = True
                    occupiedSeats += 1
                    break

            seatsDict['xcoord'] = rectCentre[0]
            seatsDict['ycoord'] = rectCentre[1]

            if occupiedFlag:
                cv2.circle(imgcv, rectCentre, 30, (225, 0, 0), -1)
                seatsDict['occupied'] = "true"
            else:
                cv2.circle(imgcv, rectCentre, 30, (0, 225, 0), -1)
                seatsDict['occupied'] = "false"

            seatsDictArr.append(seatsDict)

        if (len(people) != occupiedSeats) and rerun == 0:
            distance *= 1.25
            print("Number of people = ",len(people), " and number of occupied seats = ", occupiedSeats, ". Rerunning")
            rerun += 1
        else:
            break

    seatsDictArr = sorted(seatsDictArr, key=lambda i: (i['xcoord'], i['ycoord']))

    # eliminate duplicate chairs
    for seat in seatsDictArr: 
        seatX = seat['xcoord']
        seatY = seat['ycoord']
        for nextSeat in seatsDictArr:
            nextSeatX = nextSeat['xcoord']
            nextSeatY = nextSeat['ycoord']
            if ((seatX != nextSeatX) and (seatY != nextSeatY)):
                if (abs(seatX - nextSeatX) < distance and abs(seatY - nextSeatY) < distance):
                    seatsDictArr.remove(nextSeat)
    
    for table in tablesDictArr:
        tableCentre = (int(round(table['xmin'] + table['xmax']) / 2),
                          int(round((table['ymin'] + table['ymax']) / 2)))
        tableX = tableCentre[0]
        tableY = tableCentre[1]
        for nextTable in tablesDictArr:
            nextTableCentre = (int(round(nextTable['xmin'] + nextTable['xmax']) / 2),
                          int(round((nextTable['ymin'] + nextTable['ymax']) / 2)))
            nextTableX = nextTableCentre[0]
            nextTableY = nextTableCentre[1]
            if ((tableX != nextTableX) and (tableY != nextTableY)):
                if (abs(tableX - nextTableX) < distance and abs(tableY - nextTableY) < distance):
                    tablesDictArr.remove(nextTable)

    
    #Add occupied chair under a person if no chair is detected.
    for person in people:
        rectCentre  = (int(round(person["topleft"]["x"]+person["bottomright"]["x"])/2), int(round((person["topleft"]["y"]+person["bottomright"]["y"])/2)));
        for seat in seatsDictArr:
            seatX = seat['xcoord']
            seatY = seat['ycoord']
            personX = rectCentre[0]
            personY = rectCentre[1]
            if (abs(seatX - personX) < 400 and abs(seatY - personY) < 400):
                break;
            else:
                occupiedFlag = False
                for table in tables:
                    perRectCentre  = (int(round(table["topleft"]["x"]+table["bottomright"]["x"])/2), int(round((table["topleft"]["y"]+table["bottomright"]["y"])/2)));
                    if (abs(rectCentre[0] - perRectCentre[0]) < 300 and abs(rectCentre[1] - perRectCentre[1]) < 300 ):
                        occupiedFlag = True
                        print("Generated an occupied chair under person.")
                        break
                if occupiedFlag:
                    cv2.circle(imgcv, rectCentre, 30,(225, 0, 0), -1)
                    seatsDict['occupied'] = "true"

    im = Image.fromarray(imgcv)
    # OUTPUT IMAGE HERE
    im.save('./resources/analyzed-img/analyzed' + str(count) + '.png')
    jsonDict["tables"] = tablesDictArr
    jsonDict["seats"] = seatsDictArr
    print(json.dumps(jsonDict))

    return json.dumps(jsonDict)
