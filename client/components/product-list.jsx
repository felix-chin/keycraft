import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  render() {
    return (
      <div className="container m-4">
        <div className="row">
          <div className="col-sm">
            <ProductListItem />
          </div>
          <div className="col-sm">
            <ProductListItem />
          </div>
          <div className="col-sm">
            <ProductListItem />
          </div>
        </div>
      </div>
    );
  }
}
