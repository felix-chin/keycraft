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
    <div className="container py-3">
      <span
        onClick={() => setView('catalog', {})}
        className="col-md-auto text-muted cursor-pointer h5 m-0">
        <i className="fas fa-arrow-circle-left"></i>
        {' Back to catalog'}
      </span>
      <h3 className="my-3">My Cart</h3>
      <div className="table-responsive">
        <table className="table bg-white">
          <thead className="thead-light">
            <tr className="">
              <th className="text-center">Product</th>
              <th>Product Name</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Price</th>
            </tr>
          </thead>
          <tbody className="">
            {cartItems}
          </tbody>
          <tfoot>

          </tfoot>
        </table>
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
          className="btn btn-lg btn-color">
            Checkout
        </button>
      </div>
    </div>
  );
}
