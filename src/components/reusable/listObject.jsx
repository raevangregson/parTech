import React, { Component} from "react";
import Button from './button.jsx'

class ListObject extends Component{
  
  render(){
    return(
      <div className="listObjectContent" >
      <div className="flex">
        <img src={this.props.img} draggable="false" className='listImage'/>
        <div className="listGroupOne">
        <div className="listTitle"> {this.props.itemTitle}</div>
        <div className="listDescription">{"Qty:"+" "+this.props.itemQuantity}</div>
        </div>
        </div>
        <div className={'listGroup'}>
          <Button buttonClass={'listButton'} click={this.props.removeObject} text='Remove'/>
        <div className="largeText">${this.props.itemPrice}</div>
        </div>
      </div>
    );
  }
}

export default ListObject;