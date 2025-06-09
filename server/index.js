require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();


//Middleware to parse JSON
app.use(express.json());

//simple route
app.get('/', (req,res)=>{
    res.send('Welcome to EdTech Platform API');
});


//Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/edtech-db';


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(()=> console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));


//Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});