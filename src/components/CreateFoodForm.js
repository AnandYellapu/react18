import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFood } from '../api/foodApi';

function CreateFoodForm() {
  const [foodData, setFoodData] = useState({
    id: '',
    name: '',
    description: '',
    imageUrl: '',
    type: '',
    process: [],
    ingredients: [],
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'process') {
      // Handle process steps as an array
      const processSteps = value.split('\n');
      setFoodData((prevData) => ({
        ...prevData,
        [name]: processSteps,
      }));
    } else if (name === 'ingredients') {
    // Handle ingredients as an array
    const ingredientList = value.split('\n');
    setFoodData((prevData) => ({
      ...prevData,
      ingredients: ingredientList,
    }));
    } else {
      setFoodData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFood(foodData);
      // Food creation successful, redirect to the food list page or desired destination
      navigate('/foods');
    } catch (error) {
      // Handle error if food creation fails
      console.error(error);
    }
  };

  return (
    <div className="create-food-container">
      <div className="create-food-form">
        <h2 style={{ textAlign: 'center', textDecoration: 'underline' }}>Create Food</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id">ID:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={foodData.id}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={foodData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="type">Type:</label>
            <textarea
              type="text"
              name="type"
              value={foodData.type}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={foodData.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={foodData.imageUrl}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="process">Process:</label>
            <textarea
              id="process"
              name="process"
              value={Array.isArray(foodData.process) ? foodData.process.join('\n') : ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
  <label htmlFor="ingredients">Ingredients:</label>
  <textarea
    id="ingredients"
    name="ingredients"
    value={Array.isArray(foodData.ingredients) ? foodData.ingredients.join('\n') : ''}
    onChange={handleInputChange}
  />
</div>

          <button type="submit">Add on</button>
        </form>
      </div>
    </div>
  );
}

export default CreateFoodForm;
