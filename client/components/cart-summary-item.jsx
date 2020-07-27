import React from 'react';

export default function CartSummaryItem(props) {
  const item = props.item;
  return (
    <div className="row border bg-white shadow-sm my-3 p-4">
      <img src={item.image} alt={item.name} className="col-md-4 object-fit" />
      <div className="d-flex flex-column justify-content-center col-md-8">
        <h4 className="card-title">{item.name}</h4>
        <h6 className="card-text text-muted">{'$' + (item.price / 100).toFixed(2)}</h6>
        <p className="card-text">{item.shortDescription}</p>
      </div>
    </div>
  );
}
