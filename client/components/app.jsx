import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
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
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
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

  addToCart(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(data => {
        const newCart = this.state.cart.concat(data);
        this.setState({
          cart: newCart
        });
      })
      .catch(err => console.error(err));
  }

  placeOrder(order) {
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          cart: [],
          view: {
            name: 'catalog',
            params: {}
          }
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const view = this.state.view.name;
    let renderPage;
    if (view === 'catalog') {
      renderPage = <ProductList setView={this.setView} />;
    } else if (view === 'details') {
      renderPage = <ProductDetails
        setView={this.setView}
        productId={this.state.view.params.productId}
        addToCart={this.addToCart} />;
    } else if (view === 'cart') {
      renderPage = <CartSummary setView={this.setView} cart={this.state.cart} />;
    } else if (view === 'checkout') {
      renderPage = <CheckoutForm setView={this.setView} placeOrder={this.placeOrder} cart={this.state.cart} />;
    }
    return (
      <>
        <Header setView={this.setView} cartItemCount={this.state.cart.length} />
        <div className="py-4 bg-light">
          {renderPage}
        </div>
      </>
    );
  }
}
