import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge
} from "reactstrap";

export default class CartSummary extends Component {
  renderCart = () => {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Cart - {this.props.cart.length}
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map(cartItem => {
            return (
              <DropdownItem key={cartItem.product.id}>
                  <Badge onClick={()=> this.props.removeFromCart(cartItem.product)}>X</Badge>
                {cartItem.product.productName}
                <Badge> {cartItem.quantity} </Badge>
              </DropdownItem>
            );
          })}

          <DropdownItem divider />
          <DropdownItem onClick={()=> this.props.resetFromCart()}>Reset</DropdownItem>
          <Link to ="cart"><DropdownItem color="danger">Go to cart</DropdownItem></Link>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  };

  render() {
    return <div>
        {this.props.cart.length >0 && this.renderCart()}
    </div>;
  }
}
