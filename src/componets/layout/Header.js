import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


const Header = (props) => {
  const {branding} = props;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
      <div className="container">
        <a href="/" className="navbar-brand">
          {branding}
        </a>
        <div>
          <ul className="navbar-nav r-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                <i className="fa fa-home mr-2"></i>Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link text-white">
                <i className="fa fa-question mr-2"></i>About
              </Link>
            </li>
            <li>
              <Link to="/contact/add" className="nav-link text-white">
                <i className="fa fa-plus mr-2"></i>Add Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

Header.defaultProps = {
  branding: 'My App'
};
Header.propTypes = {
  branding: PropTypes.string.isRequired
}

export default Header;
