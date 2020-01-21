import requests
from flask import Flask
import darkflow_detection

app = Flask(__name__)


@app.route('/')
def index():
    return 'This is the image processor'


@app.route('/image-data')
def get_image_data():
    request = requests.get("http://192.168.43.87:5000/capture")
    with open('./resources/captured-img/captured.jpg', 'wb') as f:
        f.write(request.content)
    return darkflow_detection.analyze_img('./resources/captured-img/captured.jpg')


if __name__ == '__main__':
    app.run()
