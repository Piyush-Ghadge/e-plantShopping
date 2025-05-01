import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  const calculateTotalCost = (item) => {
    return (parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2);
  };

  const calculateTotalAmount = () => {
    return items.reduce(
      (acc, item) => acc + parseFloat(item.cost.substring(1)) * item.quantity,
      0
    ).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.name} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-cost">Unit Price: ${parseFloat(item.cost.substring(1)).toFixed(2)}</p>
                <div className="cart-item-quantity">
                  <button className="cart-item-button" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <p className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</p>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3 className="total_cart_amount">Total: ${calculateTotalAmount()}</h3>
            <button className="get-started-button1 continue_shopping_btn" onClick={onContinueShopping}>
              Continue Shopping
            </button>
            <button className="get-started-button1" onClick={() => alert('Checkout functionality to be added')}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;