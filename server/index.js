require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cors = require("cors");
const app = express();


connectDB();

//Middleware to parse JSON
app.use(cors());

app.use(express.json());

app.use('/api/auth', authRoutes);

//simple route
app.get('/', (req,res)=>{
    res.send('EdTech Backend is running');
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