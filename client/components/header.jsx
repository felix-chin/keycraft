import React from 'react';

export default function Header(props) {
  return (
    <header>
      <div className="navbar navbar-dark bg-dark">
        <div className="container">
          <div className="navbar-brand d-flex align-items-center">
            <i className="fas fa-hand-holding-usd mr-2"></i>
            <strong>Wicked Sales</strong>
          </div>
        </div>
      </div>
    </header>
  );
}
