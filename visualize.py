#!/bin/usr/env python3

# %%
from time import sleep
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import matplotlib.dates as mdates

# %%
REFRESH_IN_SECS = 30
PATH_FOR_PDF_OUTPUT = "/dockerMounts/caddy/site/jumpers/"
plt.rcParams["figure.figsize"] = (24,14) 

# %%
while True:
    try:
        print("start refresh pdf")
        data: pd.DataFrame = pd.read_pickle("jumpers.pkl.gzip", compression="gzip")
        # data set index to timestamp
        data.set_index("timestamp", inplace=True)
        data.drop(columns=["maxCheckinsAllowed"],  inplace=True)
        ax = data.plot(x_compat=True) 
        ax.xaxis.set_major_locator(mdates.HourLocator())               
        plt.yticks(np.arange(min(data.countCheckedInCustomer), max(data.countCheckedInCustomer)+1, 5))
        plt.savefig(PATH_FOR_PDF_OUTPUT + "jumpers.pdf")
        print("refreshed pdf")
    except Exception as e:
        print(e)
    finally:
        sleep(REFRESH_IN_SECS)
