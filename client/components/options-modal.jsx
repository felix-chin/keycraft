import React from 'react';
import useLockBodyScroll from './lock-body-scroll';

export default function OptionsModal(props) {
  useLockBodyScroll();
  const product = props.product;
  let options = [];
  if (product['switchOptions'] === 'basic') {
    options = ['Cherry MX Red', 'Cherry MX Brown', 'Cherry MX Blue', 'Gateron Black', 'Gateron Brown', 'Gateron Green']
  } else if (product['switchOptions'] === 'premium') {
    options = ['Cherry MX Green', 'Cherry MX Clear', 'Kailh Box Royal', 'Hako True', 'Hako Violet']
  } else {
    options = ['Topre 30g', 'Topre 35g', 'Topre 45g', 'Topre 55g']
  }
  return (
    <section className="modal-overlay d-flex">
      <form className="options-content p-3">
        <div className="d-flex justify-content-between">
          <h4>{product.name}</h4>
          <h4>
            <i className="fas fa-times"></i>
          </h4>
        </div>
        <img src={product.image} alt={product.name} className="modal-thumbnail"/>
        <h5 className="text-muted">{'$' + (product.price / 100).toFixed(2)}</h5>
        <h5>Select switches</h5>
        {options.map((option, i) =>
            <div key={i} className="form-check">
              <input type="radio" name="switch" value={option} className="form-check-input" />
              <label htmlFor={option} className="form-check-label">
                {option}
              </label>
            </div>
          )
        }
        <button type="button" onClick={props.addToCart} className="btn btn-color mt-2">
          Add to Cart
      </button>
      </form>
    </section>
  )

}
