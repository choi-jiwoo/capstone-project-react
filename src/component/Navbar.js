import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light pl-5'>
      <a className='navbar-brand' href='#'>
        Navbar
      </a>
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
        className='flex justify-end pr-10 collapse navbar-collapse'
        id='navbarNavAltMarkup'
      >
        <div className='navbar-nav'>
          <a className='nav-item nav-link active' href='#'>
            Home
          </a>
          <a className='nav-item nav-link' href='#'>
            Link1
          </a>
          <a className='nav-item nav-link' href='#'>
            Link2
          </a>
          <a className='nav-item nav-link' href='#'>
            Link3
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
