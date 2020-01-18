from flask import Flask
from flask import send_file
from picamera import PiCamera

app = Flask(__name__)

@app.route('/')
def index():
    return "Welcome to AirChair"

@app.route('/capture')
def captureImage():
    file = '/home/pi/Desktop/picture.jpg'

    camera = PiCamera()
    camera.capture(file)
    camera.close()
    return send_file(file, mimetype='image/jpg')
