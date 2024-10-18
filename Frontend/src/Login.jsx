import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const Login = () => {
  const navigate = useNavigate();
  
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', { emailOrUsername, password });

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/login', {
        email: emailOrUsername,
        password: password
      });

      // Handle successful login (optional)
      console.log('Login response:', response.data);
      navigate('/home'); // Navigate to home on successful login
    } catch (error) {
      // Handle error during login
      console.error('Error during login:', error);
      setErrorMessage('Invalid email or password.'); // Set error message to display
    }
  };

  const handleSignInClick = () => {
    navigate('/signin'); // Replace with your sign-up route
  };

  const styles = {
    page: {
      maxWidth: '600px',
      margin: '100px auto 0',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginBottom: '20px',
    },
    headerH1: {
      fontFamily: "'Noto Sans JP', sans-serif",
      color: '#333',
    },
    headerP: {
      textAlign: 'center',
      marginTop: '-5px',
      padding: '0 20px',
      fontFamily: "'Open Sans', sans-serif",
      color: '#666',
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    formContainer: {
      flex: '1',
      padding: '20px',
    },
    image: {
      width: '250px',
      height: 'auto',
      borderRadius: '10px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      borderRadius: '10px',
      padding: '1em',
      fontSize: '14px',
      marginBottom: '15px',
      transition: 'border-color 0.3s',
    },
    button: {
      padding: '1em',
      borderRadius: '10px',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    eye: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      color: '#007bff',
    },
    signInSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px',
      textAlign: 'center', // Center align text
    },
    link: {
      marginTop: '5px', // Adjusted margin for closer spacing
      color: '#007bff',
      textDecoration: 'none',
      cursor: 'pointer',
    },
    errorMessage: {
      color: 'red',
      textAlign: 'center',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.headerH1}>Log In</h1>
        <p style={styles.headerP}>Welcome back! Please log in to continue.</p>
      </div>
      <div style={styles.container}>
        <img src="https://i.ibb.co/TPF3Q38/login-image.png" alt="Login" style={styles.image} />
        <div style={styles.formContainer}>
          <form className="form" onSubmit={handleSubmit} style={styles.form}>
            <input
              style={styles.input}
              type="text"
              placeholder="Email or Username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
            <div style={{ position: 'relative' }}>
              <input
                style={styles.input}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span style={styles.eye} onClick={() => setShowPassword(!showPassword)}>
                <i className={`fa fa-eye${showPassword ? '-slash' : ''}`} aria-hidden="true"></i>
              </span>
            </div>
            {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>} {/* Error message display */}
            <button
              type="submit"
              style={styles.button}
              onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            >
              Log In <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </form>
          <div style={styles.signInSection}>
            <p>Are you a new user? <span style={styles.link} onClick={handleSignInClick}>Sign Up here</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
