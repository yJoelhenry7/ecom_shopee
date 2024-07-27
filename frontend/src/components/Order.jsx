import React from 'react';
import './Order.css';

const Order = () => {
  const order = {
    name: 'John Doe',
    address: '123 Main St, Springfield',
    packs: 5,
    contactNumber: '123-456-7890'
  };

  return (
    <div className="order-card">
      <h2 className="order-title">Order Details</h2>
      <div className="order-item">
        <span className="order-label">Name:</span>
        <span className="order-value">{order.name}</span>
      </div>
      <div className="order-item">
        <span className="order-label">Address:</span>
        <span className="order-value">{order.address}</span>
      </div>
      <div className="order-item">
        <span className="order-label">Number of Packs:</span>
        <span className="order-value">{order.packs}</span>
      </div>
      <div className="order-item">
        <span className="order-label">Contact Number:</span>
        <span className="order-value">{order.contactNumber}</span>
      </div>
    </div>
  );
};

export default Order;
