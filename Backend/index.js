import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './Models/db.js';
import bodyParser from 'body-parser';
import AuthRouter from './Routes/AuthRouter.js';
import ProductRouter from './Routes/ProductRouter.js'

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS and middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Mount routes
app.get('/', (req, res) => {
    res.send("API is running")
})
app.use('/api/v1/auth', AuthRouter);
app.use('/api/products', ProductRouter);  // Make sure this route is mounted

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;

