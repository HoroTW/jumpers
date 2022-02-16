#!/bin/usr/env python3

# %%
from time import sleep
import requests
import pandas as pd

# %%
URL = "https://www.jumpers-fitness.com/club-checkin-number/11/Jumpers.JumpersFitnessTld"
QUERY_TIME_IN_MINUTES = 10
ERROR_RETRY_TIME_IN_SECS = 60

# %%
try:
    data = pd.read_pickle("jumpers.pkl.gzip", compression="gzip")
except FileNotFoundError:
    data = pd.DataFrame()

# %%
while True:
    try:
        response = requests.get(URL)
        json = response.json()
        json["timestamp"] = pd.Timestamp.now()
        data = data.append(json, ignore_index=True)
        data.to_pickle("jumpers.pkl.gzip", compression="gzip")
        print(f"got new data at {pd.Timestamp.now()}, {len(data)} rows")
        sleep(QUERY_TIME_IN_MINUTES * 60)
    except Exception as e:
        print(e)
        sleep(ERROR_RETRY_TIME_IN_SECS)
