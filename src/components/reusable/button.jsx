import React, { Component} from "react";

class Button extends Component{
  render(){
    return(
      <div className={`button ${this.props.buttonClass}`} onClick={this.props.click}>
        <div className={this.props.textClass}>{this.props.text}</div>
      </div>
    );
  }
}

export default Button;