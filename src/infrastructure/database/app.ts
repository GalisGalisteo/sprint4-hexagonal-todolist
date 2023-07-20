import express from "express";
import bodyParser from 'body-parser';
import task_routes from './routes'

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// enrouter

app.use('/api', task_routes)

export default app;
