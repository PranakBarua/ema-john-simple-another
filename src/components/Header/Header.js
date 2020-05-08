import React, { useState, useRef, useEffect } from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import {useAuth} from '../Login/useAuth'
// const usePrevious=value=>{
//     const prev=useRef();
//     useEffect(()=>{
//         prev.current=value;
//     },[value])
//     return prev.current;
// }
const Header = () => {
    //const [count,setCount]=useState(0);
    //const previous=usePrevious(count);
    const auth=useAuth();
    //console.log(auth.user);
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <a className="shopLink" href="/shop">Shop</a>
                <a href="/review">Review</a>
                <a href="/inventory">Manage Inventory</a>
                {
                    auth.user &&<span style={{color:'yellow'}}>Welcome {auth.user.name}</span>
                    
                }
                {
                    auth.user?<a href="/login">SignOut</a>
                    :
                    <a href="/login">SignIn</a>
                }
            </nav>
        </div>
    );
};

export default Header;