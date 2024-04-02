import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import {getCart, deleteFromCart} from '../../actions/cartAction'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Utils/Loader'
import { GiTireIronCross } from "react-icons/gi";
import { IoBagCheckOutline } from "react-icons/io5";
import './Cart.css'
import { Link } from 'react-router-dom'
import { HiOutlineShoppingCart } from "react-icons/hi2";

const Cart = () => {
    
    const dispatch = useDispatch()
    const {cart, loading} = useSelector((state)=>state.cart);
    
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);
    const taxRate = 0.02;

    const calculateTotalPrice = () => {
        let totalPriceWithoutTax = cartItems?.reduce((acc, item) => acc + item.price, 0);
        let taxAmount = totalPriceWithoutTax * taxRate;
        let totalPriceWithTax = totalPriceWithoutTax + taxAmount;
        setTotalPrice(totalPriceWithTax);
    }

    useEffect(() => {
        dispatch(getCart())
    }, [dispatch])

    useEffect(() => {
        setCartItems(cart)
    }, [cart])

    useEffect(() => {
        calculateTotalPrice();
    }, [cartItems]);
    
    const removeFromCart = (slugToRemove) => {
        const updatedCartItems = cartItems.filter(item => item.slug !== slugToRemove);
        setCartItems(updatedCartItems);
        // const formData = {
        //     slug: slugToRemove
        // }
        dispatch(deleteFromCart(slugToRemove))
    }

    return (
        <div className='courses-cart-container'>

            <NavBar/>


            <div className='courses-cart-wrapper'>
                <p>Cart:</p>

                {cartItems?.length ? (
                <div className='courses-cart'>

                    <div className='courses-cart-items'>
                        {loading ? <div className='courses-cart-loader'><Loader/></div> :
                            <div className='courses-cart-items-container'>
                                {cartItems?.map((item) => (
                                    <div key={item.slug} className='courses-cart-item'>
                                        <div className='courses-cart-item-wrapper'>
                                            <img src={item.course_thumbnail.url} alt='Thumbnail'/>
                                            <div className='courses-cart-heading'>
                                                <Link to={`/courses/course/${item.slug}`}>{item.course_title}</Link>
                                                <div>
                                                    <p><span>By</span> {item.teacher_name}</p>
                                                    <span>${item.price}.00</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className='courses-cart-item-button' onClick={() => removeFromCart(item.slug)}><GiTireIronCross size={22}/></button>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>

                    <div className='courses-cart-checkout'>
                        {loading ? <div className='courses-cart-loader'><Loader/></div> :
                            <div className='courses-cart-checkout-container'>
                                <p>Checkout:</p>
                                <div className='courses-cart-checkout-item'>
                                    {cartItems?.map((item, index) => (
                                        <div key={item.slug} className='courses-cart-checkout-item-courses'>
                                            <p>Course {index + 1}</p>
                                            <span>$ {item.price}.00</span>
                                        </div>
                                    ))}
                                    <div className='courses-cart-checkout-container-tax'>
                                        <p>Tax {taxRate * 100}%</p>
                                        <span>${(totalPrice - totalPrice / (1 + taxRate)).toFixed(2)}</span>
                                    </div>
                                    <div className='courses-cart-checkout-container-total'>
                                        <p>Total</p>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>

                                    <Link className='courses-cart-checkout-btn' to={'/Student/make-order'}><IoBagCheckOutline size={24}/>Checkout</Link>
                                </div>

                            </div>
                        }
                    </div>

                </div>
                ) : 
                <div className='empty-cart'>
                    <p>Your Cart Is Empty<HiOutlineShoppingCart size={70}/></p>
                    <Link to='/courses'>Add Courses</Link>
                </div>}

            </div>

        </div>
  )

}

export default Cart