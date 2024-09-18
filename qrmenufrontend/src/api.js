// src/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:5141/api'; // Replace with your API base URL

export const fetchFoodItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/fooditems`);
  return response.data;
};

export const addFoodItem = async (foodItem) => {
  const response = await axios.post(`${API_BASE_URL}/fooditems`, foodItem);
  return response.data;
};

export const updateFoodItem = async (foodItem) => {
  const response = await axios.put(`${API_BASE_URL}/fooditems/${foodItem.foodItemId}`, foodItem);
  return response.data;
};

export const deleteFoodItem = async (foodItemId) => {
  const response = await axios.delete(`${API_BASE_URL}/fooditems/${foodItemId}`);
  return response.data;
};

export const createOrder = async (order) => {
  const response = await axios.post(`${API_BASE_URL}/orders`, order);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await axios.get(`${API_BASE_URL}/orders`);
  return response.data;
};

export const fetchOrderDetails = async (orderId) => {
  const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
  return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
  const response = await axios.patch(`${API_BASE_URL}/orders/${orderId}/status`, { status });
  return response.data;
};

export const updatePaymentStatus = async (orderId, status) => {
  const response = await axios.patch(`${API_BASE_URL}/orders/${orderId}/payment`, { status });
  return response.data;
};
