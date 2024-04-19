import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter unique username"],
        unique: [true, "Username already exists"]
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        unique: false
    },
    email: {
        type: String,
        required: [true, "Please enter unique email"],
        unique: [true, "Email already exists"]
    },
    firstName: {type: String},
    lastName: {type: String},
    mobile: {type: String},
    address: {type: String},
    profile: {type: String},
    blogs: [{                                    
        type: mongoose.Types.ObjectId,
        ref: "Blog",
    }],
    products: [{
        type: mongoose.Types.ObjectId,
        ref: "Product",
    }]
});

export default mongoose.model('User', UserSchema);