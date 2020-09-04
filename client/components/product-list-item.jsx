import React from 'react';

export default function ProductListItem(props) {
  return (
    <div onClick={props.setView} className="card h-100 cursor-pointer">
      <img src={props.image} alt={props.name} className="card-img-top object-fit" />
      <div className="card-body">
        <h4 className="card-title">{props.name}</h4>
        <div className="d-flex justify-content-between my-2">
          <h3 className="card-text price m-0">{props.price}</h3>
          <button onClick={props.openOptions} className="btn btn-lg btn-color">
            Add to Cart
          </button>
        </div>
        <p className="card-text">{props.desc}</p>
      </div>
    </div>
  );
}
