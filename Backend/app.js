import express from 'express';
import cors from 'cors';
import authRoutes from './Routes/auth.routes.js';
// ... other imports

const app = express();

// Updated CORS configuration
const corsOptions = {
    origin: [
        'http://localhost:5173',  // Local development
        'https://main.d8cer8r23ej4o.amplifyapp.com', // Your AWS Amplify domain
        /\.amplifyapp\.com$/ // Allow all subdomains of amplifyapp.com
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/v1', authRoutes);
// ... other routes

export default app; 