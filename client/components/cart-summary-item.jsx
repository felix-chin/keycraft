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
      <td className="text-center cart-qty">
        <span className="border rounded py-1 px-2">{item.quantity}</span>
        <span>
          <i onClick={props.removeFromCart} className="fas fa-trash pl-2 text-secondary cursor-pointer hover"></i>
        </span>
      </td>
      <td className="text-center">{'$' + (item.price / 100).toFixed(2)}</td>
      <td className="text-center">{'$' + (item.price * item.quantity / 100).toFixed(2)}</td>
    </tr>
  );
}
