// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import OrderSummary from './components/OrderSummary';
import OrdersList from './components/OrdersList';
import OrderDetails from './components/OrderDetails';
import AddFoodItem from './components/AddFoodItem';
import UpdateFoodItem from './components/UpdateFoodItem';
import FoodItemsList from './components/FoodItemsList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/orders-list" element={<OrdersList />} />
        <Route path="/order-details/:id" element={<OrderDetails />} />
        <Route path="/add-food-item" element={<AddFoodItem />} />
        <Route path="/update-food-item/:id" element={<UpdateFoodItem />} />
        <Route path="/food-items-list" element={<FoodItemsList />} />
      </Routes>
    </Router>
  );
};

export default App;
