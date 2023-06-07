import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const HostFoodDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/food/${params.id}`);
        console.log("API response:", response.data);
        setFood(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    console.log("Fetching food...");
    fetchFood();
  }, [params.id]);

  const handleDeleteFood = async () => {
    try {
      await axios.delete(`http://localhost:3500/food/${params.id}`);
      navigate('/foods');
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditFood = () => {
    navigate(`/foods/${params.id}/edit`);
  };

  return (
    <div className="host-food-detail-container">
      {food ? (
        <div className="host-food-detail">
          <img src={food.imageUrl} alt={food.name} />
          <h3 style={{ textDecoration: 'underline' }}>{food.name}</h3>
          <h2 style={{ textDecoration: 'underline' }}>Preparation:</h2>
          {Array.isArray(food.process) && food.process.length > 0 ? (
            <ol>
              {food.process.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          ) : (
            <p>No preparation steps available.</p>
          )}

          <div className="ingredients-table">
            {Array.isArray(food.ingredients) && food.ingredients.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Ingredients</th>
                  </tr>
                </thead>
                <tbody>
                  {food.ingredients.map((ingredient, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{ingredient}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No ingredients available.</p>
            )}
          </div>

           {food.videoLink && (
            <div className="video-container">
              <h2 style={{ textDecoration: 'underline' }}>Video:</h2>
              <iframe
                width="560"
                height="315"
                src={food.videoLink}
                title="Food Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <EditIcon
            onClick={handleEditFood}
            style={{
              fontSize: '34px',
              color: '#007BFF',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          />
          <DeleteIcon
            onClick={handleDeleteFood}
            style={{
              fontSize: '34px',
              color: '#DC3545',
              cursor: 'pointer',
              borderRadius: '10px',
            }}
          />
        </div>
      ) : (
        <h2>Loading....</h2>
      )}
    </div>
  );
};

export default HostFoodDetail;