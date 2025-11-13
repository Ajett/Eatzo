import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import UserRoutes from './routes/UserRoutes.js'



const app = express();
const Port = 5000;
app.use(express.json());
app.use(cors({
origin:['http://localhost:5173',"https://eatzo-1.onrender.com"]
}))

mongoose.connect('mongodb+srv://ak4882260_db_user:lKulZjoL6X1nRNY3@eatzo.f5kwpur.mongodb.net/').then(() => {
  console.log("Connect Successfully")
}).catch(() => {
  console.log("database error")
})

app.use('/api',UserRoutes)

app.listen(Port, () => {
  console.log("Server Start ")
})
