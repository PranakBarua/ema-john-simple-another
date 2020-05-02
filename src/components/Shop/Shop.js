import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData'
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
const Shop = () => {
    const first20=fakeData.slice(0,20);
    const [products,setProducts]=useState(first20);
    const [cart,setCart]=useState([]);

    useEffect(()=>{
        const saveCart=getDatabaseCart();
        const productKeys=Object.keys(saveCart);
        const cartProducts=productKeys.map(key=>{
            const product=fakeData.find(pd=>pd.key===key);
            product.quantity=saveCart[key];
            return product;
        })
        //console.log(cartProducts);
        setCart(cartProducts);
    },[])

    const handleAddProduct=(product)=>{
        let count=1;
        const toBeAddedKey=product.key;
        //console.log("added",product);
        const sameCart=cart.find(pd => pd.key===toBeAddedKey);
        let newCart;
        if(sameCart){
            count=sameCart.quantity+1;
            sameCart.quantity=count;
            const others=cart.filter(pd=>pd.key!==toBeAddedKey);
            newCart=[...others,sameCart];
        }
        else{
            product.quantity=count;
            newCart=[...cart,product];
        }
        setCart(newCart);
        
        addToDatabaseCart(product.key,count);
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(product=><Product
                        key={product.key}
                         product={product}
                         handleAddProduct={handleAddProduct}
                         showAddToButton={true}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart}>
                    <Link to="/review">
                        <button className="add-button">Review Order</button>
                    </Link>
               </Cart>
              
            </div>
          
        </div>
    );
};

export default Shop;