import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Please enter product name"],
        trim: true
    },
    description:{
        type: String,
        required: [true,"Please enter product description"]
    },
    price:{
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [8,"Price cannot exceed 8 characters"]
    },
    images:[
        {
            url:{
                type: String,
                required: true
            }
        }
    ],
    category:{
        type: String,
        required: [true,"Please enter product category"]
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Product",productSchema);