from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return "Index page"

@app.route('/data', methods=['GET']) 
def get_data():
    """
    Extract data from the SQL database upon a GET request from the React app
    """
    return "This should grab info from the db"

if __name__ == '__main__':
    app.run(host='127.0.0.1', port='5001')