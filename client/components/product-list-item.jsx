import React from 'react';

export default function ProductListItem(props) {
  return (
    <div className="card shadow-sm h-100">
      <img src={props.image} alt={props.name} className="card-img-top object-fit" />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text text-muted">{props.price}</p>
        <p className="card-text">{props.desc}</p>
      </div>
    </div>
  );
}
