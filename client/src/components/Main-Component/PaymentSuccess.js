import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const { id } = useParams();

  useEffect(() => {
    const res = fetch(`http://localhost:8080/payment-success/${id} `, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then(() => console.log(res));
  });
  return <Navigate to='/print' />;
};

export default PaymentSuccess;
