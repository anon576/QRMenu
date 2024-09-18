// src/components/AddFoodItem.js
import React, { useState } from 'react';
import { addFoodItem } from '../api';
import { useNavigate } from 'react-router-dom';

const AddFoodItem = () => {
  const [foodItem, setFoodItem] = useState({ name: '', price: 0, description: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem(prevItem => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addFoodItem(foodItem)
      .then(() => navigate('/food-items-list'))
      .catch(error => console.error('Error adding food item:', error));
  };

  return (
    <div>
      <h1>Add Food Item</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={foodItem.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="number"
          name="price"
          value={foodItem.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <textarea
          name="description"
          value={foodItem.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddFoodItem;
