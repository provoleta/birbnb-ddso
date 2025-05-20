import swaggerUiExpress from 'swagger-ui-express'
import { readFile } from 'fs/promises'

const swaggerDocument = JSON.parse(
  await readFile(new URL('../../docs/api-docs.json', import.meta.url)),
)

export default function registerSwaggerRoutes(app) {
  app.use('/api-docs', swaggerUiExpress.serve)
  app.get('/api-docs', swaggerUiExpress.setup(swaggerDocument))
}
