import React from 'react';

const ReviewItem = (props) => {
    const {name,quantity,key,price}=props.product;
    const reviewItemStyle={
        borderBottom:'1px solid gray',
        marginBottom:'10px',
        paddingBottom:'10px',
        marginLeft:'200px',
        marginRight:'200px'
    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h3 className="product-name">Name : {name}</h3>
            <p>Quantity : {quantity}</p>
            <p>Price : {price}</p>
            <br/>
            <button 
                className="add-button"
                onClick={()=>props.removeProduct(key)}
            >remove</button>
        </div>
    );
};

export default ReviewItem;