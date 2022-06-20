import React from 'react';

function Footer() {

  return (
    <footer>
      <div className="social-container">
        <ul className="social-icons">
          <li className='list-item'><a href="https://github.com/davezer" target="_blank" rel="noreferrer">Dave<i className="fa-brands fa-github"></i></a></li>
        </ul>
        <h4>©2022 mixTrip by Dave Oliverio</h4><br/>
      </div>
      <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open"></i></a></div>
    </footer>
  );
};

export default Footer;