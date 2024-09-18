// src/components/FoodItemsList.js
import React, { useState, useEffect } from 'react';
import { fetchFoodItems, deleteFoodItem } from '../api';
import { Link } from 'react-router-dom';

const FoodItemsList = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    // Fetch food items
    fetchFoodItems()
      .then(setFoodItems)
      .catch(error => console.error('Error fetching food items:', error));
  }, []);

  const handleDelete = (foodItemId) => {
    deleteFoodItem(foodItemId)
      .then(() => {
        // Remove deleted item from state
        setFoodItems(foodItems.filter(item => item.foodItemId !== foodItemId));
      })
      .catch(error => console.error('Error deleting food item:', error));
  };

  return (
    <div>
      <h1>Food Items List</h1>
      <ul>
        {foodItems.map(item => (
          <li key={item.foodItemId}>
            {item.name} - ${item.price}
            <Link to={`/update-food-item/${item.foodItemId}`}>Update</Link>
            <button onClick={() => handleDelete(item.foodItemId)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/add-food-item">Add New Food Item</Link>
    </div>
  );
};

export default FoodItemsList;
