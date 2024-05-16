import Product from "../model/productModel.js";
import User from "../model/userModel.js";
import ApiFeatures from "../utils/apiFeatures.js";


//Create product
export const createProduct = async(req,res,next)=>{
    try {
        const product = await Product.create(req.body); // Create the product
        
        // Fetch the newly created product with full details
        const newProduct = await Product.findById(product._id);

        // Update the user's products array with the newly created product
        await User.updateOne(
            { _id: req.body.user }, // Find the user by their ID
            { $addToSet: { products: newProduct } } // Add the newly created product to the user's products array
        );

        res.status(201).json({
            success: true,
            product: newProduct // Return the newly created product with full details
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error });
    }
};

//Get all products
export const getAllProducts = async (req,res)=>{
    const resultPerPage = 9;
    try {
        const productsCount = await Product.countDocuments();
        const apiFeatures = new ApiFeatures(Product.find(),req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
        const products = await apiFeatures.query;
        res.status(201).json({
            success: true,
            products
        });
    } catch (error) {
        return res.status(500).send({ error }); 
    } 
};

//Get single product
export const getProductDetails = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('user', 'username firstName lastName mobile');;
        if (!product) {
            return res.status(404).send({ error: 'Cannot find the product' });

        }
        res.status(200).json({
            success: true,
            user: {
                _id: product.user._id,
                username: product.user.username,
                firstName: product.user.firstName,
                lastName: product.user.lastName,
                mobile: product.user.mobile
            },
            product
            
        }); 
    } catch (error) {
        return res.status(500).send({ error });
    }    
};

//Update product
export const updateProduct = async(req,res,next)=>{
    try {
        let product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).send({ error: 'Cannot find the product' });
        }
    
        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
    
        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        return res.status(500).send({ error });
    }
};

//Delete Product
export const deleteProduct = async(req,res,next)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).send({ error: 'Cannot find the product' });
        }
        await product.deleteOne();
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!"
        });
    } catch (error) {
        return res.status(500).send({ error });
    }
};