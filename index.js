import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./utills/mongoDBconnect.js"
import { authRoutes } from "./routes/authRoutes.js";
import { todoRoutes } from "./routes/todoRouts.js";
import "./utills/cronJob.js"

dotenv.config()
const app = express();

connectDB()


app.use(express.json())
app.use('/auth',authRoutes)
app.use('/todo',todoRoutes)



app.get('/', (req, res) => {
  res.send('Hello World!');
})


const port = process.env.port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})