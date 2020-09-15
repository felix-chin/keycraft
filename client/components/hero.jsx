import React from 'react';

export default function Hero(props) {
  return (
    <section className="jumbotron jumbotron-fluid hero d-flex align-items-center">
      <div className="container hero-text text-white">
        <h1 className="display-4">Welcome to <span className="russo-font">KEYCRAFT</span></h1>
        <hr className="my-4"/>
        <p className="lead">We stock the latest and greatest mechanical keyboards</p>
        <p className="lead">Free shipping for orders within the US</p>
      </div>
      <div className="scroll-down text-white">
        <i className="far fa-hand-point-down fa-2x mr-4"></i>
        <span className="lead font-italic">Scroll down to see our latest keyboards</span>
        <i className="far fa-hand-point-down fa-2x ml-4"></i>
      </div>
    </section>
  );
}
