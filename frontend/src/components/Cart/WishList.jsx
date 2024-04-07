import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {addToCart, getCart, getWishList, deleteFromWishList} from '../../actions/cartAction'
import { toast } from 'react-toastify';

import NavBar from '../NavBar/NavBar';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { GiTireIronCross } from 'react-icons/gi';
import { IoMdHeartEmpty } from "react-icons/io";
import Loader from '../Utils/Loader';

const WishList = () => {

    const dispatch = useDispatch()
    const {cart, loading} = useSelector((state)=>state.cart);
    const {wishList} = useSelector((state)=>state.wishList);
    
    
    const [cartItems, setCartItems] = useState([])
    const [wishListItems, setWishListItems] = useState([])


    const handleAddToCart = (courseSlug) => {
        const formData = {
          slug: courseSlug
        }
        const updateWishListItems = wishListItems.filter(item => item.slug !== courseSlug)
        setWishListItems(updateWishListItems)
        dispatch(addToCart(formData))
        dispatch(deleteFromWishList(courseSlug))
        toast.success('Successfully added')
    }

    const removeFromWishList = (slugToRemove) => {
        const updatedwishListItems = wishListItems.filter(item => item.slug !== slugToRemove);
        setCartItems(updatedwishListItems);
        dispatch(deleteFromWishList(slugToRemove))
        toast.success('Successfully removed')
    }

    const isInCart = (slug) => {
        return cartItems.some(item => item.slug === slug);
    }

    useEffect(() => {
        dispatch(getCart())
        dispatch(getWishList())
    }, [dispatch])

    useEffect(() => {
        setCartItems(cart)
        setWishListItems(wishList)
    }, [cart, wishList])




  return (
    <div className='courses-cart-container'>

    <NavBar/>


    <div className='courses-cart-wrapper'>
                <p>Wish List:</p>

                {wishListItems?.length ? (
                <div className='courses-cart'>

                    <div className='courses-cart-items'>
                        {loading ? <div className='courses-cart-loader'><Loader/></div> :
                            <div className='courses-cart-items-container'>
                                {wishListItems?.map((item) => (
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
                                        {isInCart(item.slug) ? 
                                            ""
                                            :
                                            <button className='courses-cart-item-button-one' onClick={() => handleAddToCart(item.slug)}><HiOutlineShoppingCart size={22} /></button>
                                        }
                                        <button className='courses-cart-item-button' onClick={() => removeFromWishList(item.slug)}><GiTireIronCross size={22}/></button>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>

                   
                </div>
                ) : 
                <div className='empty-cart'>
                    <p>Your Wish List Is Empty<IoMdHeartEmpty size={70}/></p>
                    <Link to='/courses'>Add Courses</Link>
                </div>}

            </div>


    </div>
  );
};

export default WishList;
