// src/components/OrdersList.js

import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../api';
import { Link } from 'react-router-dom';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orders = await fetchOrders();
        setOrders(orders.reverse());
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    getOrders();
  }, []);

  return (
    <div>
      <h1>Orders List</h1>
      <ul>
        {orders.map(order => (
          <li key={order.orderId}>
            Order ID: {order.orderId} - Table No: {order.tableNo}
            <Link to={`/order-details/${order.orderId}`}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersList;
