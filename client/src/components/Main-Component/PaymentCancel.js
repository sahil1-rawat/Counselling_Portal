import React from 'react';
import { Link } from 'react-router-dom';
import error from '../../assets/error-icon.png';
import '../styles/PaymentCancel.css';

const PaymentCancel = () => {
  return (
    <div className='payment-not-successful'>
      <div className='error-image'>
        <img src={error} alt='Error Icon' />
      </div>
      <div className='error-text'>
        <h1>Payment Not Successful</h1>
        <p>We're sorry, but your payment was not successful.</p>
        <p>Please check your details and try again later.</p>
        <Link to='/profile' className='back-button'>
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
