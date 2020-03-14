from flask import Flask
from flask import send_file
from picamera import PiCamera
import time

app = Flask(__name__)

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
