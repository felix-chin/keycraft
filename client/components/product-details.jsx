import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      quantity: 1,
      switches: [],
      switch: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.decreaseQty = this.decreaseQty.bind(this);
    this.increaseQty = this.increaseQty.bind(this);
  }

  componentDidMount() {
    const productId = this.props.productId;
    fetch(`/api/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          product: data
        });
        if (this.state.product.switchOptions === 'basic') {
          this.setState({
            switches: ['Cherry MX Red', 'Cherry MX Brown', 'Cherry MX Blue', 'Gateron Black', 'Gateron Brown', 'Gateron Green']
          });
        } else if (this.state.product.switchOptions === 'premium') {
          this.setState({
            switches: ['Cherry MX Green', 'Cherry MX Clear', 'Kailh Box Royal', 'Hako True', 'Hako Violet']
          });
        } else {
          this.setState({
            switches: ['Topre 30g', 'Topre 35g', 'Topre 45g', 'Topre 55g']
          });
        }
      }
      )
      .catch(err => console.error(err));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const addToCart = this.props.addToCart;
    const itemAdded = this.props.itemAdded;
    addToCart(this.state.product, this.state.switch, this.state.quantity);
    itemAdded();
  }

  decreaseQty() {
    if (this.state.quantity === 1) {
      return;
    }
    this.setState(prevState => ({ quantity: prevState.quantity - 1 }));
  }

  increaseQty() {
    if (this.state.quantity === 10) {
      return;
    }
    this.setState(prevState => ({ quantity: prevState.quantity + 1 }));
  }

  render() {
    const product = this.state.product;
    const setView = this.props.setView;

    if (!product) {
      return null;
    } else {
      return (
        <section>
          <div className="container py-3">
            <span onClick={() => setView('catalog', {})} className="d-flex flex-row align-items-center text-muted cursor-pointer pb-3">
              <i className="fas fa-chevron-circle-left hover h3 m-0 pr-2"></i>
              {' Back to catalog'}
            </span>
            <div className="container bg-white border rounded shadow-sm py-3">
              <div className="row">
                <img src={product.image} className="col-lg-8 object-fit" />
                <form onSubmit={this.handleSubmit} className="col-lg-4">
                  <h4>{product.name}</h4>
                  <h4 className="price">{'$' + (product.price / 100).toFixed(2)}</h4>
                  <p>{product.shortDescription}</p>
                  <div className="form-group">
                    <select
                      name="switch"
                      value={this.state.value}
                      defaultValue=""
                      onChange={this.handleChange}
                      required
                      className="form-control cursor-pointer">
                      <option value="" disabled>Select a switch</option>
                      {this.state.switches.map((item, i) =>
                        <option key={i} value={item}>{item}</option>
                      )
                      }
                    </select>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="form-group d-flex flex-row align-items-center">
                      <label htmlFor="quantity" className="qty-text mr-1 mb-0">Qty:</label>
                      <i onClick={this.decreaseQty} className="fas fa-minus-circle btn qty-btn cursor-pointer p-0"></i>
                      <input
                        type="text"
                        name="quantity"
                        value={this.state.quantity}
                        size="1"
                        onChange={this.handleChange}
                        readOnly
                        className="form-control text-center mx-1" />
                      <i onClick={this.increaseQty} className="fas fa-plus-circle btn qty-btn cursor-pointer p-0"></i>
                    </div>
                    <div className="text-right">
                      <button
                        type="submit"
                        className="btn btn-color">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }
}
