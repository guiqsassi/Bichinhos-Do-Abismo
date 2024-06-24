import { Express, Request, Response } from "express";
import express from "express"
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import {version} from "./package.json"
import schemas from "./schemas.json"
import fs from "fs"
import path from "path"
const swagger = express()

const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'schemas.json'), 'utf8'));
const docs = require("./schemas.json")
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      tittle: "Bichinhos da Ti",
      version
    },
    components:{
      schemas: require("./schemas.json")
    }
  }


const options = {
  swaggerDefinition: swaggerDefinition,
  apis: ["./src/routes/*.routes.ts"]
}

const swaggerSpec = swaggerJsdoc(options)
console.log(docs.User);

swagger.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default swagger
