// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Main-Component/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Main-Component/Register';
import Login from './components/Main-Component/Login';
import { AuthProvider } from './contexts/AuthContext';
import Profile from './components/Main-Component/Profile';
import PswRecVerify from './components/Main-Component/PswRecVerify';
import ResetPassword from './components/Main-Component/ResetPassword';
import Logout from './components/Main-Component/Logout';
import PaymentCancel from './components/Main-Component/PaymentCancel';
import PaymentSuccess from './components/Main-Component/PaymentSuccess';
import ErrorPage from './components/Main-Component/ErrorPage';

function App() {
  const path = window.location.pathname;
  if (
    path === '/' ||
    path === '/register' ||
    path === '/login' ||
    path === '/reset-password'
  ) {
    localStorage.removeItem('token');
  }

  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Register />}></Route>
            <Route exact path='/register' element={<Register />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route exact path='/profile' element={<Profile />}></Route>
            <Route exact path='/print' element={<Profile />}></Route>
            <Route
              exact
              path='/payment-success/:id'
              element={<PaymentSuccess />}></Route>
            <Route
              exact
              path='/pswRecVerify'
              element={<PswRecVerify />}></Route>
            <Route
              exact
              path='/reset-password'
              element={<ResetPassword />}></Route>
            <Route exact path='/logout' element={<Logout />}></Route>
            <Route exact path='/cancel' element={<PaymentCancel />}></Route>
            <Route path='*' element={<ErrorPage />}></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
