import express, { urlencoded } from "express";
import cors from 'cors'
import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017"
const app = express()
app.use(cors())
app.use(urlencoded(
    { extended: true }
))
app.use(express.json());

// thIS IS  ALSO INCLUDED



app.get('/', (req, res) => {
    res.send("<h1>products Server</h1>")
})

// All products 

app.get('/allproducts', async (req, res) => {   // 1. 
    const obj = await MongoClient.connect(url)
    const database = obj.db("E-commerce")
    const document = await database.collection("products").find({}).toArray()
    res.send(document)
}) // 1

//single product
app.get("/products/:id", async (req, res) => {
    const product_id = parseInt(req.params.id)
    const obj = await MongoClient.connect(url)
    const database = obj.db("E-commerce")
    const document = await database.collection('products').find({ id: product_id }).toArray()
    res.send(document)
})


// add to cart

app.get("/cart/:id", async (req, res) => {
    try {
        const product_id = parseInt(req.params.id)
        const obj = await MongoClient.connect(url)
        const database = obj.db("E-commerce")
        const document = await database.collection('products').find({ id: product_id }).toArray()
        res.send(document)
    } catch (err) {
        console.log("Error: ", err)
    }
})

//Add products
app.post('/addProduct', async (req, res) => { //2.
    const values = {
        'id': parseInt(req.body.id),
        'image': req.body.image,
        'category': req.body.category,
        'description': req.body.description,
        'title': req.body.title,
        'price': parseInt(req.body.price),
        'available': (req.body.available == true) ? true : false,
    }
    const obj = await MongoClient.connect(url)
    const database = obj.db('E-commerce')
    await database.collection('products').insertOne(values)
    res.redirect("/products")
}) // 2

//update products
app.put('/updateProduct/:id', async (req, res) => { //3.
    const product_id = parseInt(req.params.id)
    const values = {
        'image': req.body.image,
        'title': req.body.title,
        'category': req.body.category,
        'description': req.body.description,
        'price': parseInt(req.body.price),
        'available': (req.body.available === "true") ? true : false,
    }

    const obj = await MongoClient.connect(url)
    const database = obj.db("E-commerce")
    await database.collection('products').updateOne({ id: product_id }, { $set: values })
    res.redirect("/products")
})//3

//sort products
app.get('/sort/:category', async (req, res) => {
    const product_category = req.params.category

    const obj = await MongoClient.connect(url)
    const database = obj.db("E-commerce")
    const document = await database.collection('products').find({ category: product_category }).toArray()
    res.send(document)
    res.end()
})



app.delete('/deleteproduct/:id', async (req, res) => { //4.
    console.log(`DELETE request received for product ID: ${req.params.id}`);
    let product_id = parseInt(req.params.id)
    const obj = await MongoClient.connect(url);
    const database = obj.db("E-commerce");

    try {
        const result = await database.collection("products").deleteOne({ id: product_id });
        console.log(result);
        if (result.deletedCount === 1) {
            res.send(`Product with ID ${product_id} deleted successfully`);
        } else {
            res.status(404).send(`Product with ID ${product_id} not found`);
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Internal Server Error");
    }
}); // 4





app.listen('5566') //5
console.log(`Server Started http://127.0.0.1:5566`)