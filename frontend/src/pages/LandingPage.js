import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }, []);

  const handleConnect = () => {
    navigate('/dashboard');
  };

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
          <button className="btn btn-primary" onClick={handleConnect}>Connect Your Bank Account</button>
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