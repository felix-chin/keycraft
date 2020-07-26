import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  const setView = props.setView;
  const cart = props.cart;
  const totalPrice = cart.reduce((sum, item) => {
    return sum + item.price;
  }, 0);
  const cartItems = cart.map(item =>
    <CartSummaryItem key={item.cartItemId} item={item} />
  );
  return (
    <div className="container">
      <span
        onClick={() => setView('catalog', {})}
        className="text-muted ml-1 cursor-pointer">
        {'< Back to catalog'}
      </span>
      <h3 className="my-3">My Cart</h3>
      <div className="container">
        {cartItems}
      </div>
      {cart.length === 0 &&
        <h5>Cart is empty</h5>
      }
      <h4 className="mt-3">Item Total {'$' + (totalPrice / 100).toFixed(2)}</h4>
    </div>
  );
}
