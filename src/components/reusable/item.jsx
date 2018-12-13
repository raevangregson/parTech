import React, { Component } from "react";

class Item extends Component {
  constructor(props) {
    super(props);
    this.onDragStart = this.onDragStart.bind(this);
  }

  onDragStart(e) {
    e.dataTransfer.setData("items", JSON.stringify(this.props))
  }

  render() {
    return (
      <div className="itemContent" draggable onDragStart={(e) => this.onDragStart(e)}  >
        <div className="flex">
          <img src={this.props.img} draggable="false" />
          <div className="itemGroup">
            <div className="title"> {this.props.itemTitle}</div>
            <div className="description">{this.props.itemQuantity} in Stock</div>
          </div>
        </div>
        <div className="largeText">${this.props.itemPrice}</div>
      </div>
    );
  }
}

export default (Item);