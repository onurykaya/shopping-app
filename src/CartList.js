import React, { Component } from 'react';
import {Table, Button} from 'reactstrap'

export default class CartList extends Component {

    cartList = () => {
        return (
          <div>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Quantity Per Unit</th>
                  <th>Unit Price</th>
                  <th>Units In Stock</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {this.props.cart.map(cartItem => {
                  console.log(cartItem);
                  return (
                    <tr key={cartItem.product.id}>
                      <th scope="row"> {cartItem.product.id} </th>
                      <td> {cartItem.product.productName} </td>
                      <td> {cartItem.product.quantityPerUnit} </td>
                      <td> {cartItem.product.unitPrice} </td>
                      <td> {cartItem.product.unitsInStock} </td>
                      <td> {cartItem.quantity} </td>
                      <td>
                        <Button
                        color="danger"
                          onClick={() =>
                            this.props.removeFromCart(cartItem.product)
                          }
                        >
                          X
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        );
    }


    render() {
        return <div>{this.props.cart.length > 0 ? this.cartList(): <div>Empty Carts</div>}</div>;
    }
}
