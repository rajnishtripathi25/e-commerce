const express = require("express")
const cors = require("cors")
require("./database/conn")
const app = express();
const port = process.env.PORT || 5001
const ProductModel = require("./model/productSchema");
const UserModel = require("./model/user");



app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello from the backend")
})

app.post("/register", async (req, res) => {
    try {
        const userdata = new UserModel(req.body)
        let result = await userdata.save()
        result = result.toObject()
        delete result.password
        res.send(result)
    } catch (err) {
        res.status(400).send(err)
    }
})

app.post("/login", async (req, res) => {


    try {
        if (req.body.email && req.body.password) {
            let user = await UserModel.findOne(req.body).select("-password")
            if (user) {
                res.send(user)
            }
            else {
                res.send({ result: "No user found" })
            }
        }
        else {
            res.send("Email and password both are required")
        }
    }
    catch (err) {
        res.status(400).send(err)
    }
})

app.post('/add-product', async (req, res) => {
    try {
        let product = new ProductModel(req.body);
        let result = await product.save()
        res.send(result)
    } catch (err) {
        res.send(err)
    }
})
app.get('/products', async (req, res) => {
    try {

        let result = await ProductModel.find()
        res.send(result)
    } catch (err) {
        res.send(err)
    }
})

app.delete('/product/:id', async (req, res) => {
    try {

        const result = await ProductModel.findByIdAndDelete(req.params.id)
        res.send(result)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

app.patch('/update/:id', async (req, res) => {
    try {
        const result = await ProductModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!result) {
            return res.status(404).send("Document not found");
        }

        res.send(result);
    } catch (err) {
        res.status(400).send("Bad request");
    }
});

app.get("/search/:key", async (req, res) => {
    try {
       
        const result = await ProductModel.find({
            $or: [
                { name: { $regex: req.params.key } },
                { company: { $regex: req.params.key } },
                { category: { $regex: req.params.key } },
            ]
        })
        
        if (result)
            res.send(result)
        else
            res.send("No record found")
    } catch (err) {
        res.status(400).send("bad network")
    }
})

app.listen(port, () => console.log(`server is running on port ${port}`))