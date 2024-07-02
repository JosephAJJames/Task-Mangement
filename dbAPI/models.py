import db_setup
import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class User(Base):
     def __init__(self, UID, username, password, name):
          self.name = name
          self.password = password
          self.username = username
          self.UID = UID

     __tablename__ = "User"
     UID = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, nullable=False)
     username = sqlalchemy.Column(sqlalchemy.String(10), unique=True, nullable=False)
     password = sqlalchemy.Column(sqlalchemy.String(10), nullable=False)
     name = sqlalchemy.Column(sqlalchemy.String(15), nullable=False)


class Tasks(Base):
     def __init__(self, title, description, UID, due_date, created, updated):
          self.title = title
          self.description = description
          self.UID = UID
          self.due_date = due_date
          self.created = created
          self.updated = updated

     __tablename__ = "Tasks"
     TID = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, nullable=False)
     title = sqlalchemy.Column(sqlalchemy.String(10), nullable=False)
     description = sqlalchemy.Column(sqlalchemy.String(10), nullable=False)
     UID = sqlalchemy.Column(sqlalchemy.Integer, sqlalchemy.ForeignKey("User.UID"), nullable=False)
     due_date = sqlalchemy.Column(sqlalchemy.Date, nullable=False)
     created = sqlalchemy.Column(sqlalchemy.Date, nullable=False)
     updated = sqlalchemy.Column(sqlalchemy.Date, nullable=False)


Base.metadata.create_all(bind = db_setup.engine)