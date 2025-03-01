import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlaidLink } from 'react-plaid-link';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 100 });

    fetch("http://localhost:4000/api/create-link-token", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.link_token) {
          setLinkToken(data.link_token);
        } else {
          console.error("Error: No link token returned", data);
        }
      })
      .catch((error) => console.error("Error fetching link token:", error));
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token) => {
      console.log("Public Token received:", public_token);
      
      try {
        const response = await fetch("http://localhost:4000/api/exchange-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_token }),
        });

        const data = await response.json();
        if (data.access_token) {
          console.log("Access Token received:", data.access_token);
          
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } else {
          console.error("Error exchanging token:", data);
        }
      } catch (error) {
        console.error("Error exchanging public token:", error);
      }
    },
    onExit: (error) => {
      if (error) console.error("Plaid login exited with error:", error);
    },
  });

  return (
    <>
      <nav className="navbar">
        <div className="logo">Change For Change</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <div className="pattern-overlay"></div>

      <section className="hero">
        <h1>Donate Your Spare Change to Support Healthcare for All</h1>
        <p>Turn everyday purchases into life-changing donations. Every transaction rounds up to the nearest dollar, and the extra cents go directly to healthcare clinics supporting individuals without access to care.</p>
        <div className="cta-buttons">
          <button className="btn btn-primary" onClick={open} disabled={!ready}>
            Connect Your Bank Account
          </button>
          <button className="btn btn-secondary">Sign In</button>
        </div>

        <div className="benefits">
          <div className="benefit-card" data-aos="fade-up" data-aos-delay="0">
            <i className="fas fa-sync-alt benefit-icon"></i>
            <div className="benefit-content">
              <h3>Seamless & Automatic</h3>
              <p>Spare change is rounded up and donated automatically.</p>
            </div>
          </div>
          <div className="benefit-card" data-aos="fade-up" data-aos-delay="100">
            <i className="fas fa-chart-line benefit-icon"></i>
            <div className="benefit-content">
              <h3>Transparent Tracking</h3>
              <p>See your transactions and total donations in real time.</p>
            </div>
          </div>
          <div className="benefit-card" data-aos="fade-up" data-aos-delay="200">
            <i className="fas fa-sliders-h benefit-icon"></i>
            <div className="benefit-content">
              <h3>Full Control</h3>
              <p>Toggle on/off anytime and set your own donation frequency.</p>
            </div>
          </div>
          <div className="benefit-card" data-aos="fade-up" data-aos-delay="300">
            <i className="fas fa-heart benefit-icon"></i>
            <div className="benefit-content">
              <h3>Making an Impact</h3>
              <p>Every cent supports real people in need of healthcare.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div>
          <a href="#learn-more">Learn More</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
        <p>Currently in sandbox mode. All donations are processed securely through our trusted payment partners.</p>
      </footer>
    </>
  );
};

export default LandingPage;