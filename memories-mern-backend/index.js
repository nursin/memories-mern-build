import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

import postRoutes from './routes/posts.js';

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use('/posts', postRoutes);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


const PORT = process.env.PORT || 8000;

// db config 
const connection_url = 'mongodb+srv://admin:PynyxaoF1bhfT45k@cluster0.gw1qf.mongodb.net/tinderdb?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));