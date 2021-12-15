import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='sticky w-full border-gray-900/10 bg-light'>
      <nav className='container-xl navbar navbar-expand-lg navbar-light'>
        <Link className='navbar-brand' to='/'>
          <span
            style={{ fontFamily: 'KyoboHandwriting2020A', fontSize: '2rem' }}
          >
            제주가치
          </span>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='justify-end collapse navbar-collapse'
          id='navbarNavAltMarkup'
        >
          <div className='navbar-nav'>
            <Link className='nav-item nav-link' to='/'>
              Home
            </Link>

            <Link className='nav-item nav-link' to='/about'>
              About
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
