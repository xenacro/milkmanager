import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import order from './routes/order';

dotenv.config();

const app: Express = express();
const port = process.env.PORT||5000;
app.use(express.json());
// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

app.listen(port, () => {
  console.log(`⚡[server]: Server is running at https://localhost:${port}`);
});

app.use('/', order);