import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Entertainment.css';

function Entertainment() {
  const [formData, setFormData] = useState({
    name: '',
    pros: '',
    cons: '',
    image: '',
  });
  const [entertainmentList, setEntertainmentList] = useState([]);
  const [editingId, setEditingId] = useState(null); // Track the item being edited

  useEffect(() => {
    fetchEntertainment();
  }, []);

  // Fetch entertainment list
  const fetchEntertainment = async () => {
    try {
      const response = await axios.get('/api/entertainment');
      setEntertainmentList(response.data.entertainmentList || []);
    } catch (error) {
      console.error('Error fetching entertainment items:', error.response?.data || error.message);
    }
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing item
        await axios.put(`/api/entertainment/${editingId}`, formData);
        setEditingId(null);
      } else {
        // Create new item
        await axios.post('/api/entertainment', formData);
      }
      fetchEntertainment(); // Refresh the list
      setFormData({ name: '', pros: '', cons: '', image: '' }); // Reset form
    } catch (error) {
      console.error(
        editingId
          ? 'Error updating entertainment item:'
          : 'Error adding entertainment item:',
        error.response?.data || error.message
      );
    }
  };

  // Handle editing an item
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ name: item.name, pros: item.pros, cons: item.cons, image: item.image });
  };

  // Handle deleting an item
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/entertainment/${id}`);
      fetchEntertainment(); // Refresh the list
    } catch (error) {
      console.error('Error deleting entertainment item:', error.response?.data || error.message);
    }
  };

  return (
    <div className="entertainment-page">
      <h1 className="entertainment-title">Entertainment</h1>

      <form className="entertainment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Pros"
          value={formData.pros}
          onChange={(e) => setFormData({ ...formData, pros: e.target.value })}
          required
        ></textarea>
        <textarea
          placeholder="Cons"
          value={formData.cons}
          onChange={(e) => setFormData({ ...formData, cons: e.target.value })}
          required
        ></textarea>
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        <button type="submit">{editingId ? 'Update' : 'Add'} Entertainment</button>
      </form>

      <div className="entertainment-list">
        {entertainmentList.length > 0 ? (
          <ul>
            {entertainmentList.map((item) => (
              <li key={item.id}>
                <h2>{item.name}</h2>
                <img src={item.image} alt={item.name} className="entertainment-image" />
                <p>
                  <strong>Pros:</strong> {item.pros}
                </p>
                <p>
                  <strong>Cons:</strong> {item.cons}
                </p>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No entertainment items available.</p>
        )}
      </div>
    </div>
  );
}

export default Entertainment;
