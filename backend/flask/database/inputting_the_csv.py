from sqlalchemy import create_engine
from sqlalchemy import Table, Column, Integer, Float, String, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import csv
import logging
import pandas as pd
import numpy as np
import time
        
def main():
    meta = MetaData()
    logging.basicConfig(filename="basic.log", level=logging.WARNING, format='%(levelname)s:%(message)s')
    users = {}
    hostInfo = {}
    ## Open files to fill in Cloud Connection Configuration
    with open("password_file.txt", encoding="utf-8") as file:
        for line in file:
            name, val = line.split("=")
            users[name] = val

    with open("host.txt", encoding="utf-8") as file:
        for line in file:
            name, val = line.split("=")
            hostInfo[name] = val

    username, password = users["harris"].split(",")
    engine_string = "cockroachdb://%s:%s@%s:26257/%s?sslmode=verify-full&sslrootcert=%s" % (username, password, hostInfo["host"], hostInfo["database"], hostInfo["cert"])
    print(engine_string)
    engine = create_engine(engine_string)
    Session = sessionmaker(bind=engine)
    session = Session() ## Instantiate the session whenever you want to 
    # start a conversation with the database.

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
    conn = engine.connect()
    t0 = time.time()
    conn.execute(CIA.insert(),
    frame.to_dict("records"))
    t1 = time.time()
    print("Time taken for bulk insert: %.2f" % (t1 - t0))


if __name__ == "__main__":
    main()