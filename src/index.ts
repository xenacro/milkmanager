import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import order from './routes/order';
import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerOptions } from "swagger-ui-express";
const swagger = require("swagger-ui-express");

dotenv.config();

const app: Express = express();
const port = process.env.PORT||5000;

const swaggerOptions: SwaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Milk Manager API Documentation",
      description: "Hiring Project for Kore.ai",
      contact: {
        name: "xenacro",
      },
      servers: [`http://localhost:${port}`],
    },
  },
  apis: ["./src/index.ts", "./src/routes/*.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(express.json());
app.use("/swagger", swagger.serve, swagger.setup(swaggerDocs));

// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

app.listen(port, () => {
  console.log(`⚡[server]: Server is running at https://localhost:${port}`);
});

app.use('/', order);