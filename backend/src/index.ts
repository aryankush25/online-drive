import createServer from './server'
import envConfigs from './utils/envConfig'

const port = envConfigs.port || 7000
const server = createServer()

// start fastify server
server.listen(port, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }

  console.log(`Server listening at -> http://localhost:${port}/`)
})
