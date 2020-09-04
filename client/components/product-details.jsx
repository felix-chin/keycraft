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
    addToCart(product, this.state.switch);
  }

  decreaseQty() {
    if (this.state.quantity === 1) {
      return;
    }
    this.setState(prevState => ({ quantity: prevState.quantity - 1 }));
  }

  increaseQty() {
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
          <div className="container">
            <div className="row mb-3">
              <span
                onClick={() => setView('catalog', {})}
                className="col-md-auto text-muted ml-2 cursor-pointer">
                <i className="fas fa-arrow-circle-left"></i>
                {' Back to catalog'}
              </span>
            </div>
            <div className="row bg-white border rounded shadow-sm py-3">
              <img src={product.image} className="col-md-7 img-fluid" />
              <form onSubmit={this.handleSubmit} className="col-md-5">
                <h3>{product.name}</h3>
                <h5 className="text-muted">{'$' + (product.price / 100).toFixed(2)}</h5>
                <p>{product.shortDescription}</p>
                <div>
                  <select name="switch" value={this.state.value} defaultValue="" onChange={this.handleChange} required>
                    <option value="" disabled>Select a switch</option>
                    { this.state.switches.map((item, i) =>
                      <option key={i} value={item}>{item}</option>
                    )
                    }
                  </select>
                </div>
                <div>
                  <span>
                    <i onClick={this.decreaseQty} className="fas fa-minus-circle"></i>
                  </span>
                  <input type="text" value={this.state.quantity} size="1" onChange={this.handleChange} readOnly/>
                  <span>
                    <i onClick={this.increaseQty} className="fas fa-plus-circle"></i>
                  </span>
                </div>
                <button
                  type="submit"
                  className="btn btn-color">
                    Add to Cart
                </button>
              </form>
            </div>
          </div>
        </section>
      );
    }
  }
}
