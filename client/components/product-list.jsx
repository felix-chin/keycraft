import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('api/products')
      .then(res => res.json())
      .then(data => {
        this.setState({
          products: data
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const products = this.state.products;
    const productListItems = products.map(product =>
      <div key={product.productId} className="col-md-4 mb-4">
        <ProductListItem
          image={product.image}
          name={product.name}
          price={'$' + (product.price / 100).toFixed(2)}
          desc={product.shortDescription}/>
      </div>
    );
    return (
      <div className="container">
        <div className="row">
          <div className='card-group'>
            {productListItems}
          </div>
        </div>
      </div>
    );
  }
}
