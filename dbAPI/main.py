import helpers
from fastapi import FastAPI
import uvicorn
from pydantic import BaseModel


app = FastAPI()

class userModel(BaseModel):
    user: str
    password: str
    name: str

class taskModel(BaseModel):
    username: str
    title: str
    description: str
    due_date: str

@app.get("/")
async def root():
    return {"result": "root"}

@app.post("/checkuserexists")
async def login(details: userModel):
    result = helpers.check_users_exists(details.user, details.name)
    print(result)
    if result:
        res = {"result": True}
    else:
        res = {"result": False}
    print(res)
    return res

@app.post("/adduser")
async def addUser(details: userModel):
    if helpers.add_user(details.user, details.password, details.name):
         res = {"result": True}
    else:
        res = {"result": False}
    return res

@app.get("/getname")
async def getNameOfUser(username: str):
    name = helpers.getNameOfUser(username)
    return {"result": name}

@app.get("/getall")
async def getAll():
    helpers.print_all()
    return

@app.get("/gettasks")
async def getTasks(username):
    task_list = helpers.getTasks(username)
    return task_list

@app.post("/addtask")
async def addTask(task: taskModel):
    if helpers.add_task(task.username, task.title, task.description, task.due_date):
        res = {"result": True}
    else:
        res = {"result": False}
    return res

if __name__ == "__main__":
    uvicorn.run(app, host = "127.0.0.1", port = 8080)