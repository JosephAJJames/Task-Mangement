const path = require("path")
const fastify = require("fastify")(
    {logger : true}
)

fastify.register(require('point-of-view'), {
    engine: {
      ejs: require('ejs')
    },
    root: path.join(__dirname, '../frontend'),
    viewExt: 'ejs'
  });

fastify.get("/", (req, res) => {
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