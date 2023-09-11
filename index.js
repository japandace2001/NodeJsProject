const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

const port = process.env.PORT || 9999;
const app = express();



//parser which helps us to get the content passed by the client
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler)

app.listen(port, ()=>{
    console.log("server running on port", port)
});

// mongoose.connect('mongodb://127.0.0.1:27017/test')
//   .then(() => console.log('Connected!'));

const connectDb = async ()=>{
    try {
        const connect = await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log("Database Connected...",
        connect.connection.host,
        connect.connection.name);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
connectDb();

module.exports = connectDb