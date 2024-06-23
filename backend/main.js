const fastify = require('fastify')({ logger: true });
const Server_Manager = require("./Manager.js")
const manager = new Server_Manager()
const path = require('path');
const fastifyStatic = require('@fastify/static');
const fastifyView = require('@fastify/view');

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

fastify.get("/", (req, res) => {
  manager.rootCheck();
  res.view("login", {});
});

fastify.get("/signup/page", (req, res) => {
  res.view("sign_up", {}); 
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