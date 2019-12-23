import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class CategoryList extends Component {
  state = {
    categories: []
  };

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    let url = "http://localhost:3000/categories";
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ categories: data }));
  };

  render() {
    return (
      <div>
        <h2> {this.props.info.title} </h2>
        <ListGroup>
          {this.state.categories.map(category => {
            return (
              <ListGroupItem
                onClick={() => this.props.changeCategory(category)}
                key={category.id}
                active={category.categoryName === this.props.currentCategory? true : false}
                style={{cursor:"pointer"}}
              >
                {category.categoryName}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}
