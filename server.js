
import express, { urlencoded, json } from 'express'
import cors from 'cors'
import { MongoClient as mongoClient } from 'mongodb'

const conStr = 'mongodb://127.0.0.1:27017'

let app = express()
app.use(cors())
app.use(urlencoded({
    extends: true  // binary data convert into object
}))
app.use(json()) //data converted into JSON

app.get("/", (req, res) => {
    res.send('<h1>Server started</h1>')
})

app.get("/users", async (req, res) => {
    const obj = await mongoClient.connect(conStr)
    let database = obj.db("E-commerce");
    let documents = await database.collection('users').find({}).toArray()
    res.send(documents)
    res.end() //it ends the response, otherwise response will active which load for memory
})

app.post("/register", async (req, res) => {
    const user = {
        userId: req.body.userId,
        userName: req.body.userName,
        password: req.body.password,
        age: parseInt(req.body.age),
        email: req.body.email,
        mobile: req.body.mobile,
    }
    const obj = await mongoClient.connect(conStr)
    const database = obj.db("E-commerce")
    database.collection('users').insertOne(user)
    console.log("Record Inserted")
    res.redirect('/users')
})


app.listen('5000')
console.log("server started : http://127.0.0.1:5000")

