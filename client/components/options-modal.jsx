import React, {useState} from 'react';
import useLockBodyScroll from './lock-body-scroll'

export default function OptionsModal(props) {
  useLockBodyScroll();

  const product = props.product;
  const setOption = props.setOption;
  const addToCart = props.addToCart;
  const closeOptions = props.closeOptions;
  let switches = [];

  const [selectedSwitch, setSwitch] = useState('');

  const handleChange = e => setSwitch({
    [e.target.name]: e.target.value
  })

  const handleSubmit = e => {
    e.preventDefault();
    addToCart(product, selectedSwitch['switch']);
    closeOptions();
  }


  if (product.switchOptions === 'basic') {
    switches = ['Cherry MX Red', 'Cherry MX Brown', 'Cherry MX Blue', 'Gateron Black', 'Gateron Brown', 'Gateron Green'];
  } else if (product.switchOptions === 'premium') {
    switches = ['Cherry MX Green', 'Cherry MX Clear', 'Kailh Box Royal', 'Hako True', 'Hako Violet'];
  } else {
    switches = ['Topre 30g', 'Topre 35g', 'Topre 45g', 'Topre 55g'];
  }

  return (
    <section className="modal-overlay d-flex">
      <form onSubmit={handleSubmit} className="options-content p-3">
        <div className="d-flex justify-content-between">
          <h4>{product.name}</h4>
          <h4>
            <i onClick={closeOptions} className="fas fa-times cursor-pointer"></i>
          </h4>
        </div>
        <img src={product.image} alt={product.name} className="modal-thumbnail"/>
        <h5 className="text-muted">{'$' + (product.price / 100).toFixed(2)}</h5>
        <h5>Select a switch option:</h5>
        {switches.map((item, i) =>
          <div key={i} className="form-check">
            <input type="radio" name="switch" value={item} onChange={handleChange} className="form-check-input" />
            <label htmlFor={item} className="form-check-label">
              {item}
            </label>
          </div>
          )
        }
        <button type="submit" className="btn btn-color mt-2">
          Add to Cart
        </button>
      </form>
    </section>
  );
}
