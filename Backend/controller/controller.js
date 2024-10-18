import bcrypt from 'bcrypt';
import User from '../models/User.js'; // Ensure you import your User model
import Expense from '../models/Expense.js';


export const signin = async (req, res) => {
  const { name, username, email, phone, occupation, annualSalary, sourceOfIncome, address, password } = req.body;
   console.log(req.body);
  try {
    // Check for missing fields
    if (!name || !username || !email || !phone || !occupation || !annualSalary || !sourceOfIncome || !address || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    console.log("hi");
   
    console.log("hello");
    // Ensure annualSalary is a valid number
    const salary = parseFloat(annualSalary);
    if (isNaN(salary)) {
      return res.status(400).json({ message: "Annual salary must be a number." });
    }
    console.log("mostlyy");
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      name,
      username,
      email,
      phone,
      occupation,
      annualSalary: salary,
      sourceOfIncome,
      address,
      password: hashedPassword, // Store the hashed password
    });
    console.log("lasttt");
    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
    console.log("done");
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("start login");
  console.log(email);
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email'});
    }
   console.log("email found");
    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    
    // Optionally, you can generate and return a JWT token here for user authentication
    console.log("done");
    // If credentials are valid, return user details (excluding the password)
    res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


export const addExpense = async (req, res) => {
  console.log("adding...");
  const { description, amount, date, category } = req.body;
  console.log(req.body);
  try {
    // Check for missing fields
    if (!description || !amount || !date || !category) {
      return res.status(400).json({ message: "All fields are required." });
    }
   
    // Ensure amount is a valid number
    const expenseAmount = parseFloat(amount);
    if (isNaN(expenseAmount)) {
      return res.status(400).json({ message: "Amount must be a number." });
    }

    // Create a new expense instance
    const newExpense = new Expense({ // Link to the user who created the expense
      description,
      amount: expenseAmount,
      date: new Date(date), // Ensure date is in a valid format
      category,
    });

    // Save the expense to the database
    await newExpense.save();
    res.status(201).json({ message: "Expense added successfully" });
    console.log("Expense added successfully");
  } catch (error) {
    console.error('Error during adding expense:', error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find(); // Fetch all expenses from the database
    res.status(200).json(expenses); // Respond with a 200 status and the expenses
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Server error while fetching expenses' }); // Handle server errors
  }
};
