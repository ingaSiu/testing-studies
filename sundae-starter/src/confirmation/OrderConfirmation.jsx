import { useEffect, useState } from 'react';

import AlertBanner from '../pages/common/AlertBanner';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useOrderDetails } from '../contexts/OrderDetails';

const OrderConfirmation = ({ setOrderPhase }) => {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    // in a real app we would get order details from context
    // and send with POST
    axios
      .post(`http://localhost:3030/order`)
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => {
        setError(true);
      });
  }, []);
  const handleClick = () => {
    // clear the order details
    resetOrder();
    // send back to order page
    setOrderPhase('inProgress');
  };

  const newOrderButton = <Button onClick={handleClick}>Create new order</Button>;

  if (error) {
    return (
      <>
        <AlertBanner message={null} variant={null} />
        {newOrderButton}
      </>
    );
  }
  if (orderNumber) {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Thank you!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: '0.8rem' }}>as per our terms and conditons, nothing will happen now</p>
        {newOrderButton}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default OrderConfirmation;
