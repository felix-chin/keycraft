import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <>
        <Header />
        <div className="py-4 bg-light">
          <ProductList />
          <ProductDetails />
        </div>
      </>
    );
  }
}
