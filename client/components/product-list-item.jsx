import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className="card">
      <img src="/server/public/images/shake-weight.jpg" className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title">Product Name</h5>
        <p className="card-text text-muted">$0.00</p>
        <p className="card-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias, earum.</p>
      </div>
    </div>
  );
}
