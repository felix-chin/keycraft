import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      ccName: '',
      ccType: '',
      ccNumber: '',
      ccExp: '',
      ccCVV: '',
      disclaimer: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const placeOrder = this.props.placeOrder;
    placeOrder(this.state);
  }

  render() {
    const setView = this.props.setView;
    const cart = this.props.cart;
    const totalPrice = cart.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    return (
      <section className="container py-3">
        <span className="d-flex flex-row align-items-center text-muted">
          <i onClick={() => setView('catalog', {})} className="fas fa-chevron-circle-left hover cursor-pointer h3 m-0 pr-2"></i>
          {' Continue Shopping'}
        </span>
        <h3 className=" font-weight-bold mt-3">Checkout</h3>
        <div className="d-flex justify-content-between align-items-center text-center bg-dark text-white py-2 my-3">
          <span className="h2 pl-4 mb-0"><i className="fas fa-exclamation-triangle"></i></span>
          <h6 className="mb-0">This application is for demonstration purposes only and the products listed are not actually for sale. <br />Please do not enter any real payment information.</h6>
          <span className="h2 pr-4 mb-0"><i className="fas fa-exclamation-triangle"></i></span>
        </div>
        <div className="row">
          <div className="col-md-4 order-md-2">
            <h4 className="font-weight-bold py-1 d-flex justify-content-between align-items-center">
              <span>Order</span>
            </h4>
            <ul className="list-group">
              {cart.map((item, i) => {
                return (
                  <li key={i} className="list-group-item d-flex justify-content-between 1h-condensed">
                    <div>
                      <h6><strong>{item.name}</strong></h6>
                      <small><strong>Qty:</strong> {item.quantity}<strong> | Switch: </strong>{item.selectedSwitch}</small>
                    </div>
                    <span>{'$' + (item.price * item.quantity / 100).toFixed(2)}</span>
                  </li>
                );
              })}
              <li className="list-group-item d-flex justify-content-between 1h-condensed">
                <span>Subtotal:</span>
                <span>${(totalPrice / 100).toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between 1h-condensed">
                <span>Shipping:</span>
                <span>Free</span>
              </li>
              <li className="list-group-item d-flex justify-content-between 1h-condensed">
                <span>Sales Tax (7.75%):</span>
                <span>${(totalPrice * 0.0775 / 100).toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between 1h-condensed">
                <strong>Total:</strong>
                <strong>${(((totalPrice + (totalPrice * 0.0775)) / 100)).toFixed(2)}</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="font-weight-bold py-1">Billing Address</h4>
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label htmlFor="firstName">First name</label>
                  <input
                    name="firstName"
                    type="text"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    required
                    className="form-control" />
                </div>
                <div className="col-md-6 form-group">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    name="lastName"
                    type="text"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    required
                    className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address1">Address 1</label>
                <input
                  name="address1"
                  type="text"
                  value={this.state.address1}
                  onChange={this.handleChange}
                  required
                  className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="address2">Address 2 <span className="text-muted">(Optional)</span></label>
                <input
                  name="address2"
                  type="text"
                  value={this.state.address2}
                  onChange={this.handleChange}
                  required
                  placeholder="Apartment or suite #"
                  className="form-control" />
              </div>
              <div className="row">
                <div className="form-group col-md-5">
                  <label htmlFor="city">City</label>
                  <input
                    name="city"
                    type="text"
                    value={this.state.city}
                    onChange={this.handleChange}
                    required
                    className="form-control" />
                </div>
                <div className="form-group col-md-2">
                  <label htmlFor="state">State</label>
                  <select
                    name="state"
                    type="text"
                    value={this.state.state}
                    onChange={this.handleChange}
                    required
                    className="form-control"
                  >
                    <option value="" disabled>Select</option>
                    <option value="ca">CA</option>
                    <option value="ny">NY</option>
                  </select>
                </div>
                <div className="form-group col-md-2">
                  <label htmlFor="zip">Zip Code</label>
                  <input
                    name="zip"
                    type="text"
                    value={this.state.zip}
                    onChange={this.handleChange}
                    required
                    className="form-control" />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="country">Country</label>
                  <select
                    name="country"
                    type="text"
                    value={this.state.country}
                    onChange={this.handleChange}
                    required
                    className="form-control"
                  >
                    <option value="" disabled>Select</option>
                    <option value="usa">USA</option>
                  </select>
                </div>
              </div>
              <h4 className="font-weight-bold py-1">Payment</h4>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="ccName">Name on Card</label>
                  <input
                    name="ccName"
                    type="text"
                    value={this.state.ccName}
                    onChange={this.handleChange}
                    required
                    autoComplete="off"
                    className="form-control" />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="ccType">
                    {'Card Type\xa0\xa0'}
                    <span className="cc-icons">
                      <i className="fab fa-cc-visa"></i>{'\xa0'}
                      <i className="fab fa-cc-mastercard"></i>{'\xa0'}
                      <i className="fab fa-cc-amex"></i>
                    </span>
                  </label>
                  <select
                    name="ccType"
                    type="text"
                    value={this.state.ccType}
                    onChange={this.handleChange}
                    required
                    className="form-control"
                  >
                    <option value="" disabled>Select</option>
                    <option value="visa">Visa</option>
                    <option value="mastercard">MasterCard</option>
                    <option value="amex">AMEX</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="ccNumber">Credit Card Number</label>
                  <input
                    name="ccNumber"
                    type="text"
                    value={this.state.ccNumber}
                    onChange={this.handleChange}
                    required
                    autoComplete="off"
                    className="form-control" />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="ccExp">Expiration</label>
                  <input
                    name="ccExp"
                    type="text"
                    value={this.state.ccExp}
                    onChange={this.handleChange}
                    required
                    autoComplete="off"
                    className="form-control" />
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="ccCVV">CVV</label>
                  <input
                    name="ccCVV"
                    type="text"
                    value={this.state.ccCVV}
                    onChange={this.handleChange}
                    required
                    autoComplete="off"
                    className="form-control" />
                </div>
              </div>
              <button type="submit" className="btn btn-color mt-2">Place Order</button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
