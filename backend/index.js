// import express from 'express'
// import cors from 'cors'
// import mongoose from 'mongoose';
// import UserRoutes from './routes/UserRoutes.js'



// const app = express();
// const Port = 5000;
// app.use(express.json());
// app.use(cors({
// origin:['http://localhost:5173',"https://eatzo-1.onrender.com"]
// }))

// mongoose.connect('mongodb+srv://ak4882260_db_user:lKulZjoL6X1nRNY3@eatzo.f5kwpur.mongodb.net/').then(() => {
//   console.log("Connect Successfully")
// }).catch(() => {
//   console.log("database error")
// })

// app.use('/api',UserRoutes)

// app.listen(Port, () => {
//   console.log("Server Start ")
// })


import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from "url";
import UserRoutes from './routes/UserRoutes.js';

const app = express();
const Port = 5000;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://eatzo-1.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Database
mongoose.connect(
  "mongodb+srv://ak4882260_db_user:lKulZjoL6X1nRNY3@eatzo.f5kwpur.mongodb.net/"
)
  .then(() => console.log("DB Connected Successfully"))
  .catch(() => console.log("Database Error"));

// API
app.use("/api", UserRoutes);

// ---------- SERVE FRONTEND ----------

const frontendPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(frontendPath));

// FIX Express v5 wildcard route
app.get("/*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// -------------------------------------

app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
