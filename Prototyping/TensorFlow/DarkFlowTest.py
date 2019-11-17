from darkflow.net.build import TFNet
import cv2
from PIL import Image


if __name__ == '__main__':

    options = {"model": "./cfg/yolo.cfg", "load": "./bin/yolo.weights", "threshold": 0.1}

    tfnet = TFNet(options)

    # INPUT IMAGE HERE
    imgcv = cv2.imread("./resources/test-img/test5.jpg")
    results = tfnet.return_predict(imgcv)
    print(results)
    chairs = []
    people = []

    for result in results:
        cv2.rectangle(imgcv,
                      (result["topleft"]["x"], result["topleft"]["y"]),
                      (result["bottomright"]["x"],result["bottomright"]["y"]),
                      (0, 255, 0), 4)

        text_x, text_y = result["topleft"]["x"] - 10, result["topleft"]["y"] - 10

        cv2.putText(imgcv, result["label"], (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2, cv2.LINE_AA)

    print("number of chairs: " + str(len(chairs)))
    print("number of people: " + str(len(people)))

    # Calculate if a chair is occupied by a person
    for chair in chairs:
        rectCentre = (int(round(chair["topleft"]["x"]+chair["bottomright"]["x"])/2), int(round((chair["topleft"]["y"]+chair["bottomright"]["y"])/2)));
        occupiedFlag = False
        for person in people:
            perRectCentre  = (int(round(person["topleft"]["x"]+person["bottomright"]["x"])/2), int(round((person["topleft"]["y"]+person["bottomright"]["y"])/2)));
            if (abs(rectCentre[0] - perRectCentre[0]) < 200 and abs(rectCentre[1] - perRectCentre[1]) < 200 ):
                occupiedFlag = True
                break
        if occupiedFlag:
            cv2.circle(imgcv, rectCentre, 30,(225, 0, 0), -1)
        else:
            cv2.circle(imgcv, rectCentre, 30,(0, 225, 0), -1)

    im = Image.fromarray(imgcv)

    # OUTPUT IMAGE HERE
    im.save('./resources/analyzed-img/analyzed5.png')

