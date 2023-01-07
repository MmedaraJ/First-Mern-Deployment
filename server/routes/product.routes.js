const ProductController = require('../controllers/product.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = function(app){
    app.get('/api', ProductController.index);
    //use post req to create
    //authenticate every route except login and register, etc
    app.get('/api/products/:id', /* authenticate, */ ProductController.getProduct);
    app.post('/api/products/new', /* authenticate, */ ProductController.createProduct);
    app.get('/api/products', authenticate, ProductController.getAllProducts);
    app.put('/api/products/update/:id', /* authenticate, */ ProductController.updateProduct);
}
