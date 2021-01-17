from flask import Flask
import json
from flask_cors import CORS, cross_origin
from flask import request
from collections import defaultdict
import sys
import psycopg2
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
columns = ["make", "model", "class", "fuel_type_1", "fuel_type_2", "annual_consumption_in_barrels_ft1", \
    "annual_consumption_in_barrels_ft2", "city_electricity_consumption", "highway_electricity_consumption", "wh_ft1", \
        "wh_ft2", "tailpipe_co2_ft1", "tailpipe_co2_ft2"]
NAME = "harris"
conn = None
curr = None

@app.before_first_request
def connectToDatabase():
    global hostInfo
    global users
    global conn
    global curr
    hostInfo = {}
    with open("./database/host.txt") as file:
        for line in file:
            key, value = line.split("=")
            hostInfo[key] = value

    users = {}
    with open("./database/password_file.txt") as file:
        for line in file:
            key, value = line.split("=")
            users[key] = value

    username, password = users[NAME].split(",")
    conn = psycopg2.connect(
        user=username,
        password=password,
        host="cia-db-8b5.gcp-us-west1.cockroachlabs.cloud",
        port=26257,
        database=hostInfo["database"],
        sslmode='verify-full',
        sslrootcert="./database/cia-db-ca.crt"
    )
    curr = conn.cursor()

@app.before_request
def checkConnectionAlive():
    global hostInfo
    global users
    global conn
    global curr
    if conn:
        curr = conn.cursor()
        try:
            curr.execute("SELECT 1")
        except psycopg2.OperationalError:
            pass
            


        ## Connection is closed if it's greater than 0 
        # https://stackoverflow.com/questions/1281875/making-sure-that-psycopg2-database-connection-alive
        if conn.closed > 0:
            username, password = users[NAME].split(",")
            conn = psycopg2.connect(
                user=username,
                password=password,
                host="cia-db-8b5.gcp-us-west1.cockroachlabs.cloud",
                port=26257,
                database=hostInfo["database"],
                sslmode='verify-full',
                sslrootcert="./database/cia-db-ca.crt"
            )
            curr = conn.cursor()

#
# @app.before_first_request():
# def startConnection()
@app.route('/')
def index():
    # global columns
    # global curr
    ## Pass back Fuel Type 1, Fuel Type 2, Year, Class, Annual Consumption in Barrels , Wh, CO2, 
    # curr.execute('SELECT ' + ', '.join(columns) + ' from defaultdb.public.results')
    # results = curr.fetchall()
    # data = defaultdict(list)
    # for row in results:
    #     for i, elem in enumerate(row):
    #         data[columns[i]].append(elem) ## maybe not a great idea to use defaultdict, but it should be fine
    return {"0": "Nothing to see Here"}

    # return data ## shuold be fine

@app.route('/data', methods=['GET'])    
@cross_origin()
def get_data():
    """
    Extract data from the SQL database upon a GET request from the React app based on make and model
    """
    global columns
    global curr
    make = request.args.get("make")
    model = request.args.get("model")
    make = "Alfa Romeo"
    model = "GT V6 2.5"
    print("SELECT " + ", ".join(columns) + " from defaultdb.public.results where make=%s and model=%s")  
    curr.execute("SELECT " + ", ".join(columns) + " from defaultdb.public.results where (make='%s' AND model='%s')" % (make, model))
    results = curr.fetchall()
    data = []
    for row in results:
        newRow = []
        for elem in row:
            newRow.append(str(elem))
        data.append(dict(zip(columns, newRow)))
    print(data)
    # Get data from cockcroachdb
    #Demo
    # db = { "0": [
    #     { "make": 'Alfa Romeo', "model": 'GT V6 2.5', "vehicle_id": 1984, "barrels": 10},
    #     { "make": 'Audi', "model": '4000', "vehicle_id": 19854, "barrels": 20},
    #     { "make": 'BMW', "model": '3 Series', "vehicle_id": 19854, "barrels": 30}
    # ]}
    # db = json.dumps(db)
    return {"0" : data}

@app.route('/image', methods=['GET'])    
@cross_origin()
def get_image():


    return

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5014, debug=True)