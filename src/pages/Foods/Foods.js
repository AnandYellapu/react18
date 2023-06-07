import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { getFoods } from '../../api/foodApi';

const Foods = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getFoods()
      .then((data) => {
        console.log("Fetched foods:", data);
        setFoods(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleCreateFood = () => {
    navigate("/host/foods/create");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (foods.length === 0) {
    return <p>Loading...</p>;
  }

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 style={{ textAlign: 'center', textDecoration: 'underline' }}>Foods</h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <AddCircleOutlineIcon
            onClick={handleCreateFood}
            style={{
              fontSize: '40px',
              color: 'black',
              marginLeft: '50px',
              marginBottom:'18px',
              background: 'linear-gradient(45deg, #FF9F00, #FFC837)',
              borderRadius: '10px',
              padding: '10px',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)',
            }}
          />
        </div>
        <div>
          <div className="search-container">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>
      </div>
      
      {filteredFoods.length > 0 ? (
        <div className="food-list">
          {filteredFoods.map((food) => (
            <div key={food.id} className="food-item">
              <Link to={`/foods/${food.id}`}>
                <img src={food.imageUrl} alt={food.name} />
                <h2>{food.name}</h2>
                <p>Type: {food.type}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No foods found.</p>
      )}
    </div>
  );
};

export default Foods;
