"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const order_1 = __importDefault(require("./routes/order"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });
app.listen(port, () => {
    console.log(`⚡[server]: Server is running at https://localhost:${port}`);
});
app.use('/', order_1.default);
