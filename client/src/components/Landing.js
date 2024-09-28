import React, { useEffect } from 'react'; 
import Login from './Login';
import '../globalStyle.css';
import WitsLogo from '../images/WitsLogo.png';
import FacebookIcon from '../images/FacebookIcon.png';
import InstagramIcon from '../images/InstagramIcon.jpeg';
import xIcon from '../images/xIcon.png';
import LinkedInIcon from '../images/LinkedInIcon.png';
import YouTubeIcon from '../images/YouTubeIcon.png';
import WSS from '../images/WSS.png';
import GreatHall from '../images/GreatHall.png';
import Tour from '../images/Tour.png';
import Parade from '../images/Parade.jpeg';
import CCDU from '../images/CCDU.jpg';
import WCCO from '../images/WCCO.jpeg';
import SRC from '../images/SRC.jpeg';
import ghosh from '../images/ghosh.jpeg';

const LandingPage = () => {

  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">
          <img src={WitsLogo} alt="App Logo" />
        </div>
        <nav className="nav-bar">
          <ul className="nav-links">
            <li className="nav-item">About</li>
            <li className="nav-item">Services</li>
            <li className="nav-item">Contacts</li>
            <li className="nav-item">Blog</li> 
          </ul>
          
          <li> <Login /> </li>
        </nav>
      </header>

      <main>
        <section className="welcome-section">
          <h2>Welcome to eWits!</h2>
        </section>

        <section className="carousel-container">
          <div className="carousel">
            <div className="carousel-item">
              <img src={Parade} alt="Slide 1" className="carousel-image" />
              <div className="carousel-description">
                <h3>Title 1</h3>
                <p>Description for image 1</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={CCDU} alt="Slide 2" className="carousel-image" />
              <div className="carousel-description">
                <h3>Title 2</h3>
                <p>Description for image 2</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={WCCO} alt="Slide 3" className="carousel-image" />
              <div className="carousel-description">
                <h3>Title 3</h3>
                <p>Description for image 3</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={SRC} alt="Slide 4" className="carousel-image" />
              <div className="carousel-description">
                <h3>Title 4</h3>
                <p>Description for image 4</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={ghosh} alt="Slide 5" className="carousel-image" />
              <div className="carousel-description">
                <h3>Title 5</h3>
                <p>Description for image 5</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={Tour} alt="Slide 6" className="carousel-image" />
              <div className="carousel-description">
                <h3>Title 6</h3>
                <p>Description for image 6</p>
              </div>
            </div>
          </div>
        </section>

        <section className="tour-section">
          <a href="https://www.wits.ac.za/campus-life/wits-virtual-tour/" target="_blank" rel="noopener noreferrer" className="clickable-image">
            <img src={GreatHall} alt="Description of image" className="tour-image" />
            <span className="hover-tour">Click for tour</span>
          </a>
        </section>

        <section id="about-section" className="about-section">
          <h3>About eWits</h3>
          <img src={WSS} alt="WSS" className="about-image" />
          <p>Welcome to eWits, your go-to platform for discovering and organizing exciting events on campus!...</p>
        </section>
      </main>

      <footer>
        <div className="footer-section-contact">
          <h4>Contact Us</h4>
          <p>General enquiries<br/>Tel: +27 11 717 1000<br/>Admission enquiries<br/>Tel: +27 11 717 1888</p>
        </div>
        <div className="footer-section">
          <h4>Find Us</h4>
          <p>1 Jan Smuts Avenue,<br/>Braamfontein 2000,<br/>Johannesburg,<br/>South Africa</p>
        </div>
        <div className="footer-section-quick">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="https://www.wits.ac.za/students/wits-bus-service/">Wits Transport</a></li>
            <li><a href="https://www.wits.ac.za/campus-life/security-on-campus/">Campus Control</a></li>
            <li><a href="https://www.wits.ac.za/campus-life/eateries/">Wits Eateries</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h4>Connect With Us</h4>
          <a href="https://www.facebook.com/witsuniversity" target="_blank" rel="noopener noreferrer"><img src={FacebookIcon} alt="Facebook" /></a>
          <a href="https://x.com/witsuniversity" target="_blank" rel="noopener noreferrer"><img src={xIcon} alt="X" /></a>
          <a href="https://www.instagram.com/wits__university/" target="_blank" rel="noopener noreferrer"><img src={InstagramIcon} alt="Instagram" /></a>
          <a href="https://www.linkedin.com/school/university-of-the-witwatersrand/posts/?feedView=all" target="_blank" rel="noopener noreferrer"><img src={LinkedInIcon} alt="LinkedIn" /></a>
          <a href="https://www.youtube.com/user/WitsWebmaster" target="_blank" rel="noopener noreferrer"><img src={YouTubeIcon} alt="YouTube" /></a>
        </div>
        <div className="copyright">
          <p>&copy; 2024 eWits. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;