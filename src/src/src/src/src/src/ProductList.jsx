import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, selectCartCount } from './CartSlice';
import { useNavigate } from 'react-router-dom';

const plantCategories = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { id: 1, name: 'Peace Lily', price: 12.99, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e6ba2?w=300' },
      { id: 2, name: 'Spider Plant', price: 8.99, image: 'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=300' },
      { id: 3, name: 'Snake Plant', price: 14.99, image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=300' },
      { id: 4, name: 'Aloe Vera', price: 9.99, image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=300' },
      { id: 5, name: 'Boston Fern', price: 11.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300' },
      { id: 6, name: 'Bamboo Palm', price: 19.99, image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=300' },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { id: 7, name: 'ZZ Plant', price: 16.99, image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=300' },
      { id: 8, name: 'Pothos', price: 7.99, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300' },
      { id: 9, name: 'Cast Iron Plant', price: 13.99, image: 'https://images.unsplash.com/photo-1599598425947-5202edd56fdb?w=300' },
      { id: 10, name: 'Jade Plant', price: 10.99, image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=300' },
      { id: 11, name: 'Chinese Evergreen', price: 15.99, image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=300' },
      { id: 12, name: 'Dracaena', price: 17.99, image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=300' },
    ],
  },
  {
    category: 'Tropical Plants',
    plants: [
      { id: 13, name: 'Monstera', price: 24.99, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300' },
      { id: 14, name: 'Bird of Paradise', price: 34.99, image: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=300' },
      { id: 15, name: 'Philodendron', price: 18.99, image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=300' },
      { id: 16, name: 'Calathea', price: 21.99, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e6ba2?w=300' },
      { id: 17, name: 'Anthurium', price: 22.99, image: 'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=300' },
      { id: 18, name: 'Bromeliad', price: 19.99, image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=300' },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems(prev => ({ ...prev, [plant.id]: true }));
  };

  return (
    <>
      <nav className="navbar">
        <a href="/" className="navbar-brand">🌿 Paradise Nursery</a>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/products">Plants</a></li>
          <li>
            <a className="cart-icon" onClick={() => navigate('/cart')}>
              🛒
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </a>
          </li>
        </ul>
      </nav>

      <div className="product-list-page">
        <h1>Our Plants 🌱</h1>
        {plantCategories.map((cat) => (
          <div key={cat.category} className="category-section">
            <h2>{cat.category}</h2>
            <div className="plants-grid">
              {cat.plants.map((plant) => (
                <div key={plant.id} className="plant-card">
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p className="price">${plant.price.toFixed(2)}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(plant)}
                    disabled={addedItems[plant.id]}
                  >
                    {addedItems[plant.id] ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductList;
