import React from 'react';
import './Footer.css';
import logo from '../../../Icons/logo.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="top-row">
        <div className="branding">
          <p>Branding Staff</p>
        </div>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="footer_icons">
          <a href="https://uk-ua.facebook.com/" target="_blank" rel="noreferrer">
            <img src={require("../../../Icons/facebook.svg").default} alt="facebook" />
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            <img src={require("../../../Icons/linkedin.svg").default} alt="linkedin" />
          </a>
          <a href="https://twitter.com/?lang=uk" target="_blank" rel="noreferrer">
            <img src={require("../../../Icons/twitter.svg").default} alt="twitter" />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
            <img src={require("../../../Icons/youtube.svg").default} alt="youtube" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <img src={require("../../../Icons/instagram.svg").default} alt="instagram" />
          </a>
        </div>
      </div>
      <hr className="line" />
      <div className="footer-text">
        <p>2024 loT © Copyright all rights reserved, bla bla</p>
      </div>
    </footer>
  );
};

export default Footer;
