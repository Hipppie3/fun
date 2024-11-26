import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Food.css';

function Food() {
  const [formData, setFormData] = useState({ id: null, name: '', location: '', map: '' });
  const [foodItems, setFoodItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get('/api/food'); // Axios GET request to /api/food
      setFoodItems(response.data.foodItems || []); // Use empty array if no items
    } catch (error) {
      console.error('Error fetching food items:', error.response?.data || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // Edit existing food item
      try {
        await axios.put(`/api/food/${formData.id}`, formData); // Axios PUT request
        fetchFoodItems(); // Refresh the list
        setFormData({ id: null, name: '', location: '', map: '' }); // Reset the form
        setIsEditing(false); // Exit editing mode
      } catch (error) {
        console.error('Error editing food item:', error.response?.data || error.message);
      }
    } else {
      // Add new food item
      try {
        await axios.post('/api/food', formData); // Axios POST request
        fetchFoodItems(); // Refresh the list
        setFormData({ id: null, name: '', location: '', map: '' }); // Reset the form
      } catch (error) {
        console.error('Error adding food item:', error.response?.data || error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/food/${id}`); // Axios DELETE request
      fetchFoodItems(); // Refresh the list
    } catch (error) {
      console.error('Error deleting food item:', error.response?.data || error.message);
    }
  };

  const handleEdit = (item) => {
    setFormData(item); // Populate the form with the selected item
    setIsEditing(true); // Enable editing mode
  };

  return (
    <div className="food-page">
      <h1 className="food-title">Food Tracker</h1>

      <form className="food-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Map URL"
          value={formData.map}
          onChange={(e) => setFormData({ ...formData, map: e.target.value })}
        />
        <button type="submit">{isEditing ? 'Update Food' : 'Add Food'}</button>
      </form>

      <div className="food-list">
        {foodItems.length > 0 ? (
          <ul>
            {foodItems.map((item) => (
              <li key={item.id}>
                <h2>{item.name}</h2>
                <p>Location: {item.location}</p>
                <p>
                  Map: <a href={item.map} target="_blank" rel="noopener noreferrer">{item.map}</a>
                </p>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No food items available.</p>
        )}
      </div>
    </div>
  );
}

export default Food;
