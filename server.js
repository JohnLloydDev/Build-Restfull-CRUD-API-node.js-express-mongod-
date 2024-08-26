const express = require('express')
const mongoose = require('mongoose');
const app = express()
const Product = require('./models/productmodels');
const port = 3000

app.use(express.json())

//routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog')
  })


//multipe products to get
app.get('/products', async(req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

//single product to get
app.get('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

//post a product
app.post('/products',async(req,res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
        
    }
})

//update
app.put('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with the id ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete
app.delete('/products/:id', async(req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with the id ${id}`})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.connect('mongodb+srv://admin:40Vj32niyuWac9jE@cluster0.p4vq3.mongodb.net/Api-Prac?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log("connected to mongodb");
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
  })
  .catch((error) => {
    console.log(error);
  });
