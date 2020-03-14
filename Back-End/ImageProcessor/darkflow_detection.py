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
    jsonDict = { 'tables': {},
                 'seats': {},
                 'door': {"corner": "BL", "opens": "L"}}
    seatsDictArr = []
    tablesDictArr = [{
      "xmin": 100,
      "ymin": 150,
      "xmax": 500,
      "ymax": 350
    }]

    for result in results:
        if (result["confidence"] > 0.25):
            print(result)
            if (result["label"] == 'chair'):
                chairs.append(result)
            if (result["label"] == 'person'):
                people.append(result)

            cv2.rectangle(imgcv,
                          (result["topleft"]["x"], result["topleft"]["y"]),
                          (result["bottomright"]["x"], result["bottomright"]["y"]),
                          (0, 255, 0), 4)

        text_x, text_y = result["topleft"]["x"] - 10, result["topleft"]["y"] - 10

        cv2.putText(imgcv, result["label"], (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2,
                    cv2.LINE_AA)

    print("number of chairs: " + str(len(chairs)))
    print("number of people: " + str(len(people)))


    # Calculate if a chair is occupied by a person
    for chair in chairs:
        seatsDict = {}
        rectCentre = (int(round(chair["topleft"]["x"] + chair["bottomright"]["x"]) / 2),
                      int(round((chair["topleft"]["y"] + chair["bottomright"]["y"]) / 2)))
        occupiedFlag = False
        for person in people:
            perRectCentre = (int(round(person["topleft"]["x"] + person["bottomright"]["x"]) / 2),
                             int(round((person["topleft"]["y"] + person["bottomright"]["y"]) / 2)));
            if (abs(rectCentre[0] - perRectCentre[0]) < 150 and abs(rectCentre[1] - perRectCentre[1]) < 150):
                occupiedFlag = True
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


    im = Image.fromarray(imgcv)
    # OUTPUT IMAGE HERE
    im.save('./resources/analyzed-img/analyzed' + str(count) + '.png')

    jsonDict["tables"] = tablesDictArr
    jsonDict["seats"] = seatsDictArr
    print(json.dumps(jsonDict))

    return json.dumps(jsonDict)