// src/components/Menu.js

import React, { useEffect, useState } from 'react';
import { fetchFoodItems, createOrder } from '../api';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();
  const tableNo = new URLSearchParams(window.location.search).get('tableNo');

  useEffect(() => {
    const getFoodItems = async () => {
      try {
        const items = await fetchFoodItems();
        setFoodItems(items);
      } catch (error) {
        console.error('Failed to fetch food items:', error);
      }
    };

    getFoodItems();
  }, []);

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
    localStorage.setItem('selectedItems', JSON.stringify([...selectedItems, item]));
  };

  const handleRemoveItem = (item) => {
    const updatedItems = selectedItems.filter(i => i.foodItemId !== item.foodItemId);
    setSelectedItems(updatedItems);
    localStorage.setItem('selectedItems', JSON.stringify(updatedItems));
  };

  const handlePlaceOrder = () => {
    createOrder({ tableNo, items: selectedItems }).then(() => {
      navigate('/order-summary');
    }).catch(error => {
      console.error('Failed to place order:', error);
    });
  };

  return (
    <div>
      <h1>Menu</h1>
      <ul>
        {foodItems.map(item => (
          <li key={item.foodItemId}>
            {item.name} - ${item.price}
            {selectedItems.some(i => i.foodItemId === item.foodItemId) ? (
              <button onClick={() => handleRemoveItem(item)}>Remove</button>
            ) : (
              <button onClick={() => handleAddItem(item)}>Add to Menu</button>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Menu;
