import React, { useEffect, useRef, useState } from 'react'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import {makeOrder} from '../../../actions/OrderAction'
import { getCart } from '../../../actions/cartAction';
import { useDispatch, useSelector } from 'react-redux'
import {toast} from 'react-toastify'
import axios from 'axios';
import { ConfigApplicationJson } from '../../../actions/Config';
import ButtonLoader from '../../Utils/ButtonLoader'
import visaImg from '../../../assets/icons8-visa-200.png'
import masterImg from '../../../assets/icons8-mastercard-200.png'
import amixe from '../../../assets/icons8-american-express-200.png'
import cryptoImg from '../../../assets/icons8-crypto-200.png'
import ethImg from '../../../assets/icons8-ethereum-200.png'

const BASE_URL = 'http://localhost:3900';

const StripeOrderForm = ({user}) => {

    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch()
    const payBtn = useRef(null);
    const navigate = useNavigate();

    const {cart} = useSelector((state)=>state.cart);
    
    const [activeTab, setActiveTab] = useState('Visa');
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
        setTotalPrice(Math.floor(totalPriceWithTax));
        setGstAmount(taxAmount)
        setAmount(totalPriceWithoutTax)
    }

 

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const cartIds = cartItems.map(item => item.id);
        const cartCourseSlugs = cartItems.map(item => item.slug);

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
                slugs: cartCourseSlugs,
                course_ids: cartIds,
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
                            email: user?.email,
                        }
                    }
                })
            
                if(result.error){
                    payBtn.current.disabled = false;
                    toast.error(result.error.message)
                }else if(result.paymentIntent.status === "succeeded"){
                    dispatch(makeOrder(formData))
                    toast.success("Purchase Successfull")
                    navigate('/Student/Profile');                }
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
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.836)',
                '::placeholder': {
                    color: 'rgba(255, 255, 255, 0.342)',
                },
            },
            invalid: {
                color: 'tomato',
            },
        },
    };
    
    const handleMainTabClick = (tab) => {
        setActiveTab(tab);
    };

  return (
     <div className='make-order-stripe'>
        
        <div className='make-order-cards-container'>
            <p>Payment Method</p>
            <span>Please select a payment method by clicing on the logo</span>

            <div className='make-order-cards'>
                <p>Card</p>
                <div>
                    <button className={activeTab === 'Visa' ? 'make-order-cards-active' : ''} onClick={() => handleMainTabClick('Visa')}><img src={visaImg} alt='visaImg'/></button>
                    <button className={activeTab === 'master' ? 'make-order-cards-active' : ''} onClick={() => handleMainTabClick('master')}><img src={masterImg} alt='masterImg'/></button>
                    <button className={activeTab === 'amixe' ? 'make-order-cards-active' : ''} onClick={() => handleMainTabClick('amixe')}><img src={amixe} alt='amixe'/></button>
                </div>
            </div>
            <div className='make-order-e-wallets'>
                <p>Online</p>
                <div>
                    <button className={activeTab === 'bitcoin' ? 'make-order-cards-active' : ''} onClick={() => handleMainTabClick('bitcoin')}><img src={cryptoImg} alt='cryptoImg'/></button>
                    <button className={activeTab === 'eth' ? 'make-order-cards-active' : ''} onClick={() => handleMainTabClick('eth')}><img src={ethImg} alt='ethImg'/></button>
                </div>
            </div>
        </div>

        {activeTab === 'Visa' || activeTab === 'master' || activeTab === 'amixe' ? (

        <div className='make-order-stripe-form-container'>
            <p>Payment Details</p>
            <span>Please fill out the form to complete payment</span>
       
            <form onSubmit={handleSubmit}>
            
                <div className='make-order-stripe-input'>
                    <p>Full name <span>*</span></p>
                    <span><input type='text' placeholder='FULL NAME' value={fullName} onChange={(e) => setFullName(e.target.value)} required/></span>
                </div>
                <div className='make-order-stripe-input'>
                    <p>Card number</p>
                    <span>
                        <div><CardNumberElement options={options}/></div>
                        {activeTab === 'Visa' && <img src={visaImg} alt='visaImg' width={34}/>}
                        {activeTab === 'master' && <img src={masterImg} alt='masterImg' width={34}/>}
                        {activeTab === 'amixe' && <img src={amixe} alt='amixe' width={34}/>}
                    </span>
                </div>
                <div className='make-order-stripe-input-expiry'>
                    <div className='make-order-stripe-input'>
                        <p>Expiry</p>
                        <span> <CardExpiryElement options={options}/></span>
                    </div>
                    <div className='make-order-stripe-input'>
                        <p>Expiry</p>
                        <span><CardCvcElement options={options}/></span>
                    </div>
                </div>
                <button type="submit" disabled={!stripe} ref={payBtn}>
                    {paymentLoading ? <span><p><ButtonLoader/></p></span> : "Pay"}
                </button>
            </form>

        </div>
        ) : (
            <div>
                <p>Coming soon</p>
            </div>
        )}
        
    </div>
  )
}

export default StripeOrderForm


