import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import StripeOrderForm from './StripeOrderForm';
import NavBar from '../../NavBar/NavBar'
import './MakeOrder.css'


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const MakeOrder = () => {

  const {user} = useSelector((state)=>state.user);
  const {cart} = useSelector((state)=>state.cart);

  const [totalPrice, setTotalPrice] = useState(0);
 
  const taxRate = 0.02;

  const calculateTotalPrice = () => {
    let totalPriceWithoutTax = cart?.reduce((acc, item) => acc + item.price, 0);
    let taxAmount = totalPriceWithoutTax * taxRate;
    let totalPriceWithTax = totalPriceWithoutTax + taxAmount;
    setTotalPrice(Math.floor(totalPriceWithTax));
  }

useEffect(() => {
  calculateTotalPrice();
}, [cart]);

  return (
    <div className='make-order-form'>

        <NavBar/>

        <div className='make-order-form-container'>

            <div className='make-order-form-payment-details'>
              <p>Details</p>
              <div>
                  <div>
                    <p>Order Preference</p>
                    <span>{user?.username}</span>
                  </div>
                  <div>
                    <p>Role</p>
                    <span>{user?.role}</span>
                  </div>
                  <div>
                    <p>Total</p>
                    <span>${totalPrice}.00</span>
                  </div>
              </div>
            </div>

            <div className='make-order-form-wrapper'>
                <Elements stripe={stripePromise}>
                    <StripeOrderForm user={user}/>
                </Elements>
            </div>


        </div>

    </div>
  )
}

export default MakeOrder