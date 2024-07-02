import os
from dotenv import load_dotenv
import sqlalchemy

load_dotenv(dotenv_path="./.venv/private.env") #loading env file

root_password = os.getenv("PASSWORD") #get password for root user

engine = sqlalchemy.create_engine("mysql+pymysql://root:{}@127.0.0.1:3306/db".format(root_password), echo = True) #create db engine
