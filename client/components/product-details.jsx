import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    fetch('/api/products/1')
      .then(res => res.json())
      .then(data => this.setState({
        product: data
      }))
      .catch(err => console.error(err));
  }

  render() {
    const product = this.state.product;
    return (
      <div className="container">
        <div className="container bg-white border rounded shadow-sm py-3">
          <div className="row mb-3">
            <span className="col-md-auto text-muted ml-2">{'< Back to catalog'}</span>
          </div>
          <div className="row">
            <img src={product.image} className="col-md-5 img-fluid" />
            <div className="col-md-7">
              <h3>{product.name}</h3>
              <h5 className="text-muted">{'$' + (product.price / 100).toFixed(2)}</h5>
              <p>{product.shortDescription}</p>
            </div>
          </div>
          <div className="row mt-3">
            <p className="col-md-auto">{product.longDescription}</p>
          </div>
        </div>
      </div>
    );
  }
}
