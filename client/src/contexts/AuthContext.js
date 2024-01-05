import React, { useState, useContext } from 'react';
const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider(props) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [pswToken, setPswToken] = useState();
  const [loading, setLoading] = useState(true);
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem('token', serverToken);
  };
  const [candidate, setCandidate] = useState('');
  const [isCourses, setIsCourses] = useState(true);
  let isLoggedIn = !!token;
  // tackling the logout functionality
  const LogoutUser = () => {
    setToken('');
    return localStorage.removeItem('token');
  };

  const value = {
    storeTokenInLS,
    token,
    LogoutUser,
    loading,
    setLoading,
    isLoggedIn,
    candidate,
    setCandidate,
    isCourses,
    pswToken,
    setPswToken,
    setIsCourses,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
