import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { Link } from 'react-router-dom'; // Import Link for routing

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [expenses, setExpenses] = useState([]); // State to hold expenses
  const [isFetching, setIsFetching] = useState(false); // State to handle loading state

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    resetForm(); // Reset the form when closing
  };

  // Function to reset form fields
  const resetForm = () => {
    setAmount('');
    setCategory('food');
    setDate('');
    setDescription('');
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const formattedDate = new Date(date).toISOString().slice(0, 10);
    // Create the expense object
    const expenseData = {
      description,
      amount: parseFloat(amount),
      date: formattedDate,
      category,
    };
    console.log(expenseData);
    try {
      const response = await axios.post('http://localhost:5000/addexpense', expenseData);
      console.log('Expense added:', response.data);
      closeModal(); // Close the modal after successful submission
      fetchExpenses(); // Fetch expenses after adding a new one
    } catch (error) {
      console.error('Error adding expense:', error);
      // Optionally, you can show an error message to the user
    }
  };

  // Function to fetch expenses
  const fetchExpenses = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get('http://localhost:5000/getexpenses'); // Update with your API endpoint
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setIsFetching(false);
    }
  };

  // Use useEffect to fetch expenses when the component loads
  useEffect(() => {
    fetchExpenses(); // Fetch expenses on page load
  }, []); // Empty dependency array ensures this runs only once on mount

  const styles = {
    navbar: {
      width: '100%',
      backgroundColor: '#1f1f1f',
      padding: '1rem 2rem',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: 1000,
    },
    navbarContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    navbarBrand: {
      fontSize: '1.75rem',
      color: 'white',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    navbarLinks: {
      listStyleType: 'none',
      display: 'flex',
      gap: '15px',
    },
    navbarLink: {
      color: 'white',
      textDecoration: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      fontSize: '1rem',
    },
    navbarLinkHover: {
      backgroundColor: '#575757',
      color: '#ddd',
    },
    table: {
      marginTop: '7rem',
      width: '100%',
      borderCollapse: 'collapse',

    },
    th: {
      borderBottom: '2px solid #ddd',
      padding: '20px',
      paddingLeft: '50px',
      backgroundColor: 'aliceblue',
      textAlign:"center"
    },
    td: {
      borderBottom: '2px solid #ddd',
      padding: '8px',
      paddingLeft :'50px'
    },
    date: {
       paddingLeft: '90px',
       borderBottom : '2px solid #ddd',
       backgroundColor : 'blue'
    },
  };

  return (
    <>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navbarContainer}>
          <a href="/" style={styles.navbarBrand}>Expense Tracker</a>
          <ul style={styles.navbarLinks}>
            <li>
              <a
                href="#"
                style={styles.navbarLink}
                onClick={openModal}
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.navbarLinkHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                Add Expenses
              </a>
            </li>
            <li>
              <a
                href="/"
                style={styles.navbarLink}
                onMouseEnter={(e) => (e.target.style.backgroundColor = styles.navbarLinkHover.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Modal for Adding Expenses */}
      {showModal && (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Expenses</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {/* Amount */}
                  <div className="mb-3">
                    <label htmlFor="amountInput" className="form-label">Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      id="amountInput"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)} // Update amount state
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="mb-3">
                    <label htmlFor="categorySelect" className="form-label">Category</label>
                    <select
                      className="form-select"
                      id="categorySelect"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)} // Update category state
                    >
                      <option value="food">Food</option>
                      <option value="project">Project</option>
                      <option value="movie">Movie</option>
                      <option value="medicalbill">Medical Bill</option>
                      <option value="groceries">Groceries</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div className="mb-3">
                    <label htmlFor="dateInput" className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="dateInput"
                      value={date}
                      onChange={(e) => setDate(e.target.value)} // Update date state
                      required
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label htmlFor="descriptionTextarea" className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="descriptionTextarea"
                      rows="3"
                      placeholder="Enter a description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)} // Update description state
                    ></textarea>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                    <button type="submit" className="btn btn-primary">Save Expense</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table to display expenses */}
      <div>
        <h2>Expenses</h2>
        {isFetching ? (
          <p>Loading...</p> // Loading state
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Amount</th>
                <th style={styles.th} >Date</th>
                <th style={styles.th}>Category</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses.map((expense, index) => (
                  <tr key={index}>
                    <td style={styles.td}>{expense.description}</td>
                    <td style={styles.td}>{expense.amount}</td>
                    <td style={styles.td}>{expense.date}</td>
                    <td style={styles.td}>{expense.category}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={styles.td}>No expenses found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Home;
