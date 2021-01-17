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
    CIAList = ['students', meta]
    
    frame = pd.read_csv("results.csv", header=0)
    types = frame.dtypes.values
    indices = frame.dtypes.index.values
    new_list = []
    for i, index in enumerate(indices):
        new_list.append((index, types[i]))

    ## Get a list of attributes for table initiation
    CIAList.append(Column('Vehicle ID', Integer, primary_key=True))
    for name, column_type in new_list[1:]:
        if column_type == np.float64:
            CIAList.append(Column(name, Float))
        elif column_type == np.int64:
            CIAList.append(Column(name, Integer))
        elif column_type == np.object:
            CIAList.append(Column(name, String))

    CIA = Table(*CIAList) ## Create the table and unpack the array
    
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
    username, password = users["harris"]

    conn = psycopg2.connect(
        user=username,
        password=password,
        host=hostInfo["host"],
        port=26257,
        database=hostInfo["database"],
        sslmode='verify-full',
        sslrootcert=hostInfo["cert"]
    )
    t0 = time.time()
    conn.execute(CIA.insert(),
    frame.to_dict("records"))
    t1 = time.time()
    print("Time taken for bulk insert: %.2f" % (t1 - t0))


if __name__ == "__main__":
    main()