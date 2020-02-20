import requests
from flask import Flask
from flask_cors import CORS
import darkflow_detection

app = Flask(__name__)
CORS(app)
count = 1


@app.route('/')
def index():
    return 'This is the image processor'


@app.route('/image-data')
def get_image_data():
    global count
    count += 1
    request = requests.get("http://raspberrypi.local:5000/capture")
    with open('./resources/captured-img/captured' + str(count) + '.jpg', 'wb') as f:
        f.write(request.content)
    return darkflow_detection.analyze_img('./resources/captured-img/captured' + str(count) + '.jpg', count)


if __name__ == '__main__':
    app.run()
