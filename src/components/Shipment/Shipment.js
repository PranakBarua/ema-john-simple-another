import React from 'react';
import { useForm } from "react-hook-form";
import './Shipment.css';
import { useAuth } from '../Login/useAuth';
const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    console.log(data);
  }
    const auth=useAuth();
  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}> 
      <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Your name" />
      {errors.name && <span className="error">name is required</span>}
      <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Your email"/>
      {errors.email && <span className="error">email is required</span>}
      <input name="addressLine1" ref={register({ required: true })} placeholder="Your Address Line 1"/>
      {errors.addressLine1 && <span className="error">Address Line1 is required</span>}
      <input name="addressLine2" ref={register({ required: true })} placeholder="Your Address Line 2"/>
      <input name="city" ref={register({ required: true })} placeholder="Your City"/>
      {errors.city && <span className="error">City is required</span>}
      <input name="country" ref={register({ required: true })} placeholder="Your Country"/>
      {errors.country && <span className="error">Country is required</span>}
      <input name="zipCode" ref={register({ required: true })} placeholder="Your Zip Code"/>
      {errors.zipCode && <span className="error">ZipCode is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;