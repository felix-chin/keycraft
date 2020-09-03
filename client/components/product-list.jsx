import React from 'react';
import Hero from './hero';
import ProductListItem from './product-list-item';
import OptionsModal from './options-modal';
export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      optionsModal: false,
      product: null
    };
    this.closeOptions = this.closeOptions.bind(this);
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

  openOptions(product, e) {
    e.stopPropagation();
    this.setState({
      optionsModal: true,
      product: product
    });
  }

  closeOptions() {
    this.setState({ optionsModal: false })
  }

  render() {
    const setView = this.props.setView;
    const products = this.state.products;
    const productListItems = products.map(product =>
      <div key={product.productId} className="col-md-4 mb-4">
        <ProductListItem
          setView={() => setView('details', { productId: product.productId })}
          image={product.image}
          name={product.name}
          price={'$' + (product.price / 100).toFixed(2)}
          desc={product.shortDescription}
          openOptions={e => this.openOptions(product, e)} />
      </div>
    );
    return (
      <>
        {this.state.optionsModal &&
          <OptionsModal closeOptions={this.closeOptions} product={this.state.product} addToCart={this.props.addToCart} />
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
