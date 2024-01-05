import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

const Logout = () => {
  const { LogoutUser } = useAuth();
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    const performLogout = async () => {
      await LogoutUser();
      setLoggedOut(true);
    };

    performLogout();
  }, [LogoutUser]);

  useEffect(() => {
    if (loggedOut) {
      toast.success('Logged out successfully');
    }
  }, [loggedOut]);

  return <Navigate to='/login' />;
};

export default Logout;
