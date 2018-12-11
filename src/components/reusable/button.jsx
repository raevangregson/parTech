import React, { Component} from "react";

class Button extends Component{
  render(){
    return(
      <div className="button">
        <div>{this.props.text}</div>
      </div>
    );
  }
}

export default Button;