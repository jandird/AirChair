from flask import Flask
from flask import send_file
from picamera import PiCamera
from subprocess import call
import time

import logging
from datetime import datetime

app = Flask(__name__)

logFile = "log-" + datetime.now().strftime("%d-%m-%Y_%H-%M-%S") + ".log"
logging.basicConfig(filename="/home/pi/"+ logFile, level=logging.DEBUG)

@app.route('/')
def index():
    return "Welcome to AirChair"

@app.route('/capture')
def captureImage():
    file = '/home/pi/Desktop/picture.jpg'

    camera = PiCamera(resolution=(1920,1080))
    camera.start_preview()
    time.sleep(4)
    camera.capture(file)
    time.sleep(1)
    camera.stop_preview()
    camera.close()
    return send_file(file, mimetype='image/jpg')

@app.route('/webcam')
def captureWebcam():
    file = '/home/pi/Desktop/webcam.jpg'

    call(['fswebcam', '-d', '/dev/video0', '-r', '1280x720', '--no-banner', '%s' %file])

    return send_file(file, mimetype='image/jpg')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
