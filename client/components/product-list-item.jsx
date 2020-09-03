import React from 'react';

export default function ProductListItem(props) {
  return (
    <div onClick={props.setView} className="card h-100 cursor-pointer">
      <img src={props.image} alt={props.name} className="card-img-top object-fit" />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <div className="d-flex justify-content-between my-2">
          <span className="card-text text-muted price">{props.price}</span>
          <button onClick={props.handleOptions} className="btn btn-color">
            Add to Cart
          </button>
        </div>
        <p className="card-text">{props.desc}</p>
      </div>
    </div>
  );
}
