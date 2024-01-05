import React, { useState } from 'react';
import '../styles/ResetPassword.css'; // Import the CSS file
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { preventCopyPaste } from '../Extra-Files/extraFile';

const ResetPassword = () => {
  const [PASSWORD, setPassword] = useState('');
  const [CONFIRM_PASSWORD, setConfirmPassword] = useState('');
  const { pswToken, setPswToken } = useAuth();
  const navigate = useNavigate();
  const ResetPasswords = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:8080/reset-password/${pswToken}`,
        {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            PASSWORD,
            CONFIRM_PASSWORD,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success('Password reset successfully');
        navigate('/login');
        setPswToken('');
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  return (
    <div className='update-password-container'>
      <h2>Set New Password</h2>
      <form method='PUT' onSubmit={ResetPasswords}>
        <div>
          <label htmlFor='PASSWORD'>New Password:</label>
          <input
            type='password'
            value={PASSWORD}
            name='PASSWORD'
            onChange={(e) => setPassword(e.target.value)}
            onPaste={preventCopyPaste}
            onCopy={preventCopyPaste}
            onCut={preventCopyPaste}
            required
          />
        </div>
        <div>
          <label htmlFor='CONFIRM_PASSWORD'>Confirm Password:</label>
          <input
            type='password'
            value={CONFIRM_PASSWORD}
            name='CONFIRM_PASSWORD'
            onChange={(e) => setConfirmPassword(e.target.value)}
            onPaste={preventCopyPaste}
            onCopy={preventCopyPaste}
            onCut={preventCopyPaste}
            required
          />
        </div>
        <button type='submit'>Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
