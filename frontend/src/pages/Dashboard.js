import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [donationAmount, setDonationAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/transactions");
        const data = await response.json();

        if (data.transactions && Array.isArray(data.transactions)) {
          const formattedTransactions = data.transactions.map((tx) => {
            const amountSpent = parseFloat(tx.amount);
            const roundedUpAmount = Math.ceil(amountSpent) - amountSpent;
            return {
              date: tx.date || "Unknown Date",
              merchant: tx.merchant_name || tx.name || "Unknown Merchant",
              amountSpent: `$${amountSpent.toFixed(2)}`,
              roundedUp: roundedUpAmount > 0 ? `$${roundedUpAmount.toFixed(2)}` : "$0.00",
            };
          });

          const totalDonation = formattedTransactions.reduce(
            (sum, tx) => sum + parseFloat(tx.roundedUp.replace("$", "")), 0
          );

          setTransactions(formattedTransactions);
          setDonationAmount(totalDonation);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleSettingsClick = () => {
    console.log("Navigating to donation settings...");
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Change For Change</Link>
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
              {transactions.length > 0 ? (
                transactions.map((tx, index) => (
                  <tr key={index}>
                    <td>{tx.date}</td>
                    <td>{tx.merchant}</td>
                    <td>{tx.amountSpent}</td>
                    <td>{tx.roundedUp}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>No transactions found.</td>
                </tr>
              )}
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
