import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import StripeOrderForm from './StripeOrderForm';
import NavBar from '../../NavBar/NavBar'
import './MakeOrder.css'


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const MakeOrder = () => {
    

  return (
    <div className='make-order-form'>

        <NavBar/>

        <div className='make-order-form-container'>

            <p>Payment</p>

            <div className='make-order-form-wrapper'>
                <Elements stripe={stripePromise}>
                    <StripeOrderForm/>
                </Elements>
            </div>


        </div>

    </div>
  )
}

export default MakeOrder