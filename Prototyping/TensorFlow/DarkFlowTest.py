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

    for result in results:
        cv2.rectangle(imgcv,
                      (result["topleft"]["x"], result["topleft"]["y"]),
                      (result["bottomright"]["x"],result["bottomright"]["y"]),
                      (0, 255, 0), 4)

        text_x, text_y = result["topleft"]["x"] - 10, result["topleft"]["y"] - 10

        cv2.putText(imgcv, result["label"], (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2, cv2.LINE_AA)

    im = Image.fromarray(imgcv)

    # OUTPUT IMAGE HERE
    im.save('./resources/analyzed-img/analyzed5.png')

