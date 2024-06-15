const fastify = require('fastify')({ logger: true });
const Server_Manager = require("./Manager.js")
const manager = new Server_Manager()
const path = require('path');
const fastifyStatic = require('@fastify/static');
const fastifyView = require('@fastify/view');

// Register the fastify-static plugin
fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../frontend'),
  prefix: '/public/', // optional: default '/'
});

fastify.register(fastifyView, {
  engine: {
    ejs: require('ejs')
  },
  root: path.join(__dirname, 'views')
});

fastify.get("/", (req, res) => {
  manager.rootCheck();
  res.view("login", {});
});

fastify.get("/signup/page", (req, res) => {
  console.log("a")
  res.view("sign_up", {});
})

fastify.post("/signup", (req, res) => {
  return;
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