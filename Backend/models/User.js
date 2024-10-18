// User.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true // Ensure usernames are unique
    },
    email: {
        type: String,
        required: true, 
        unique : true// Ensure emails are unique
    },
    phone: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    annualSalary: {
        type: String,
        required: true
    },
    sourceOfIncome: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false // Optional field
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Automatically create timestamps for createdAt and updatedAt

const User = model('User', userSchema);
export default User;
