const path = require("path")
const fastify = require("fastify")(
    {logger : true}
)
const Server_Manager = require("./Manager.js")

const manager = new Server_Manager()


fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
  });


fastify.register(require('point-of-view'), {
    engine: {
      ejs: require('ejs')
    },
    root: path.join(__dirname, '../frontend'),
    viewExt: 'ejs'
  });

  
fastify.get("/", (req, res) => {
    manager.rootCheck()
    res.view("login", {})
})

const start = async () => {
    try {
        await fastify.listen({port : 3000, host : "0.0.0.0"})
    } catch(e) {
        console.log(e)
    }
}

start()