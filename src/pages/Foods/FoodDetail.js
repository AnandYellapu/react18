import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FoodDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/food/${params.id}`);
        setFood(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFood();
  }, [params.id]);

  const handleTryFood = () => {
    navigate(`/host/foods/${params.id}`);
  };

  return (
    <div className="food-detail-container">
      {food ? (
        <div className="food-detail">
          <img src={food.imageUrl} alt={food.name} />
          <h3 style={{ textAlign: 'center' }}>{food.name}</h3>
          <p>{food.description}</p>
          <button className="link-button" onClick={handleTryFood}>
            Try this Food
          </button>
        </div>
      ) : (
        <h2>Loading....</h2>
      )}
    </div>
  );
};

export default FoodDetail;
