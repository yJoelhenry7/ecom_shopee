import React from 'react';
import './OrderConfirmed.css'; // Make sure to create a CSS file for styling
import GenerateReceipt from '../Receipts/GenerateReceipt';
import { Link, NavLink } from 'react-router-dom';

const OrderConfirmed = () => {
  return (
    <div className="order-confirmed-container">
      <div className="order-confirmed-card">
        <h2>Order Confirmed</h2>
        <p>Thank you for your order! Your order has been successfully placed.</p>
        <Link className="btn-home" to="/">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmed;
