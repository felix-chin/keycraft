import React from 'react';

export default function Header(props) {
  return (
    <header>
      <div className="navbar navbar-dark bg-dark">
        <div className="container justify-content-between">
          <div className="navbar-brand d-flex align-items-center">
            <i className="fas fa-hand-holding-usd mr-2"></i>
            <strong>Wicked Sales</strong>
          </div>
          <div className="d-flex align-items-center text-white">
            <span className="mr-2">{props.cartItemCount} Items</span>
            <i className="fas fa-shopping-cart cart-icon cursor-pointer"></i>
          </div>
        </div>
      </div>
    </header>
  );
}
