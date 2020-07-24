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
      }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {

  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
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
        <Header />
        <div className="py-4 bg-light">
          {productRender}
        </div>
      </>
    );
  }
}
