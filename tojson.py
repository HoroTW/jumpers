#!/bin/usr/env python3

# %%
from time import sleep
import pandas as pd


# %%
REFRESH_IN_SECS = 30
PATH_FOR_OUTPUT = "/dockerMounts/caddy/site/jumpers/"

# %%
while True:
    try:
        print("start refresh")
        data: pd.DataFrame = pd.read_pickle("jumpers.pkl.gzip", compression="gzip")
        # data['timestamp'] = data['timestamp'].dt.strftime('%m-%d %H:%M')
        data.drop(columns=["maxCheckinsAllowed"],  inplace=True)
        data.to_json("jumpers.json",)
        print("refreshed")
    except Exception as e:
        print(e)
    finally:
        sleep(REFRESH_IN_SECS)
