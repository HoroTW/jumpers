#!/bin/usr/env python3

# %%
from time import sleep
import pandas as pd
import matplotlib.pyplot as plt

# %%
REFRESH_IN_SECS = 30
PATH_FOR_PDF_OUTPUT = "./"

# %%
while True:
    try:
        print("start refresh pdf")
        data: pd.DataFrame = pd.read_pickle("jumpers.pkl.gzip", compression="gzip")
        # data set index to timestamp
        data.set_index("timestamp", inplace=True)
        data.plot()
        plt.savefig(PATH_FOR_PDF_OUTPUT + "jumpers.pdf")
        print("refreshed pdf")
    except Exception as e:
        print(e)
    finally:
        sleep(REFRESH_IN_SECS)
