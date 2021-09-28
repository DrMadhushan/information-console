from flask import Flask, jsonify, render_template, redirect
from flask_cors import CORS


# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

# random data (to be fetched)
items = {"item1": ("ItemName1", "Available"), "item3": ("ItemName3", "Not Available"),"item2": ("ItemName2", "Available")}
item = {"name":"Arduino UNO", "brand":"ARDUINO", "price":1200.00, "doc":"https://www.google.com", "tutorial":"https://www.youtube.com"}
currentUser = 'guest'

# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')

@app.route('/search', methods=['GET'])
def searchItem(itemName):
    return jsonify(items)

@app.route('/getItem', methods=['GET'])
def getItem(itemName):
    return jsonify(item)



if __name__ == '__main__':
    app.run()