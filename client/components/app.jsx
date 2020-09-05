import React from 'react';
import Header from './header';
import Disclaimer from './disclaimer';
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
      cart: [],
      disclaimer: true
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.closeDisclaimer = this.closeDisclaimer.bind(this);
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

  addToCart(product, selectedSwitch, quantity) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product: product,
        selectedSwitch: selectedSwitch,
        quantity: quantity
      })
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

  removeFromCart(cartItemId) {
    fetch(`/api/cart/${cartItemId}`, {
      method: 'DELETE'
    })
      .then(res => console.log(res))
      .then(data => {
        const newCart = this.state.cart.slice(0);
        const index = newCart.findIndex(cart => cartItemId === cart.cartItemId);
        newCart.splice(index, 1);
        this.setState({ cart: newCart });
      })
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

  closeDisclaimer() {
    this.setState({ disclaimer: false });
  }

  render() {
    const view = this.state.view.name;
    let renderPage;
    if (view === 'catalog') {
      renderPage = <ProductList setView={this.setView} addToCart={this.addToCart} />;
    } else if (view === 'details') {
      renderPage = <ProductDetails
        setView={this.setView}
        productId={this.state.view.params.productId}
        addToCart={this.addToCart} />;
    } else if (view === 'cart') {
      renderPage = <CartSummary setView={this.setView} cart={this.state.cart} removeFromCart={this.removeFromCart} />;
    } else if (view === 'checkout') {
      renderPage = <CheckoutForm setView={this.setView} placeOrder={this.placeOrder} cart={this.state.cart} />;
    }
    return (
      <>
        {/* { this.state.disclaimer &&
          <Disclaimer closeDisclaimer={this.closeDisclaimer} />
        } */}
        <Header setView={this.setView} cartItemCount={this.state.cart.length} />
        <div className="bg-light">
          {renderPage}
        </div>
      </>
    );
  }
}
