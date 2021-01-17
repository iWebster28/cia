from flask import Flask
import json
from flask_cors import CORS, cross_origin
import sys
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def index():
    return "Index page"

@app.route('/data', methods=['GET'])    
@cross_origin()
def get_data():
    """
    Extract data from the SQL database upon a GET request from the React app
    """

    # Get data from cockcroachdb
    #Demo
    db = { "0": [
        { "make": 'Alfa Romeo', "model": 'GT V6 2.5', "vehicle_id": 1984, "barrels": 10},
        { "make": 'Audi', "model": '4000', "vehicle_id": 19854, "barrels": 20},
        { "make": 'BMW', "model": '3 Series', "vehicle_id": 19854, "barrels": 30}
    ]}
    # db = json.dumps(db)
    return db

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=sys.argv[1])