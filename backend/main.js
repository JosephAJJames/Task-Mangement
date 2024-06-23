const fastify = require('fastify')({ logger: true });
const Server_Manager = require("./Manager.js")
const manager = new Server_Manager()
const path = require('path');
const fastifyStatic = require('@fastify/static');
const fastifyView = require('@fastify/view');
const fastifyCookie = require('@fastify/cookie');
const fastifySession = require('@fastify/session');


fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../frontend'),
  prefix: '/public/', 
});

fastify.register(fastifyView, {
  engine: {
    ejs: require('ejs')
  },
  root: path.join(__dirname, 'views')
});

fastify.register(require('@fastify/formbody'))

fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  secret: 'my-very-long-secret-key-of-at-least-32-characters', 
  cookie: { secure: false },
  saveUninitialized: false,
  resave: false,
});

fastify.addHook('preHandler', async (request, reply) => {
  reply.locals = reply.locals || {}
  reply.locals.userName = request.session.userName || 'Guest'
});

fastify.get("/", (req, res) => {
  if (manager.rootCheck() === 'root') {
    return res.view("login", {})
  } else {
    return res.view("rootfail", {})
  }

});

fastify.get("/signup/page", (req, res) => {
  res.view("sign_up", {}); 
})

fastify.post("/addtask", async (req, res) => {
  const {title, description, due_date} = req.data
  const result = await manager.addTask(title, description, due_date)
  //session managment
})

fastify.post("/signup", async (req, res) => {
  const {username, password, passwordconfirm, name} = req.body
  if (password === passwordconfirm) { // passwords match
    const resp = await manager.addUser(username, password, name) // add user to the database
    return res.view("login", {}) // reiderict back to login page
  }
  return res.view("sign_up", {message: "Sorry the password didn't match"}) //return sign up with password mismatch message
})

fastify.post("/login", async (req, res) => {
  const {user, password, name} = req.body //extract username, password and name
  const resp = await manager.checkUserExists(user, password, name) //check if user exists
  if (resp.data.result === 'True') { //assume the user exists
    const name = await manager.getUsersName(user) //get their name
    req.session.userName = name.result //set session username
    return res.view("homepage", {userName: name.result}) //redirect them to the homepage
  }
  return res.view("login", {message: "Sorry your details are incorrect/dont exists"}) //user dosent exists
})

const start = async () => {
  try {
    await fastify.listen({ port: 3030, host: "0.0.0.0"});
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();