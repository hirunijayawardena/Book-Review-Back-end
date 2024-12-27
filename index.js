const express = require('express');
const mongoose = require('mongoose');
const Product = require('./model/product.model.js');

const app = express()

app.use(express.json());


app.get('/', (req, res) => {
    res.send("Hello from Node API updated"); //response is coming from node api
});

// app.post('/api/products', (req, res) =>{
//     res.send("Data Recieved");
// });

app.get('/api/products', async (req, res) => {
    try{
        const products = await Product.find({});
    }catch (error){
        res.status(500).json({message: error.message});
    }
});

app.post('/api/products', async (req, res)=>{
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch (error){
        res.status(500).json({message: error.message});
    }
});

app.get('/api/products/:id', async (req, res) => {
    try{

    }catch (error){
        res.status(500).json({message: error.message});
    }
});

mongoose.connect("mongodb+srv://admin:1234@backenddb.z8xdl.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() =>{
    console.log("Connected to database!");
    app.listen(3000, ()=> {
        console.log("Server is running on port 3000");
    });
})
.catch(() => {
    console.log("Connection failed!");
})