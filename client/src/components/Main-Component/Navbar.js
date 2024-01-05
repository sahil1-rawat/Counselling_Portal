import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo1.jpg';
import { useAuth } from '../../contexts/AuthContext';
import '../styles/Navbar.css';
const Navbar = () => {
  const { isLoggedIn, candidate, loading } = useAuth();
  if (candidate.CNAME !== undefined) {
    var CNAME = candidate.CNAME.charAt(0);
  }
  return (
    <>
      <nav className='navbar'>
        <div className='logo'>
          <img src={logo} alt='Logo' className='logo-img' />
          <span className='logo-name'>Online Counselling Portal</span>
        </div>

        <div className='nav-links'>
          {isLoggedIn ? (
            <>
              {loading ? (
                <div className='loader'></div>
              ) : (
                <span className='name'>{CNAME}</span>
              )}

              <NavLink to='/logout' className='logout'>
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to='/register' className='register'>
                Register
              </NavLink>
              <NavLink to='/login' className='login'>
                Login
              </NavLink>
            </>
          )}
          <div className='bars'>&#9776;</div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
