// src/components/OrderDetails.js

import React, { useEffect, useState } from 'react';
import { fetchOrderDetails, updateOrderStatus, updatePaymentStatus } from '../api';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const details = await fetchOrderDetails(orderId);
        setOrderDetails(details);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      }
    };

    getOrderDetails();
  }, [orderId]);

  const handleUpdateOrderStatus = async (status) => {
    try {
      await updateOrderStatus(orderId, status);
      setOrderDetails(prev => ({ ...prev, orderStatus: status }));
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const handleUpdatePaymentStatus = async (status) => {
    try {
      await updatePaymentStatus(orderId, status);
      setOrderDetails(prev => ({ ...prev, paymentStatus: status }));
    } catch (error) {
      console.error('Failed to update payment status:', error);
    }
  };

  if (!orderDetails) return <p>Loading...</p>;

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {orderDetails.orderId}</p>
      <p>Table No: {orderDetails.tableNo}</p>
      <p>Order Status: {orderDetails.orderStatus}</p>
      <p>Payment Status: {orderDetails.paymentStatus}</p>
      <button onClick={() => handleUpdateOrderStatus('Completed')}>Complete Order</button>
      <button onClick={() => handleUpdatePaymentStatus('Paid')}>Mark as Paid</button>
    </div>
  );
};

export default OrderDetails;
