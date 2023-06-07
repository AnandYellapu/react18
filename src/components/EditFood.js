import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFoodById, updateFood } from '../api/foodApi';

const EditFood = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [process, setProcess] = useState([]);
  const [ingredients, setIngredients] = useState('');

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const fetchedFood = await getFoodById(id);
        setFood(fetchedFood);
        setName(fetchedFood.name);
        setImageUrl(fetchedFood.image);
        setDescription(fetchedFood.description)
        setType(fetchedFood.type);
        setProcess(fetchedFood.process.join('\n'));
        setIngredients(fetchedFood.ingredients.join('\n'));
      } catch (error) {
        console.error(error);
      }
    };

    fetchFood();
  }, [id]);

  const handleUpdateFood = async () => {
    try {
      console.log(ingredients);
      const updatedFood = {
        name, imageUrl, description, type, process: process.split('\n'), ingredients: ingredients.split('\n'),
      };
      await updateFood(id, updatedFood);
      navigate(`/foods/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (!food) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="edit-food-container">
      <div className="edit-food-form">
        <h2>Edit Food</h2>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Image URL:</label>
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />

        <label>Type:</label>
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} />

        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Process:</label>
        <textarea value={process} onChange={(e) => setProcess(e.target.value)} />

        <label>Ingredients:</label>
        <textarea type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />

        <button onClick={handleUpdateFood}>Update Food</button>
      </div>
    </div>
  );
};

export default EditFood;
