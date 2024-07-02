const fastifySetup = require("./setupfastify")
const Manager = require("./Manager")
const manager = new Manager()
const fastify = require('fastify')({ logger: true });

fastify.get("/", async (req, res) => {
  const {result} = await manager.rootCheck() //get result of root check

  if (result === 'root') {// is database api running
    return res.view("login", {})

  } else {
    return res.view("rootfail", {})
  }
})

fastify.post("/addtask", async (req, res) => {
  const {username, title, description, due_date} = req.body //deconstruct request body

  if (username === req.session.userName) { //is the user trying to add to their account or another

    const result = await manager.addTask(req.session.userName ,title, description, due_date)
    if (result.data) { //has task been added
      return res.view("add_task", {message: "Task added succesfully"})

    } else {
      return res.view("add_task", {message: "Task couldn't be added"}) //task hasnt been added
    }

  } else {
    return res.view("add_task", {message: "Can't add tasks to other users accounts"}) //user tried to use a different username other than their own
  }
})

fastify.get("/addtask/page", (req, res) => {
  res.view("add_task", {})
})


fastify.get("/signup/page", (req, res) => {
  res.view("sign_up", {})
})


fastify.post("/signup", async (req, res) => {
  const {username, password, passwordconfirm, name} = req.body

  if (password === passwordconfirm) { // passwords match
    const resp = await manager.addUser(username, password, name) // add user to the database
    return res.view("login", {}) // reiderict back to login page

  }
  return res.view("sign_up", {message: "Sorry the password didn't match"}) //return sign up with password mismatch message
})


fastify.get("/viewtasks", async (req, res) => {
  const task_list = await manager.getTasks(req.session.userName)//get tasks from the users username

  if (task_list.length > 0) { //does the user have tasks to display

    const new_task_list = manager.convertToJsObjFromJSON(task_list) //convert JSON from the db api to JS objects

    return res.view("view_tasks", {message: new_task_list})
  } else {
    return res.view("view_tasks", {message: "There are no tasks to display"})
  }
})

fastify.get("/homepage", (req, res) => {
  res.view("homepage", {userName: req.session.name})
})

fastify.post("/login", async (req, res) => {
  const {user, password, name} = req.body //extract username, password and name
  const resp = await manager.checkUserExists(user, password, name) //check if user exists
  
  if (resp.result === true) { //assume the user exists
    const name = await manager.getUsersName(user) //get their name
    req.session.userName = user
    req.session.name = name.result
    return res.view("homepage", {userName: name.result}) //redirect them to the homepage
  }

  return res.view("login", {message: "Sorry your details are incorrect/dont exists"}) //user dosent exists
})

fastify.get("/contact/page", (req, res) => {
  res.view("contact", {})
})

const start = async () => {
  try {
    fastifySetup(fastify)
    await fastify.listen({ port: 3030, host: "0.0.0.0"})
  } catch (e) {
    console.log(e)
  }
}

start()