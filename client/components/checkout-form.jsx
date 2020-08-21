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
    const setView = this.props.setView;
    const placeOrder = this.props.placeOrder;
    setView('catalog', {});
    placeOrder(this.state);

  }

  render() {
    const setView = this.props.setView;
    const cart = this.props.cart;
    const totalPrice = cart.reduce((sum, item) => {
      return sum + item.price;
    }, 0);
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h3 className="mt-2">Checkout</h3>
          <h5 className="text-muted my-4">Order Total: ${(totalPrice / 100).toFixed(2)}</h5>
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
            <span onClick={() => setView('catalog', {})} className="text-muted cursor-pointer">{'< Continue Shopping'}</span>
            <button type="submit" className="btn btn-primary">Place Order</button>
          </div>
        </form>
      </div>
    );
  }
}
