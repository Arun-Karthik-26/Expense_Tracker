import express from "express";
import cors from 'cors';
import dbconnect from "./database/db.js";
import { user_details} from './controller/control.js';
import { userData } from "./controller/control.js";
import { userDelete } from "./controller/control.js";
import { updateData } from "./controller/control.js";

const app = express();
const port = 5000;
dbconnect();
app.use(cors());
app.use(express.json());

app.post("/customer", coustmer_details);
app.get("/userdata", userData);
app.delete('/userDelete/:email',userDelete);
app.put('/userUpdate/:email',updateData);
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
