
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [donationAmount, setDonationAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const sampleTransactions = [
      { date: "02/28/2025", merchant: "Starbucks", amountSpent: "$4.75", roundedUp: "$0.25"},
      { date: "02/27/2025", merchant: "Amazon", amountSpent: "$19.21", roundedUp: "$0.79"},
      { date: "02/26/2025", merchant: "Target", amountSpent: "$12.99", roundedUp: "$0.01"}
    ];
    
    // Calculate total donation amount from rounded up values
    const totalDonation = sampleTransactions.reduce((sum, transaction) => {
      const roundedUpAmount = parseFloat(transaction.roundedUp.replace('$', ''));
      return sum + roundedUpAmount;
    }, 0);

    setDonationAmount(totalDonation);
    setTransactions(sampleTransactions);
  }, []);

  const handleSettingsClick = () => {
    console.log('Navigating to donation settings...');
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Change For Change</Link>
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <div className="dashboard-container">
      <header className="header-section">
        <h1>You have donated</h1>
        <div className="donation-amount">${donationAmount.toFixed(2)}</div>
      </header>

      <section className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Merchant</th>
              <th>Amount Spent</th>
              <th>Rounded Up Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td>{tx.date}</td>
                <td>{tx.icon} {tx.merchant}</td>
                <td>{tx.amountSpent}</td>
                <td>{tx.roundedUp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="controls">
        <button className="settings-button" onClick={handleSettingsClick}>
          Change Donation Settings
        </button>
      </div>
    </div>
    </>
  );
};



export default Dashboard;