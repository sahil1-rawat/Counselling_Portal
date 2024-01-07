import React, { useState } from 'react';
import '../styles/PswRecVerify.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { preventCopyPaste, securityQuestions } from '../Extra-Files/extraFile';
const PswRecVerify = () => {
  const url = process.env.REACT_APP_URL;

  const [EMAIL, setEmail] = useState('');
  const [security_question, setSecurityQuestion] = useState('');
  const [security_answer, setSecurityAnswer] = useState('');
  const { setPswToken } = useAuth();
  const navigate = useNavigate();
  const pswVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${url}/pswRecVerify`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ EMAIL, security_question, security_answer }),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setPswToken(data._id);
        navigate('/reset-password');
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='form-container'>
      <h2>Forgot Password</h2>
      <form onSubmit={pswVerify}>
        <div>
          <label htmlFor='EMAIL'>Email:</label>
          <input
            type='email'
            name='EMAIL'
            value={EMAIL}
            required
            onChange={(e) => setEmail(e.target.value)}
            onPaste={preventCopyPaste}
            onCopy={preventCopyPaste}
            onCut={preventCopyPaste}
          />
        </div>
        <div>
          <label htmlFor='security_question'>Security Question</label>
          <select
            name='security_question'
            id='security_question'
            required
            value={security_question}
            onChange={(e) => setSecurityQuestion(e.target.value)}>
            <option value=''>--Select--</option>
            {securityQuestions.map((question, index) => (
              <option key={index} value={question}>
                {question}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='security_answer'>Security Answer:</label>
          <input
            type='text'
            name='security_answer'
            id='security_answer'
            value={security_answer}
            onChange={(e) => setSecurityAnswer(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Continue</button>
      </form>
      <p>
        Remember your password? <Link to='/login'>Login</Link>
      </p>
    </div>
  );
};

export default PswRecVerify;
