const fastify = require("fastify")(
    {logger : true}
)

fastify.get("/", (req, res) => {
    return {result : "root"}
})

const start = async () => {
    try {
        await fastify.listen({port : 3000, host : "0.0.0.0"})
    } catch(e) {
        console.log(e)
    }
}

start()