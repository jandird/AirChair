import requests
from flask import Flask
from flask_cors import CORS
import darkflow_detection

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return 'This is the image processor'


@app.route('/image-data')
def get_image_data():
    request = requests.get("http://192.168.43.87:5000/capture")
    with open('./resources/captured-img/captured1.jpg', 'wb') as f:
        f.write(request.content)
    return darkflow_detection.analyze_img('./resources/captured-img/captured1.jpg')


if __name__ == '__main__':
    app.run()
