const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const EMAIL_REGEX = /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/;
const SALT_WORK_FACTOR = 10;

function emailValidation(val){
    return EMAIL_REGEX.test(val);
}

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [
            true,
            "Title is fucking required"
        ],
        minlength: [3, "PLease more title chars"]
    },
    price: {
        type: Number,
        required: [
            true,
            "Price is damn fucking required"
        ],
        min: [1, "Price cannot be less than 1"]
    },
    description: {
        type: String,
        required: [
            true,
            "Description are fucking required"
        ]
    },
    email: {
        type: String,
        required: [
            true,
            "Email is damn fucking required"
        ],
        validate: {
            validator: val => emailValidation(val),
            message: "Please enter a valid emails"
        }
    },
    password: {
        type: String,
        required: [
            true,
            "Passwords are fucking required"
        ],
        minlength: [8, "Password must be 8 characters or longer"]
    },
}, {timestamps: true});

/* https://mongoosejs.com/docs/tutorials/virtuals.html */
ProductSchema.virtual('confirmPassword')
  .get( () => this.confirmPassword )
  .set( value => this.confirmPassword = value );

//this runs before normal 'validate' runs
ProductSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

//this runs before the product is 'save'd
ProductSchema.pre('save', function(next) {
    bcrypt.hash(this.password, SALT_WORK_FACTOR)
    .then(hash => {
        this.password = hash;
        next();
    });
});

module.exports.Product = mongoose.model("Product", ProductSchema);