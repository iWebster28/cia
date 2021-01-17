from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, Float, String, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import csv
import logging
import pandas as pd
import numpy as np
import time
import psycopg2
# Connect to the database.


        
def main():
    meta = MetaData()
    logging.basicConfig(filename="basic.log", level=logging.WARNING, format='%(levelname)s:%(message)s')
    CIAList = []
    
    frame = pd.read_csv("results.csv", header=0)
    
    types = frame.dtypes.values
    indices = frame.dtypes.index.values
    new_list = []
    for i, index in enumerate(indices):
        new_list.append((index, types[i]))

    ## Get a list of attributes for table initiation
    lower_score = lambda x: x.replace(" ", "_").replace("(", "").replace(")", "").lower()
    CIAList.append("vehicle_id INT PRIMARY KEY")

    ## For executemany statement later
    types = [] 
    typesDecorator = []
    types.append("vehicle_id")
    typesDecorator.append("%(vehicle_id)s")

    for name, column_type in new_list[1:]:
        if column_type == np.float64:
            CIAList.append("%s %s" % (lower_score(name), "decimal ( 10 , 5 )"))
        elif column_type == np.int64:
            CIAList.append("%s %s" % (lower_score(name), "INT"))
        elif column_type == np.object:
            CIAList.append("%s %s" % (lower_score(name), "VARCHAR ( 255 )"))

        types.append(lower_score(name))
        typesDecorator.append("%%(%s)s" % (lower_score(name)))

    # print(CIAList[0:10]) ## Make sure its general format is correct

################################ MAKE THE CONNECTION #############################
    hostInfo = {}
    with open("host.txt") as file:
        for line in file:
            key, value = line.split("=")
            hostInfo[key] = value

    users = {}
    with open("password_file.txt") as file:
        for line in file:
            key, value = line.split("=")
            users[key] = value
    username, password = users["harris"].split(",")

    conn = psycopg2.connect(
        user=username,
        password=password,
        host="cia-db-8b5.gcp-us-west1.cockroachlabs.cloud",
        port=26257,
        database=hostInfo["database"],
        sslmode='verify-full',
        sslrootcert="cia-db-ca.crt"
    )
    cur = conn.cursor()

    cur.execute("USE DEFAULTDB")
    newQuery = ",\n".join(CIAList)
    cur.execute("""CREATE TABLE IF NOT EXISTS results ( %s )""" % (newQuery))
    
    frame.columns = types
    types = ",".join(types)
    typesDecorator = ", ".join(typesDecorator)
    
    records = frame.to_dict("records")
    t0 = time.time()
    insert_statement = """INSERT INTO results(%s) VALUES (%s)""" % (types, typesDecorator)
    print(records[0])
    # cur.executemany(insert_statement, tuple(records))
    t1 = time.time()

    # print("Time taken for bulk insert: %.2f" % (t1 - t0))

    conn.commit()

if __name__ == "__main__":
    main()