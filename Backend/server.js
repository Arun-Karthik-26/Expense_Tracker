import express from 'express';
import cors from 'cors';
import dbconnect from './db/mongodbconnect.js';
import {signin,login, addExpense, getExpenses} from './controller/controller.js';


const app = express();
const port = process.env.PORT || 5000;

// Middleware to enable CORS and parse JSON
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Sample POST route to handle JSON data
dbconnect();

app.post('/signin',signin);
app.post('/login',login);
app.post('/addexpense',addExpense);
app.get('/getexpenses',getExpenses);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
