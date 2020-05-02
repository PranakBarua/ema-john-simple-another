import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';
const Product = (props) => {
    //console.log(props);
    const { img, name, seller, stock, price,key } = props.product;
    return (
        <div className="product">
            <div className="product-left">
                <img src={img} alt="" />
            </div>
            <div className="product-right">
                <h3 className="product-name"><Link to={"/product/"+key}>{name}</Link></h3>
                <br />
                <p><small>by : {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock</small></p>
                {(props.showAddToButton) && <button 
                    className="add-button" 
                    onClick={()=>props.handleAddProduct(props.product)}
                >
                        <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
                </button>}
            </div>
        </div>
    );
};

export default Product;