import React from 'react';
import Hero from './hero';
import ProductListItem from './product-list-item';
import OptionsModal from './options-modal';
export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      openModal: false,
      product: null
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => this.setState({
        products: data
      }))
      .catch(err => console.error(err));
  }

  handleOptions(product, e) {
    e.stopPropagation();
    this.setState({
      openModal: true,
      product: product
    })
  }

  render() {
    const setView = this.props.setView;
    const products = this.state.products;
    const addToCart= this.props.addToCart;
    const productListItems = products.map(product =>
      <div key={product.productId} className="col-md-4 mb-4">
        <ProductListItem
          setView={() => setView('details', { productId: product.productId })}
          image={product.image}
          name={product.name}
          price={'$' + (product.price / 100).toFixed(2)}
          desc={product.shortDescription}
          handleOptions={(e) => this.handleOptions(product, e)} />
      </div>
    );
    return (
      <>
        { this.state.openModal &&
          <OptionsModal product={this.state.product} addToCart={() => addToCart(this.state.product)} />
        }
        <Hero />
        <div className="container">
          <div className="row">
            <div className='card-group'>
              {productListItems}
            </div>
          </div>
        </div>
      </>
    );
  }
}
