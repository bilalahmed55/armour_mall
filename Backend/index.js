import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import response from './Models/db.js';
import bodyParser from 'body-parser';
import AuthRouter from './Routes/AuthRouter.js';
import ProductRouter from './Routes/ProductRouter.js'

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1/", AuthRouter)
app.use("/api/products", ProductRouter)

response();
const PORT = process.env.PORT;
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

