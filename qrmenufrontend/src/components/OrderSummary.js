// src/components/OrderSummary.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSummary = () => {
  const navigate = useNavigate();
  const selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
  const tableNo = new URLSearchParams(window.location.search).get('tableNo');

  const handlePlaceOrder = () => {
    // Logic to place order here
    navigate('/orders-list');
  };

  return (
    <div>
      <h1>Order Summary</h1>
      <ul>
        {selectedItems.map(item => (
          <li key={item.foodItemId}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default OrderSummary;
