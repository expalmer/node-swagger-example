const express = require('express')
const bodyParser = require('body-parser')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const path = require('path')

const routes = require('./routes')

const app = express()

app.use(bodyParser.json())


// -- setup up swagger-jsdoc --
const swaggerDefinition = {
  info: {
    title: 'Animals',
    version: '1.0.0',
    description: 'Animais de todos os tipos',
  },
  host: 'localhost:3000',
  basePath: '/',
}

const options = {
  swaggerDefinition,
  apis: [path.resolve(__dirname, 'routes.js')],
}
const swaggerSpec = swaggerJSDoc(options)

// Rotas para Documentação
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

// Usando ReDoc
app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/redoc.html'))
})

// Usando SwaggerUi
app.use('/docs2', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Rotas do App
routes(app)

app.listen(3000, () => {
  console.log('Server started at port 3000')
})



