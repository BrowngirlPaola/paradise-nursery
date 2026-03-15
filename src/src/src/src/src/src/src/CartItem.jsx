import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  removeItem, 
  increaseQuantity, 
  decreaseQuantity, 
  selectCartItems, 
  selectCartTotal, 
  selectCartCount 
} from './CartSlice';
import { useNavigate } from 'react-router-dom';

function CartItem() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartCount = useSelector(selectCartCount);

  const handleCheckout = () => {
    alert('Coming Soon! 🌿 Thank you for shopping at Paradise Nursery!');
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

      <div className="cart-page">
        <h1>Your Shopping Cart 🛒</h1>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty. 🌱</p>
            <button 
              className="continue-btn" 
              onClick={() => navigate('/products')}
            >
              Browse Plants
            </button>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Unit Price: ${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-controls">
                  <button 
                    className="qty-btn" 
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    className="qty-btn" 
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    🗑 Remove
                  </button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="cart-summary">
              <h2>Total: ${cartTotal.toFixed(2)}</h2>
              <div className="cart-actions">
                <button 
                  className="continue-btn" 
                  onClick={() => navigate('/products')}
                >
                  ← Continue Shopping
                </button>
                <button 
                  className="checkout-btn" 
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CartItem;
