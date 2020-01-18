#!/bin/bash

sudo apt update
sudo apt install -y python3-pip

git clone https://github.com/thtrieu/darkflow

cd darkflow
pip3 install Cython
pip3 install numpy
pip3 install .

pip3 install tensorflow==1.14

#for GCP instances, installs some missing dependencies
sudo apt-get install -y libsm6 libxext6 libxrender-dev

pip3 install opencv-python
pip3 install pillow

cd ..

#git clone https://github.com/jandird/AirChair.git

wget https://pjreddie.com/media/files/yolov2.weights -O AirChair-dev/Prototyping/TensorFlow/bin/yolo.weights