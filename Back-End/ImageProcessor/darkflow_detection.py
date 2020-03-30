from darkflow.net.build import TFNet
import cv2
import json
from PIL import Image

options = {"model": "./cfg/yolo.cfg", "load": "./bin/yolo.weights", "threshold": 0.15}
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

    for result in results:
        if (result["confidence"] > 0.15):
            print(result)
            if (result["label"] == 'chair'):
                chairs.append(result)
            if (result["label"] == 'person'):
                people.append(result)
            if (result["label"] == 'diningtable' or result["label"] == 'bed' or result["label"] == 'fridge'):
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

    distance = 200
    occupiedSeats = 0
    rerun = 0
    
    # Calculate if a chair is occupied by a person
    while(True):
        for chair in chairs:
            seatsDict = {}
            rectCentre = (int(round(chair["topleft"]["x"] + chair["bottomright"]["x"]) / 2),
                          int(round((chair["topleft"]["y"] + chair["bottomright"]["y"]) / 2)))
            occupiedFlag = False
            for person in people:
                perRectCentre = (int(round(person["topleft"]["x"] + person["bottomright"]["x"]) / 2),
                                 int(round((person["topleft"]["y"] + person["bottomright"]["y"]) / 2)))
                if (abs(rectCentre[0] - perRectCentre[0]) < distance and abs(rectCentre[1] - perRectCentre[1]) < distance):
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

        if((len(people) != occupiedSeats) and rerun == 0):
            distance *= 1.25
            print("Number of people = ",len(people), " and number of occupied seats = ",occupiedSeats, ". Rerunning")
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


    im = Image.fromarray(imgcv)
    # OUTPUT IMAGE HERE
    im.save('./resources/analyzed-img/analyzed' + str(count) + '.png')
    jsonDict["tables"] = tablesDictArr
    jsonDict["seats"] = seatsDictArr
    print(json.dumps(jsonDict))

    return json.dumps(jsonDict)
