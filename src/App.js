import React, { Component } from "react";
import Navi from "./Navi";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import alertify from 'alertifyjs';
import {Route, Switch} from 'react-router-dom'
import NotFound from "./NotFound";
import CartList from "./CartList";

export default class App extends Component {
  state = {
    currentCategory: "",
    products: [],
    cart: []
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = categoryId => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += `?categoryId=${categoryId}`;
    }
    fetch(url)
      .then(response => response.json())
      .then(response => this.setState({ products: response }));
  };

  changeCategory = category => {
    this.setState({
      currentCategory: category.categoryName
    });
    this.getProducts(category.id);
  };

  addToCart = product => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(c => c.product.id === product.id);
    if(addedItem){
      addedItem.quantity += 1;
      product.unitsInStock -= 1
    }else{
          newCart.push({ product: product, quantity: 1 });
    }

    this.setState({
      cart: newCart,
    })
    alertify.success(`${product.productName} added to cart!`)
  };

  resetFromCart = () => {
    this.setState({
      cart: []
    })
    alertify.error(`Remove all carts!`);
  }

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter(cartItem => cartItem.product.id !== product.id);
    this.setState({
      cart: newCart
    })
    alertify.error(`${product.productName} remove cart!`)
  }

  render() {
    let categoryInfo = { title: "CategoryList" };
    let productInfo = { title: "ProductList" };
    return (
      <div className="App">
        <Container>
          <Navi
            cart={this.state.cart}
            resetFromCart={this.resetFromCart}
            removeFromCart={this.removeFromCart}
          />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <ProductList
                      {...props}
                      products={this.state.products}
                      currentCategory={this.state.currentCategory}
                      info={productInfo}
                      addToCart={this.addToCart}
                    />
                  )}
                />
                <Route
                  exact
                  path="/cart"
                  render={props => (
                    <CartList
                      {...props}
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                    />
                  )}
                />
                <Route exact path="" component={NotFound} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
