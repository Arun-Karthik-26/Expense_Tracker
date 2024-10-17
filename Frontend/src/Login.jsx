import React, { useState } from 'react'; // Keep this for any additional styles you may have

const Login = () => {
  // State variables for email/username and password
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log('Form submitted:', { emailOrUsername, password });
  };

  // Inline styles
  const styles = {
    page: {
      maxWidth: '350px',
      margin: '0 auto',
    },
    header: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    headerH1: {
      fontFamily: "'Noto Sans JP', sans-serif",
    },
    headerP: {
      textAlign: 'center',
      marginTop: '-5px',
      paddingLeft: '30px',
      paddingRight: '30px',
      fontFamily: "'Open Sans', sans-serif",
    },
    form: {
      marginTop: '10px',
      marginLeft: '10px',
      marginRight: '10px',
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      backgroundColor: '#fff',
      border: 'none',
      borderRadius: '10px',
      padding: '1em',
      fontSize: '13px',
      marginBottom: '10px',
    },
    placeholder: {
      color: 'rgb(172, 172, 172)',
      fontFamily: "'Open Sans', sans-serif",
    },
    button: {
      padding: '1em',
      borderRadius: '10px',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '15px',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    eye: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.headerH1}>Sign In</h1>
      </div>

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

        <button type="submit" style={styles.button}>
          Sign In <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
      </form>

      <img src="https://i.ibb.co/TPF3Q38/login-image.png" alt="Login" className="login-image" />
    </div>
  );
};

export default Login;
