import React, { useState } from 'react';
import '../styles/Login.css';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { preventCopyPaste } from '../Extra-Files/extraFile';
const Login = () => {
  const url = process.env.REACT_APP_URL;
  const { storeTokenInLS, setCandidate, setLoading, setIsCourses, candidate } =
    useAuth();
  const navigate = useNavigate();
  const initialText = { EMAIL: '', PASSWORD: '' };
  const [candidates, setCandidateData] = useState(initialText);
  const handleInput = (event) => {
    const { name, value } = event.target;
    setCandidateData({ ...candidates, [name]: value });
  };
  const loginData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${url}/login`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(candidates),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('login success');
        storeTokenInLS(data.token);
        setCandidate('');
        setLoading(true);
        if (candidate !== '') {
          candidate.courses.length === 0
            ? setIsCourses(false)
            : setIsCourses(true);
        } else {
          data.candidate.courses.length === 0
            ? setIsCourses(false)
            : setIsCourses(true);
        }
        data.candidate.paymentStatus
          ? navigate('/print')
          : navigate('/profile');
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      resetData();
    }
  };
  const resetData = () => {
    setCandidateData(initialText);
  };
  return (
    <>
      <div className='login-container'>
        <form
          method='POST'
          className='login-form'
          onSubmit={loginData}
          onReset={resetData}>
          <h2>Candidate Login</h2>
          <div className='input-group'>
            <label htmlFor='EMAIL'>Username</label>
            <input
              type='email'
              id='EMAIL'
              name='EMAIL'
              required
              value={candidates.EMAIL}
              onChange={handleInput}
              onPaste={preventCopyPaste}
              onCopy={preventCopyPaste}
              onCut={preventCopyPaste}
            />
          </div>
          <div className='input-group'>
            <label htmlFor='PASSWORD'>Password</label>
            <input
              type='password'
              id='PASSWORD'
              name='PASSWORD'
              required
              value={candidates.PASSWORD}
              onChange={handleInput}
              onPaste={preventCopyPaste}
              onCopy={preventCopyPaste}
              onCut={preventCopyPaste}
            />
          </div>
          <div className='buttons'>
            <input type='submit' value='Login' />
            <input type='reset' value='Reset' />
          </div>
          <p className='register-link'>
            Don't have an account? <Link to='/register'>Register</Link>
          </p>
          <p className='forgot-password-link'>
            <Link to='/pswRecVerify'>Forgot Password?</Link>
          </p>
        </form>
      </div>
    </>
  );
};
export default Login;
