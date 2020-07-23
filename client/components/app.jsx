import React from 'react';
import Header from './header';
import ProductListItem from './product-list-item';
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
        <ProductListItem />
      </>
    );
  }
}
