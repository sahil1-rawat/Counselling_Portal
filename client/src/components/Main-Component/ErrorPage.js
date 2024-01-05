import React from 'react';
import '../styles/ErrorPage.css'; // Import the associated CSS file if using separate styling
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className='not-found-container'>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to='/' className='home-button'>
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
