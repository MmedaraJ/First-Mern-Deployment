const { response, request } = require("express");
const { Product: Product } = require("../models/product.model");
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports.index = (request, response) => {
    response.json({
        message: 'Hello World'
    });
}

module.exports.createProduct = (request, response) => {
    //register user
    const {
        title, 
        price,
        description,
        email,
        password,
        confirmPassword
    } = request.body;

    Product.create({
        title, 
        price,
        description,
        email,
        password,
        confirmPassword
    })
        .then(product => {
            //send jwt via cookie and log them
            logUserInAfterResistration(product, request, response);
        })
        .catch(err => response.status(400).json(err));
}

module.exports.getAllProducts = (request, response) => {
    Product.find({})
        .then(products => response.json(products))
        .catch(err => console.log(err));
}

module.exports.getProduct = (request, response) => {
    Product.findOne({
        _id: request.params.id
    })
        .then(product => response.json(product))
        .catch(err => response.json(err));
}

module.exports.updateProduct = (request, response) => {
    Product.findOneAndUpdate(
        {
            _id: request.params.id
        },
        request.body,
        {new: true}
    )
        .then(updatedProduct => response.json(updatedProduct))
        .catch(err => response.json(err));
}

const logUserInAfterResistration = (product, request, response) => {
    const productToken = jwt.sign({
        id: product._id
    }, process.env.SECRET_KEY);

    response
        .cookie(
            "productToken", 
            productToken, 
            process.env.SECRET_KEY, 
            //should be httpsOnly in prod
            {httpOnly: true}
        )
        .json({
            msg: "success", 
            product: product
        });
}

module.exports.logout = (request, response) => {
    res.clearCookie('productToken');
    res.sendStatus(200);
}

//login sequence after sign in 
/* module.exports.login = async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
 
    if(user === null) {
        // email not found in users collection
        return res.sendStatus(400);
    }
 
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
 
    if(!correctPassword) {
        // password wasn't a match!
        return res.sendStatus(400);
    }
 
    // if we made it this far, the password was correct
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);
 
    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, secret, {
            httpOnly: true
        })
        .json({ msg: "success!" });
} */