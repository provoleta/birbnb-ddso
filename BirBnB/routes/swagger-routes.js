import swaggerUiExpress from 'swagger-ui-express'
import { readFile } from 'fs/promises'

const swaggerDocument = JSON.parse(
  await readFile(new URL('../../docs/api-docs.json', import.meta.url)),
)

const options = {
  swaggerOptions: {
    tryItOutEnabled: true,
    defaultModelsExpandDepth: 5,
    defaultModelExpandDepth: 5,
  },
  customCss:
    '.swagger-ui .model-box { display: inline-block; } .swagger-ui .model-toggle { display: none !important; }',
  customSiteTitle: 'BirBnB API Docs',
}

export default function registerSwaggerRoutes(app) {
  app.use('/api-docs', swaggerUiExpress.serve)
  app.get('/api-docs', swaggerUiExpress.setup(swaggerDocument, options))
}
