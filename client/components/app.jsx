import React from 'react';
import Header from './header';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <Header />
    );
  }
}
