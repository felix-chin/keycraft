import React from 'react';

export default function Hero(props) {
  return (
    <div className="jumbotron jumbotron-fluid hero d-flex align-items-center">
      <div className="container hero-text text-white">
        <h1 className="display-3 font-weight-bold">Welcome to Keycraft</h1>
        <hr className="my-4"/>
        <p className="lead">We stock the latest and greatest mechanical keyboards</p>
      </div>
    </div>
  );
}
