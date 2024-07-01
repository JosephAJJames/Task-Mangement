const dotenv = require('dotenv');
const path = require('path');
const fastifyStatic = require('@fastify/static');
const fastifyView = require('@fastify/view');
const fastifyCookie = require('@fastify/cookie');
const fastifySession = require('@fastify/session');


const fastifySetup = (fastify) => {
    
    dotenv.config()
    fastify.register(fastifyStatic, {
        root: path.join(__dirname, '../frontend'),
        prefix: '/public/', 
    })
      
    fastify.register(fastifyView, {
    engine: {
        ejs: require('ejs')
    },
    root: path.join(__dirname, 'views')
    })
      
    fastify.register(require('@fastify/formbody'))
      
    fastify.register(fastifyCookie);
    fastify.register(fastifySession, {
        secret: process.env.SECRET_KEY, 
        cookie: { secure: false },
        saveUninitialized: false,
        resave: false,
      })
      
    fastify.addHook('preHandler', async (request, reply) => {
        reply.locals = reply.locals || {}
        reply.locals.userName = request.session.userName || 'Guest'
    })
}

module.exports = fastifySetup