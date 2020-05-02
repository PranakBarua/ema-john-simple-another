import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import fakeData from '../../fakeData';

const ProductDetails = () => {
    const {productKey}=useParams();
    const pro = fakeData.find(pd=>pd.key===productKey);
    return (
        <div>
            <Product showAddToButton={false} product={pro}></Product>
        </div>
    );
};

export default ProductDetails;