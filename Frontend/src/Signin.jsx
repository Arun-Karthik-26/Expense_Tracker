
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './App.css'; // Assuming your CSS is in App.css file

const Signin = () => {
  // State variables for the form fields
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    occupation: '',
    annualSalary: '',
    sourceOfIncome: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  // State for validation errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission status

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear any error messages as the user types
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
  
    // Validation logic
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.occupation) newErrors.occupation = 'Occupation is required';
    if (!formData.annualSalary) newErrors.annualSalary = 'Annual salary is required';
    if (!formData.sourceOfIncome) newErrors.sourceOfIncome = 'Source of income is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setIsSubmitting(true);

    const data = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      occupation: formData.occupation,
      annualSalary: formData.annualSalary,
      sourceOfIncome: formData.sourceOfIncome,
      address: formData.address,
      password: formData.password
    };
  
    try {
      // Send POST request to your API endpoint
      const response = await axios.post('http://localhost:5000/signin', data);
  
      console.log('Response:', response.data); // Handle response as needed
  
    } catch (error) {
      console.error('Error during form submission:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div>
      <div className="form-container" style={{ marginBottom: "70px" }}>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <p>Name:</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>} {/* Error message */}

          <p>Username:</p>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>} {/* Error message */}

          <p>Email:</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>} {/* Error message */}

          <p>Phone:</p>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>} {/* Error message */}

          <p>Occupation:</p>
          <input
            type="text"
            name="occupation"
            placeholder="Occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
          {errors.occupation && <p className="error">{errors.occupation}</p>} {/* Error message */}

          <p>Annual Salary:</p>
          <input
            type="number"
            name="annualSalary"
            placeholder="Annual Salary"
            value={formData.annualSalary}
            onChange={handleChange}
          />
          {errors.annualSalary && <p className="error">{errors.annualSalary}</p>} {/* Error message */}

          <p>Source of Income:</p>
          <input
            type="text"
            name="sourceOfIncome"
            placeholder="Source of Income"
            value={formData.sourceOfIncome}
            onChange={handleChange}
          />
          {errors.sourceOfIncome && <p className="error">{errors.sourceOfIncome}</p>} {/* Error message */}

          <p>Password:</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>} {/* Error message */}

          <p>Confirm Password:</p>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>} {/* Error message */}

          <p>Address:</p>
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            rows="4"
          />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
