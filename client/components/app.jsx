import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => this.setState({
        cart: data
      }))
      .catch(err => console.error(err));
  }

  render() {
    const view = this.state.view.name;
    let productRender;
    if (view === 'catalog') {
      productRender = <ProductList setView={this.setView} />;
    } else if (view === 'details') {
      productRender = <ProductDetails setView={this.setView} productId={this.state.view.params.productId} />;
    }
    return (
      <>
        <Header cartItemCount={this.state.cart.length} />
        <div className="py-4 bg-light">
          {productRender}
        </div>
      </>
    );
  }
}
