import React, { useEffect, useState } from 'react';
import '../styles/Profile.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import BTechCourses from './BTechCourses';
import { loadStripe } from '@stripe/stripe-js';
const Profile = () => {
  const url = process.env.REACT_APP_URL;

  const navigate = useNavigate();
  const [candidateData, setCandidateData] = useState('');
  const { token, setCandidate, loading, setLoading, isCourses } = useAuth(); // Destructuring variables from the useAuth() hook for authentication
  const [showLoader, setShowLoader] = useState(true);

  const ProfilePage = async () => {
    try {
      const res = await fetch(`${url}/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setCandidateData(data.candidateData);
        setCandidate(data.candidateData);
      } else {
        navigate('/login');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!token) {
      ProfilePage();
    } else {
      setTimeout(() => {
        ProfilePage();
        setShowLoader(false);
      }, 1500);
    }
  });

  //! Function to initiate a payment using Stripe API
  const makePayment = async () => {
    const public_key = process.env.REACT_APP_STRIPE_KEY;
    // Load Stripe.js asynchronously
    const stripe = await loadStripe(
      'pk_test_51OGwoeSIfvD8c4d5882YLhCH0KJpDoTAGyorhTLaZmw2APb186qNqqFFko2ywRqB8ZLqTqKPx6bQIng2EQkLqstw00hdXpzoqr'
    );

    // Prepare request body with candidate payment data
    const body = {
      payment: candidateData,
    };

    // Set headers for the POST request
    const headers = {
      'Content-Type': 'application/json',
    };

    // Send a POST request to the server to create a payment session
    const response = await fetch(`${url}/payment`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
    });

    // Retrieve session information for Stripe checkout
    const session = await response.json();

    // Redirect to Stripe checkout using the obtained session ID
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    // Handle Stripe redirect errors, if any
    if (result.error) {
      console.log(result.error);
    }
  };

  const PrintForm = () => {
    window.print();
  };

  return (
    <>
      {showLoader || loading ? (
        <div className='loader'>
          <div className='dot dot1'></div>
          <div className='dot dot2'></div>
          <div className='dot dot3'></div>
        </div>
      ) : (
        <div className='profile-container'>
          <div className='profile-section'>
            <div className='personal-information'>
              <h2>Personal Information</h2>
              <div className='image-info'>
                <img
                  src={require(`../../assets/image/${candidateData.image}`)}
                  alt='profile of candidateData'
                  width='150px'
                  height='150px'
                  id='image'
                />
              </div>
              <div>
                <strong>Application Number:</strong>{' '}
                <span>{candidateData.APPNO}</span>
              </div>
              <div>
                <strong>Candidate Name:</strong>
                <span>{candidateData.CNAME}</span>
              </div>
              <div>
                <strong>Father's Name:</strong>
                <span>Mr. {candidateData.FNAME}</span>
              </div>
              <div>
                <strong>Mother's Name:</strong>{' '}
                <span>Mrs. {candidateData.MNAME}</span>
              </div>
              <div>
                <strong>JEE Rank:</strong>
                <span>{candidateData.RANK}</span>
              </div>
              <div>
                <strong>Date of Birth:</strong> <span>{candidateData.DOB}</span>
              </div>
              <div>
                <strong>Gender:</strong> <span>{candidateData.GENDER}</span>
              </div>
              <div>
                <strong>Category:</strong>
                <span>{candidateData.CAT}</span>
              </div>
              <div>
                <strong>Courses Preferences:</strong>
                <BTechCourses />
              </div>
            </div>
          </div>

          <div className='profile-section'>
            <h2>Contact Information</h2>
            <div>
              <strong>Email:</strong> <span>{candidateData.EMAIL}</span>
            </div>
            <div>
              <strong>Phone Number:</strong> <span>{candidateData.PHONE}</span>
            </div>
          </div>

          <div className='profile-section'>
            <h2>Address Information</h2>
            <div>
              <strong>Address:</strong> <span>{candidateData.address1}</span>
              {candidateData.address2 !== '' ? (
                <span>,{candidateData.address2}</span>
              ) : (
                ''
              )}
            </div>

            <div>
              <strong>City:</strong> <span>{candidateData.city}</span>
            </div>
            <div>
              <strong>District:</strong> <span>{candidateData.district}</span>
            </div>
            <div>
              <strong>State:</strong> <span>{candidateData.state}</span>
            </div>
            <div>
              <strong>Zip Code:</strong> <span>{candidateData.zip}</span>
            </div>
          </div>
          {candidateData.paymentStatus ? (
            <div className='profile-section payment-details'>
              <h2>Payment Details</h2>
              <div>
                <strong>Payment Status:</strong> <span>Paid</span>
              </div>
            </div>
          ) : null}
          <div className='profile-section uploads'>
            <div className='images'>
              <div>
                <img
                  src={require(`../../assets/sign/${candidateData.sign}`)}
                  alt='Signature of CandidateData'
                  width='150'
                  id='sign'
                />
              </div>
              <div>
                <img
                  src={require(`../../assets/thumb/${candidateData.thumb}`)}
                  id='thumb'
                  alt='thumb expression of CandidateData'
                  width='150'
                />
              </div>
            </div>
          </div>
          {candidateData.paymentStatus === false ? (
            <button
              className='payment'
              disabled={!isCourses}
              onClick={makePayment}>
              {' '}
              Make Payment
            </button>
          ) : (
            <>
              <button className='print' onClick={PrintForm}>
                Print
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
