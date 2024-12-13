const express = require('express');

const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const PORT = 5000;
const {mongoUrl} = require('./key.js');

app.use(cors())

require('./models/model')
app.use(express.json());
app.use(require("./routes/auth"))
mongoose.connect(mongoUrl)

mongoose.connection.on("connected", ()=>{
    console.log("MongoDB connected");
})
mongoose.connection.on("error", ()=>{
    console.log("MongoDB is not connected");
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
