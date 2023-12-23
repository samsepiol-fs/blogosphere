import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blogRouter from './routes/blog.route.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO).then(() => {
    console.log("connected to MongoDB!");
}).catch((err) => {
    console.log(err);
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

app.use(`/api/blog`, blogRouter);
app.use(`/api/auth`, authRouter);
app.use(`/api/user`, userRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
