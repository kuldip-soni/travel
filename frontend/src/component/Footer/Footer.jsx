import React from 'react';

function Footer(props) {
    return (
         <footer id="footer">
  <div className="container">
    <div className="row footer">
      <div className="col-lg-4 col-md-5 col-sm-5 col-12">
        <div className="footer-logo">
          <img src="./assets/image/Logo (1).png" alt="logo" />
        </div>
        <p className="sub-title">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          pharetra condimentum.
        </p>
      </div>
      <div className="col-lg-3 col-md-5 col-sm-5 col-12 quick-links">
        <h5>Contact Information</h5>
        <ul>
          <li>
            <a href="#">
              <i className="fa-solid fa-location-dot" />732 Despard St,
              Atlanta
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-comment" />info@traveller.com
            </a>
          </li>
          <li>
            <a href="#"> <i className="fa-solid fa-phone" />+62 6943 6956 </a>
          </li>
        </ul>
      </div>
      <div className="col-lg-2 col-md-5 col-sm-5 col-12">
        <h5>Quick Links</h5>
        <ul className="quick-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Tours</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div className="col-lg-2 col-md-5 col-sm-5 col-12">
        <h5>Follow Us</h5>
        <ul className="social-media">
          <li>
            <a href="#"><i className="fa-brands fa-facebook-f" /></a>
          </li>
          <li>
            <a href="#"><i className="fa-brands fa-twitter" /></a>
          </li>
          <li>
            <a href="#"><i className="fa-brands fa-youtube" /></a>
          </li>
          <li>
            <a href="#"><i className="fa-brands fa-instagram" /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>

    );
}

export default Footer;