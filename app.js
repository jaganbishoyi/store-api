require('dotenv').config();
require('express-async-errors');

const express = require('express');
const { getAllProductsStatic } = require('./controllers/products');
const app = express();

const connectDB = require('./db/connect');
const productRouter = require('./routes/products');

const errorHandlerMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

// middleware
app.use(express.json());

// routers
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Product route</a>');
});

app.use('/api/v1/products', productRouter);

// products route

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening to port: ${port}`));
    } catch (error) {
        console.log(error);
    }
};

start();
