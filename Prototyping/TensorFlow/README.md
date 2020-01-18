#TensorFlow POC Experimentation

## TensorFlowHubTest: 
Uses RCNN Algorithm from: https://tfhub.dev/google/faster_rcnn/openimages_v4/inception_resnet_v2/1

## DarkFlowTest:

Uses YOLO (You Only Look Once) Algorithm from: https://pjreddie.com/darknet/yolo/

Dependencies: Python3, TensorFlow 1.0, Numpy, OpenCV.

Step 1: Clone https://github.com/thtrieu/darkflow to anywhere

Step 2: cd into darkflow and run `pip3 install .`

Step 3: Make sure you have your dependencies:  
```    
pip3 install tensorflow==1.14
pip3 install opencv-python
pip3 install numpy
```
Note: If you have TensorFlow 2 installed you may need to first uninstall TensorFlow  
`pip3 uninstall tensorflow`

Step 4:

Download the YOLOv2 608x608 weights into ./bin and name it yolo.weights
Download the file from: https://pjreddie.com/darknet/yolo/

Step 5: You should be good to go!  
- Download the image you want to analyze into resources/test-img and alter line 13  
- Alter line 30 if you want to change the save location of the analyzed img  
- Run the main function and watch the magic happen!

#####Setup script

If you are on a Linux machine you can use `setupscript.sh`

The AirChair github repo is currently private so make sure you clone it to the machine
you are working on before running the script.

From the same directory that the `AirChair` repo is in:
- run `./setupscript.sh`

When the script is complete you should be good to go!
