import React, { useEffect, useRef, useState } from 'react'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement} from '@stripe/react-stripe-js';
import {makeOrder} from '../../../actions/OrderAction'
import { getCart } from '../../../actions/cartAction';
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import axios from 'axios';
import { ConfigApplicationJson } from '../../../actions/Config';
import ButtonLoader from '../../Utils/ButtonLoader'
const BASE_URL = 'http://localhost:3900';

const StripeOrderForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch()
    const payBtn = useRef(null);

    const {cart} = useSelector((state)=>state.cart);
    const {order, loading, success, error} = useSelector((state)=>state.order);

    const [fullName, setFullName] = useState('');
    const [cartItems, setCartItems] = useState([])
    const [amount, setAmount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0);
    const [gstAmount, setGstAmount] = useState(0);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const taxRate = 0.02;

  

    const calculateTotalPrice = () => {
        let totalPriceWithoutTax = cartItems?.reduce((acc, item) => acc + item.price, 0);
        let taxAmount = totalPriceWithoutTax * taxRate;
        let totalPriceWithTax = totalPriceWithoutTax + taxAmount;
        setTotalPrice(totalPriceWithTax);
        setGstAmount(taxAmount)
        setAmount(totalPriceWithoutTax)
    }

 

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setPaymentLoading(true)
        try {

        
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: fullName
                }
            });

            if (error) {
                console.error(error);
                return;
            }

            const  formData =  {
                course_ids: [11, 12, 13, 14, 15],
                total: amount,
                gst: gstAmount,
                total_amount: totalPrice,
                fullName: fullName,
                payment_method: paymentMethod,
            }

            const data = await axios.post(`${BASE_URL}/api/v1/stripe-key`, formData, ConfigApplicationJson)

            const client_secret = data.data.client_secret

            if(client_secret){
                const result = await stripe.confirmCardPayment(client_secret, {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                        billing_details: {
                            name: fullName,
                        }
                    }
                })
            
                if(result.error){
                    payBtn.current.disabled = false;
                    toast.error(result.error.message)
                }else if(result.paymentIntent.status === "succeeded"){
                    dispatch(makeOrder(formData))
                    toast.success("Purchase Successfull")
                }
            }
        } catch (error) {
                console.log(error)
        }finally{
            setPaymentLoading(false)
        }

    };

    useEffect(() => {
        dispatch(getCart())
    }, [dispatch])

    useEffect(() => {
        setCartItems(cart)
    }, [cart])

    useEffect(() => {
        calculateTotalPrice();
    }, [cartItems]);

    const options = {
        style: {
            base: {
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.836)',
                padding: '3px',
                '::placeholder': {
                    color: 'rgba(255, 255, 255, 0.342)',
                },
            },
            invalid: {
                color: 'tomato',
            },
        },
    };
    

  return (
     <div className='make-order-stripe'>
            
            <form onSubmit={handleSubmit}>
                <div className='make-order-stripe-input'>
                    <p>Full name <span>*</span></p>
                    <input type='text' placeholder='FULL NAME' value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
                </div>
                <div className='make-order-stripe-input'>
                    <p>Card number</p>
                    <CardNumberElement options={options}/>
                </div>
                <div className='make-order-stripe-input-expiry'>
                    <div className='make-order-stripe-input'>
                        <p>Expiry</p>
                        <CardExpiryElement options={options}/>
                    </div>
                    <div className='make-order-stripe-input'>
                        <p>Expiry</p>
                        <CardCvcElement options={options}/>
                    </div>
                </div>
                <button type="submit" disabled={!stripe} ref={payBtn}>
                    {paymentLoading ? <ButtonLoader/> : "Pay"}
                </button>
            </form>
        
        </div>
  )
}

export default StripeOrderForm


