import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';


const { PORT = 4000 } = process.env;
const { NODE_ENV } = process.env;

const app = express();


if (NODE_ENV !== 'production') {

}

app.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}`));