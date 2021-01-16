# cia
 HackTheNorth2020++ Submission. Car Impact Associator

## Setup Backend
* Setup virtual env in root folder: ```python3 -m venv env```
* Run ```./venv``` to enter virtual env
* ```pip install -r ./backend/flask/requirements.txt```

## Start the Flask Server
* cd to the backend flask folder
* Run ```python3 app.py 5012```, where 5012 should also be in App.js in the react frontend, http://localhost:5012/data
* Could also run ```FLASK_APP=app.py FLASK_ENV=development flask run --port 5012``` to dynamically reload on changes

## Start the react app
* Run ```npm install``` for dependencies
* Run ```npm start``` in frontend/cia dir