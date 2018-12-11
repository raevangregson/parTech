import React, { Component} from "react";

class Item extends Component{
  render(){
    return(
      <div className="ItemContent">
      <div className="flex">
        <img></img>
        <div className="verticalFlex">
        <div className="title"> {this.props.itemTitle}</div>
        <div className="description">{this.props.itemQuantity}</div>
        </div>
        </div>
        <div className="largeText">{this.props.itemPrice}</div>
      </div>
    );
  }
}

export default Item;