import sqlalchemy.sql

import db_setup
from sqlalchemy.orm import sessionmaker
from sqlalchemy import and_

import models
from models import User

from datetime import datetime

from json import dumps

Session = sessionmaker(bind = db_setup.engine)
session = Session()

def check_users_exists(user, name):
    return session.query(sqlalchemy.sql.exists().where(
        and_(
            models.User.username == user,
            models.User.name == name
        )
    )).scalar()

def add_user(username, password, userName) -> bool:
    if check_users_exists(username): #does the user already exist
        return False
    else:
        newUser = models.User(username=username, password=password, name=userName) #create new user entity
        with session as s:
            session.add(newUser) #add user entity to user table
            session.commit()
        return True


def add_task(username, title, description, due_date, ):
    current_date = datetime.now()
    user = session.query(User).filter_by(username=username).first()
    if not user: #user not found
        return None

    user = session.query(User).filter_by(username=username).first()
    UID = user.UID
    created = current_date.strftime('%Y-%m-%d')
    updated = created

    newTask = models.Tasks(title, description, UID, due_date, created, updated)
    session.add(newTask)
    session.commit()
    session.close()
    return True


def print_all():
    with session as s:
        users = s.query(models.User).all()
        for user in users:
            print(f"UID: {user.UID}, Username: {user.username}, Password: {user.password}, Name: {user.name}")

        tasks = s.query(models.Tasks).all()
        for task in tasks:
            print(f"TID: {task.TID} ")

def getNameOfUser(userName):
    with session as s:
        user = session.query(User).filter(User.username == userName).first()
        if user:
            return user.name


def getTasks(username):
    username_UID = session.query(models.User.UID).filter(models.User.username == username)
    if not username_UID:
        return None
    username_UID = username_UID.scalar()
    response = []
    tasks = session.query(models.Tasks).filter(models.Tasks.UID == username_UID)
    for task in tasks:
        task_dict = {
            "taskNum": task.TID,
            "title": task.title,
            "description": task.description,
            "due_date": str(task.due_date)
        }
        task_json = dumps(task_dict)
        response.append(task_json)

    return response