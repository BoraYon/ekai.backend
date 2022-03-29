require("dotenv").config();
require("./config/db").connect();
const books = require('./router/book') ;
const customers = require('./router/customer') ;
const orders = require('./router/order') ;
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const User = require("./model/user");
const Book = require("./model/book");
const Customer = require("./model/customer");
const Order = require("./model/order");
const orderItem = require("./model/orderItem");
const auth = require("./middleware/authentication");
const bodyParser = require("express");

const app = express();

app.use(express.json());
//app.use(cors());
//app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(cookieParser());


app.use('/book', auth, books);
app.use('/customer', customers); // must be added auth
app.use('/order', orders);       // must be added auth


// Register
app.post("/register", async(req, res) => {
    let encryptedPassword;
    try {
        const {first_name, last_name, email, password} = req.body;
        if (!(email && password && first_name && last_name)) {
           return res.status(400).send(req.body);
        }
        const existUser = await User.findOne({email});
        if (existUser) {
            return res.status(409).send("User Already Exist");
        }
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            first_name,
            last_name,
            email,
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
            {user_id: user._id, email},
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        user.token = token;

       return res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }

});

// Login
app.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;
        if (!(email && password)) {
           return res.status(400).send("All input is required");
        }
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            );
            user.token = token;
           return res.status(200).json(user).send();
        }
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
    }
});

//Home
app.post("/home", auth, (req, res) => {
   return res.status(200).send("Welcome home Frodo");
});



module.exports = app;
