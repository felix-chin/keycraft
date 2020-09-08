import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
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
      return sum + item.price;
    }, 0);
    return (
      <section className="container pb-4">
        <form onSubmit={this.handleSubmit}>
          <h3 className="py-2">Checkout</h3>
          <h5 className="text-muted pb-4">Order Total: ${(totalPrice / 100).toFixed(2)}</h5>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              required
              className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="credit-card">Credit Card</label>
            <input
              name="creditCard"
              type="text"
              value={this.state.creditCard}
              onChange={this.handleChange}
              required
              autoComplete="off"
              className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="shipping-address">Shipping Address</label>
            <textarea
              name="shippingAddress"
              value={this.state.shippingAddress}
              rows="4"
              onChange={this.handleChange}
              required
              className="form-control" />
          </div>
          <div className="d-flex justify-content-between">
            <span className="d-flex flex-row align-items-center text-muted">
              <i onClick={() => setView('catalog', {})} className="fas fa-chevron-circle-left hover cursor-pointer h3 m-0 pr-2"></i>
              {' Continue Shopping'}
            </span>
            <button type="submit" className="btn btn-color">Place Order</button>
          </div>
        </form>
      </section>
    );
  }
}
