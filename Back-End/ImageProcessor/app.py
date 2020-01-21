import requests
from flask import Flask
import darkflow_detection

app = Flask(__name__)


@app.route('/')
def index():
    return 'This is the image processor'


@app.route('/image-data')
def get_image_data():
    # img = requests.get("Enter URL Here")
    return darkflow_detection.analyze_img("./resources/captured-img/test.jpg")


if __name__ == '__main__':
    app.run()
