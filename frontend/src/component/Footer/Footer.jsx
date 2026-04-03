import React from 'react';
import logo from '../../../public/assets/image/Logo (1).png'


function Footer(props) {
    return (
         <footer id="footer">
  <div className="container">
    <div className="row footer">
      <div className="col-lg-4 col-md-5 col-sm-5 col-12">
        <div className="footer-logo">
          <img src={logo} alt="logo" />
        </div>
        <p className="sub-title">
         Making travel simple, affordable, and accessible for everyone. Explore, plan, and enjoy your journey with us.
        </p>
      </div>
      <div className="col-lg-3 col-md-5 col-sm-5 col-12 quick-links">
        <h5>Contact Information</h5>
        <ul>
          <li>
            <a href="#">
              <i className="fa-solid fa-location-dot" />IT Park,
              Songadh
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-comment" />info@traveller.com
            </a>
          </li>
          <li>
            <a href="#"> <i className="fa-solid fa-phone" />+63 6943 6956 </a>
          </li>
        </ul>
      </div>
      <div className="col-lg-2 col-md-5 col-sm-5 col-12">
        <h5>Quick Links</h5>
        <ul className="quick-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About Us</a></li>
          
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