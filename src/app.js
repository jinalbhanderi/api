const express = require("express")
const app = express()
app.use(express.json())
const mongoose = require("mongoose")
const url = "mongodb+srv://jinal:jinal123@cluster0.kg20vuu.mongodb.net/api?retryWrites=true&w=majority"
const port = 9000
mongoose.connect(url).then(() => {
    console.log("db conected");
})


const userschema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

const User = new mongoose.model("user", userschema)

app.post("/users", async (req, resp) => {
    try {
        const data = await User(req.body)
        const user = await data.save()
        resp.send(user)
    } catch (error) {

    }

})
app.get("/users", async (req, resp) => {
    try {
        const data = await User.find()
        resp.send(data)
    } catch (error) {

    }
})
app.get("/users/:id", async (req, resp) => {
    const id = req.params.id
    try {
        const data = await User.findById(id)
        resp.send(data)

    } catch (error) {
        resp.send(error)
    }
})

app.delete("/users/:id", async (req, resp) => {
    const id = req.params.id
    try {
        const data = await User.findByIdAndDelete(id)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})

app.put("/users/:id", async (req, resp) => {
    id = req.params.id
    try {
        const data = await User.findByIdAndUpdate(id, req.body)
        resp.send(data)
    } catch (error) {
        resp.send(error)
    }
})





app.listen(port, (req, resp) => {
    console.log("server running on port" + port);
})