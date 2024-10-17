import user from "../models/User.js";

const user_details = async (req, res) => {
    try {
        const { name, email, mobile } = req.body;

        const details = new user({
            name,
            email,
            mobile
        });

         await details.save();
        console.log("inserted");
        res.status(200).send('Inserted Successfully');
    } catch (error) {
        console.error("Error inserting customer:", error);
        res.status(500).send('Internal Server Error');
    }
};

const Login=async(req,res) =>{
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If credentials are valid, return user details (excluding the password)
        res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export { user_details,Login};
