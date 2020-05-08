import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';
const Review = () => {
    const[cart,setCart]=useState([]);
    const [orderReview,setOrderReview]=useState(false);
    const removeProduct=(productKey)=>{
        const newCart=cart.filter(pd=>pd.key!==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    const auth=useAuth();

    const handlePlaceOrder=()=>{
        setCart([]);
        setOrderReview(true);
        processOrder();
    }

    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        //const productValues=Object.values(savedCart);
        const cartProducts=productKeys.map(key=>{
            const product = fakeData.find(pd=>pd.key===key)
            product.quantity=savedCart[key];
            return product;
        })
        //console.log(cartProducts);
        setCart(cartProducts);
    },[])
    let thankYou;
    if(orderReview){
        thankYou = <img src={happyImage} alt=""/>
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(pd=><ReviewItem 
                        product = {pd}
                        removeProduct={removeProduct}
                        key={pd.key}> 
                        </ReviewItem>)
                    
                }
                {thankYou}
                {
                    !cart.length && <h1>Your cart is empty. <a href="/shop">Keep Shopping</a> </h1>
                }
                
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/shipment">
                        {
                            auth.user?
                            <button className="add-button">Proceed Checkout</button>
                            :
                            <button className="add-button">Login to Proceed</button>
                        }
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;