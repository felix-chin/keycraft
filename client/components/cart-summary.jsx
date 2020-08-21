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
        <h4>Cart is empty</h4>
      }
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h4>Item Total ${(totalPrice / 100).toFixed(2)}</h4>
        <button
          type="button"
          onClick={() => {
            if (cart.length > 0) {
              setView('checkout', {});
            }
          }}
          className="btn btn-primary">
            Checkout
        </button>
      </div>
    </div>
  );
}
