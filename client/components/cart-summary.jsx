import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default function CartSummary(props) {
  const setView = props.setView;
  const cart = props.cart;
  const removeFromCart = props.removeFromCart;
  const totalPrice = cart.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
  const cartItems = cart.map(item =>
    <CartSummaryItem key={item.cartItemId} item={item} removeFromCart={() => removeFromCart(item.cartItemId)}/>
  );
  return (
    <div className="container py-3">
      <span className="col-md-auto d-flex flex-row align-items-center text-muted">
        <i onClick={() => setView('catalog', {})} className="fas fa-arrow-circle-left hover cursor-pointer h2 m-0 pr-2"></i>
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
              <th className="text-center">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-center">
                <h5>Total: ${(totalPrice / 100).toFixed(2)}</h5>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {cart.length === 0 &&
        <h4>Cart is empty</h4>
      }
      <div className="d-flex justify-content-end align-items-center mt-3">
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
