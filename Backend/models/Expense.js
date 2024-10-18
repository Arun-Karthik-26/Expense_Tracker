// models/Expense.js
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now }// Reference to the User model
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
