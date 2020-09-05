import React from 'react';

export default function CartSummaryItem(props) {
  const item = props.item;
  return (
    <tr>
      <td className="text-center">
        <img src={item.image} alt={item.name} className="cart-img" />
      </td>
      <td className="d-flex flex-column">
        <h5>{item.name}</h5>
        <span><strong>Switches: </strong>{item.selectedSwitch}</span>
      </td>
      <td className="text-center">
        <input type="text" value={item.quantity} className="cart-qty text-center"/>
      </td>
      <td className="text-center">{'$' + (item.price / 100).toFixed(2)}</td>
    </tr>
    // <div className="row border bg-white">
    //   <img src={item.image} alt={item.name} className="col-md-4 object-fit" />
    //   <div className="d-flex flex-column justify-content-center col-md-8">
    //     <h3 className="card-title">{item.name}</h3>
    //     <h4 className="card-text price">{'$' + (item.price / 100).toFixed(2)}</h4>
    //     <h4 className="card-text">Quantity: {item.quantity}</h4>
    //     <p className="card-text">{item.shortDescription}</p>
    //   </div>
    // </div>
  );
}
