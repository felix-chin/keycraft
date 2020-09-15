import React from 'react';
import useLockBodyScroll from './lock-body-scroll';

export default function ItemAddedModal(props) {
  const setView = props.setView;
  const itemAdded = props.itemAdded;
  useLockBodyScroll();
  return (
    <section className="modal-overlay modal-shade d-flex">
      <div className="item-added-content p-4">
        <h4>Product has been added to cart!</h4>
        <div className="d-flex justify-content-center align-items-center pt-3">
          <button
            onClick={() => {
              itemAdded();
            }
            }
            className="btn btn-color mr-3">
            Continue Shopping
          </button>
          <button
            onClick={() => {
              setView('cart', {});
              itemAdded();
            }
            }
            className="btn btn-color">
            View Cart
          </button>
        </div>
      </div>
    </section>
  );
}
