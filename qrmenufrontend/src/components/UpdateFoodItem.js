// src/components/UpdateFoodItem.js
import React, { useState, useEffect } from 'react';
import { fetchFoodItems, updateFoodItem } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateFoodItem = () => {
  const { id } = useParams(); // Get food item ID from URL parameters
  const navigate = useNavigate(); // For navigation after update
  const [foodItem, setFoodItem] = useState({
    name: '',
    price: '',
    description: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the current details of the food item
    fetchFoodItems(id)
      .then(data => setFoodItem(data))
      .catch(error => setError('Error fetching food item details'));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodItem(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFoodItem(id, foodItem)
      .then(() => navigate('/food-items-list')) // Redirect to food items list on success
      .catch(error => setError('Error updating food item'));
  };

  return (
    <div>
      <h1>Update Food Item</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={foodItem.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={foodItem.price}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              name="description"
              value={foodItem.description}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateFoodItem;
