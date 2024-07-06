require('dotenv').config()

const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const notesRoute = require('./routes/notesRoute');

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Routing
app.use('/api/users/', userRoute);
app.use('/api/notes/', notesRoute);

//Connect mongoose
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(process.env.PORT, () => {
      console.log(`DB connected, listening to port ${process.env.PORT}`)
    })
  } catch (error){
    console.log(error)
  }
}

startServer()