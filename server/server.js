//create all imports and then establish a connection 
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("pa2");
const users = db.collection("users");

client.connect();


//Was having trouble establishing a connection with the sever so used this to help test 
app.get("/", (req, res) => {
    res.json({ message: "Server Is Up" });
});

//SIGNUP
//doccument the credentials like said in the doc 
app.post("/signup", async (req, res) => {
    const f_name = req.body.f_name;
    const l_name = req.body.l_name;
    const username = req.body.username;
    const password = req.body.password;

    //if a credential is missing throw a feild requiered error
    if (!f_name || !l_name || !username || !password) {
        return res.json({ message: "All Fields Are Required" });
    }

    const existingUser = await users.findOne({ username: username });

    //exisiting user error
    if (existingUser) {
        return res.json({ message: "Username Already Exists" });
    }

    await users.insertOne({
        f_name: f_name,
        l_name: l_name,
        username: username,
        password: password
    });

    res.json({ message: "User Created Successfully" });
});


//LOGIN
app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //same thrown errors as before
    if (!username || !password) {
        return res.json({ message: "Username and password are required" });
    }

    const user = await users.findOne({ username: username });

    if (!user) {
        return res.json({ message: "Invalid username or password" });
    }

    if (user.password !== password) {
        return res.json({ message: "Invalid username or password" });
    }
    //login is sucsesfull if the name and pass match 
    res.json({ message: "Login successful" });
});

app.listen(9000, () => {
    console.log("Server running on port 9000");
});