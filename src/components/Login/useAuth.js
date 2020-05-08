import React, { useContext, useEffect } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState, createContext } from "react";
import { Route, Redirect } from 'react-router-dom';


firebase.initializeApp(firebaseConfig);

const AuthContext=createContext();
export const AuthContextProvider=(props)=>{
    const auth=Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

//const useAuth=()=>useContext(AuthContext);
export const useAuth=()=>useContext(AuthContext);

export const PrivateRoute=({ children, ...rest })=> {
    const auth=useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  

const getUser=(user)=>{
    const {displayName,email,photoURL}=user;
    return {name:displayName,email,photo:photoURL};
}

const Auth=()=>{
    const [user,setUser]=useState(null)
    const signInWithGoogle=()=>{
        var provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
        .then(res=>{
            const signInUser=getUser(res.user);
            setUser(signInUser);
            return res.user;
        })
        .catch(err=>{
            console.log(err);
            setUser(null);
            return err.message;
        })
    }
    const signOut=()=>{
        return firebase.auth().signOut()
          .then(function() {
            setUser(null);
          }).catch(function(error) {
            // An error happened.
          });
    }
    useEffect(()=>{
        firebase.auth().onAuthStateChanged(function(usr){
            if(usr){
                const currentUser=getUser(usr);
                setUser(currentUser);
                
            }
            else{
                console.log('abc');
            }
        });
    },[])

    return{
        user,
        signInWithGoogle,
        signOut
    }
}
export default Auth;