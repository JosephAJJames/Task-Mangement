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
  console.log("a")
  res.view("sign_up", {});
})

fastify.post("/signup", async (req, res) => {
  const {username, password, passwordconfirm, name} = req.body
  if (password === passwordconfirm) {
    const resp = await manager.addUser(username, password, name)
    res.send(resp.data)
  }
})

fastify.post("/login", async (req, res) => {
  const {user, password, name} = req.body
  const resp = await manager.checkUserExists(user, password, name)
  if (resp) {
    console.log("resp is true")
    const name = await manager.getUsersName(user)
    return res.view("homepage", {userName: name})
  }
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