import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './dbConfig.js/db.js'
import userRoutes from './routes/userRoutes.js'
dotenv.config();
connectDB()
const app = express();

// Middleware
app.use(cors(
    { origin: "*" }
));
app.use(express.json());

// Routes
app.use('/api/', userRoutes)

app.use('/', (req, res, next) => {
    res.send('Welcome to dummy');
})

// create server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
