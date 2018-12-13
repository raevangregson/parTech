import React, { Component } from "react";
import Button from './reusable/button.jsx'
import ListObject from './reusable/listObject.jsx'
import ls from 'local-storage'

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.removeObject = this.removeObject.bind(this);
        this.save = this.save.bind(this)
    }

    componentDidMount() {
        let objects = ls.get('products')
        if (objects) {
            let products = objects.map(product => {
                return <ListObject removeObject={() => this.removeObject(product)} itemTitle={product.props.itemTitle} itemPrice={product.props.itemPrice} itemQuantity={product.props.itemQuantity} img={product.props.img} key={product.props.productId} productId={product.props.productId} />
            })
            this.setState({
                products: products
            })
        }
    }

    onDragOver(e) {
        e.preventDefault()
    }

    removeObject(e) {
        let products = this.state.products.map(product => {
            if (product.key == (e.productId ? e.productId : e.props.productId)) {
                let qty = product.props.itemQuantity
                let newObject = <ListObject removeObject={() => this.removeObject(product)} itemTitle={product.props.itemTitle} itemPrice={product.props.itemPrice} itemQuantity={qty -= 1} img={product.props.img} key={product.props.productId} productId={product.props.productId} />
                this.props.adjustQuantity(newObject, 'add')
                return newObject
            }
            else {
                return <ListObject removeObject={() => this.removeObject(product)} itemTitle={product.props.itemTitle} itemPrice={product.props.itemPrice} itemQuantity={product.props.itemQuantity} img={product.props.img} key={product.props.productId} productId={product.props.productId} />
            }
        })
        let newProducts = products.filter(product => {
            if (product.props.itemQuantity < 1) return false
            else { return true }
        })
        this.setState({
            products: newProducts
        })
    }

    onDrop(e) {
        let item = e.dataTransfer.getData("items")
        item = JSON.parse(item)
        let products = [...this.state.products]
        let exists = products.filter(product => item.productId == product.key)
        if (exists.length > 0) {
            let newArray = []
            products.forEach(product => {
                if (product.key == item.productId) {
                    let qty = product.props.itemQuantity
                    newArray.push(<ListObject removeObject={() => this.removeObject(product)} itemTitle={item.itemTitle} itemPrice={item.itemPrice} itemQuantity={qty += 1} img={item.img} key={item.productId} productId={item.productId} />)
                }
                else {
                    newArray.push(product)
                }
            })
            this.setState({
                products: newArray
            }, this.props.adjustQuantity(item, 'remove'));
        }
        else {
            products.push(<ListObject removeObject={() => this.removeObject(item)} img={item.img} itemTitle={item.itemTitle} itemPrice={item.itemPrice} itemQuantity={1} key={item.productId} productId={item.productId} />)
            this.setState({
                products
            }, this.props.adjustQuantity(item, 'remove'));
        }
    }

    save() {
        ls.set('products', this.state.products);
    }

    render() {
        let totalPrice = 0;
        this.state.products.forEach(product => {
            totalPrice += Number(product.props.itemPrice);
        });
        return (
            <div className="cartContent" onDrop={(e) => { this.onDrop(e) }} onDragOver={(e) => this.onDragOver(e)}>
                <div className="list">
                    {
                        this.state.products
                    }
                </div>
                <div className='largeCartGroup'>
                    <Button buttonClass={'checkoutButton'} click={this.save} text="Checkout" />
                    <div className='cartGroup'>
                        <div className='total'>{"Cart Total:"}</div><div className="marginLeft">${totalPrice.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;