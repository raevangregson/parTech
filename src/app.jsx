import React, { Component } from "react";
import Button from './components/reusable/button.jsx'
import Item from './components/reusable/item.jsx'
import Loader from './components/reusable/loader.jsx'
import Cart from './components/cart.jsx'
var parseString = require('xml2js').parseString;

import './styles.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventory: null,
      loading: true
    }
    this.fetchData = this.fetchData.bind(this);
    this.createProducts = this.createProducts.bind(this);
    this.adjustQuantity = this.adjustQuantity.bind(this)
  }

  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    this.setState({
      loading:true
    })
    let products;
    fetch('http://localhost:3000/api/inventory')
      .then(response => response.text()
      )
      .then(results => {
        parseString(results, function (err, result) {
          products = result.inventory.product
        });
        this.createProducts(products)
      }).catch(error => console.error(error));
  }

  adjustQuantity(item, action) {
    let newArray = []
    this.state.inventory.forEach(product => {
      if (product.key == (action == 'remove' ? item.productId : item.key)) {
        let qty = product.props.itemQuantity
        if (action == "remove") {
          if (qty - 1 != 0) newArray.push(<Item itemTitle={product.props.itemTitle} itemPrice={product.props.itemPrice} itemQuantity={qty -= 1} img={product.props.img} productId={product.props.productId} key={product.props.productId} />)
        }
        else {
          newArray.push(<Item itemTitle={product.props.itemTitle} itemPrice={product.props.itemPrice} itemQuantity={qty += 1} img={product.props.img} productId={product.props.productId} key={product.props.productId} />)
        }
      }
      else {
        newArray.push(product)
      }
    })
    this.setState({
      inventory: newArray
    });
  }

  createProducts(products) {
    let inventory = [];
    products.forEach(product => {
      if (product.quantity_in_stock[0] > 0) inventory.push(<Item productId={product.product_id[0]} key={product.product_id[0]} itemPrice={product.unit_price[0]} itemQuantity={product.quantity_in_stock[0]} itemTitle={product.product_name[0]} img={"http://www.partechgss.com" + product.product_img[0].trim()} />)
    })
    this.setState({
      inventory,
      loading:false
    })
  }


  render() {
    return (
      <div className='mainContent'>
        <Button text='Retrieve New Inventory' click={this.fetchData} />
        <div className="flex">
          <div className={this.state.loading?'itemsLoading':'items'}>
            {this.state.loading?<Loader/>:this.state.inventory}
          </div>
          <Cart adjustQuantity={this.adjustQuantity} />
        </div>
      </div>

    );
  }
}

export default App;