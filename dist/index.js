"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const order_1 = __importDefault(require("./routes/order"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger = require("swagger-ui-express");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const swaggerOptions = {
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
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use(express_1.default.json());
app.use("/swagger", swagger.serve, swagger.setup(swaggerDocs));
// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });
app.listen(port, () => {
    console.log(`⚡[server]: Server is running at https://localhost:${port}`);
});
app.use('/', order_1.default);
