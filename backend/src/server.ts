import Fastify, { FastifyInstance } from 'fastify'
import 'reflect-metadata'

import db, { DBInterface } from './plugins/db'
import { registerUserRoutes } from './routes/user'

export interface FastifyInstanceExtended extends FastifyInstance {
  db: DBInterface
}

const createServer = () => {
  const server: FastifyInstance = Fastify({ logger: true })

  server.register(db)

  // Server check
  server.get('/ping', async (request, reply) => {
    return { pong: 'it worked!' }
  })

  const extendedServer: any = server

  registerUserRoutes(extendedServer)

  return server
}

export default createServer
