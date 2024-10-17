import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

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

    // Validate each field
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

    // If there are errors, set the error state and return early
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true); // Indicate that submission has started

    try {
      // Send POST request to your API endpoint
      const response = await axios.post('http://localhost:5173/login', {
        username: formData.username,
        password: formData.password,
      });

      console.log('Response:', response.data); // Handle response as needed
      // You can navigate or show a success message here

    } catch (error) {
      console.error('Error during form submission:', error);
      // Handle error (e.g., show an error message)
    } finally {
      setIsSubmitting(false); // Reset the submission state
    }
  };

  // Inline styles
  const styles = {
    body: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: 'whitesmoke',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      boxSizing: 'border-box',
      minHeight: '100vh',
    },
    formContainer: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      width: '700px',
      marginTop: '10vh',
    },
    header: {
      textAlign: 'center',
      fontSize: '1.8em',
      color: '#333',
      marginBottom: '20px',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      margin: '12px 0',
      border: '2px solid #ddd',
      borderRadius: '5px',
      fontSize: '1em',
      color: '#333',
      boxSizing: 'border-box',
      transition: 'all 0.2s ease',
    },
    inputFocus: {
      borderColor: '#28a745',
      outline: 'none',
      boxShadow: '0 0 5px rgba(40, 167, 69, 0.5)',
    },
    textarea: {
      resize: 'vertical',
      height: '100px',
    },
    button: {
      width: '50%',
      padding: '12px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1.1em',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      transition: 'background-color 0.3s ease',
      margin: '20px auto 0 auto',
      display: 'block',
    },
    buttonHover: {
      backgroundColor: '#218838',
    },
    buttonActive: {
      backgroundColor: '#1e7e34',
    },
    error: {
      color: 'red',
      fontSize: '12px',
      marginTop: '-10px',
      marginBottom: '10px',
    }
  };

  return (
    <div style={styles.body}>
      <div className="form-container" style={styles.formContainer}>
        <h2 style={styles.header}>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <p>Name:</p>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={styles.error}>{errors.name}</p>}

          <p>Username:</p>
          <input
            style={styles.input}
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <p style={styles.error}>{errors.username}</p>}

          <p>Email:</p>
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}

          <p>Phone:</p>
          <input
            style={styles.input}
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p style={styles.error}>{errors.phone}</p>}

          <p>Occupation:</p>
          <input
            style={styles.input}
            type="text"
            name="occupation"
            placeholder="Occupation"
            value={formData.occupation}
            onChange={handleChange}
          />
          {errors.occupation && <p style={styles.error}>{errors.occupation}</p>}

          <p>Annual Salary:</p>
          <input
            style={styles.input}
            type="number"
            name="annualSalary"
            placeholder="Annual Salary"
            value={formData.annualSalary}
            onChange={handleChange}
          />
          {errors.annualSalary && <p style={styles.error}>{errors.annualSalary}</p>}

          <p>Source of Income:</p>
          <input
            style={styles.input}
            type="text"
            name="sourceOfIncome"
            placeholder="Source of Income"
            value={formData.sourceOfIncome}
            onChange={handleChange}
          />
          {errors.sourceOfIncome && <p style={styles.error}>{errors.sourceOfIncome}</p>}

          <p>Password:</p>
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}

          <p>Confirm Password:</p>
          <input
            style={styles.input}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p style={styles.error}>{errors.confirmPassword}</p>}

          <p>Address:</p>
          <textarea
            style={styles.input}
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            rows="4"
          />

          <button type="submit" disabled={isSubmitting} style={styles.button}>
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
