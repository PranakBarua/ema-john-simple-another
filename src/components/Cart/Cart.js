import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const cart=props.cart;
    //const total=cart.reduce((total,prd)=>total+prd.price,0);
    let total=0;
    for(let i=0;i<cart.length;i++){
        total=total+cart[i].price*cart[i].quantity;
    }
    let shippingCost=0;
    if(total>35){
        shippingCost=0;
    }
    else if(total>15){
        shippingCost=4.99;
    }
    else if(total>0){
        shippingCost=12.99;
    }
    let tax=(total/10);
    const formatNumber = num => {
        const precision=num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h4>Order summary</h4>
            <p>Items ordered : {cart.length}</p>
            <p>Product price : {formatNumber(total)}</p>
            <p>ShippingCost : {shippingCost}</p>
            <p><small>Tax+VAT : {formatNumber(tax)}</small></p>
            <p>Total : {formatNumber(total+shippingCost+tax)}</p>
            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;