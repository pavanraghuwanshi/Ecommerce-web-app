import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItemCard from "../components/Cart-item";
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import { CartReducerInitialState } from "../types/reducer-type";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import { useDispatch } from 'react-redux';
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../redux/store";





const Cart = () => {

          const {cartItems,subtotal,tax,total,shippingCharges,discount} = useSelector((state:{CartReducer:CartReducerInitialState})=> state.CartReducer)

          const dispatch = useDispatch();


      const [couponCode, setCouponCode] = useState<string>("");
      const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

      const incrementHandler=(cartItem:CartItem)=>{

        if(cartItem.quntity >= cartItem.stock) return toast.error("No More Stock Available");
      dispatch(addToCart({...cartItem, quntity:cartItem.quntity+1}));
};


      const decrementHandler=(cartItem:CartItem)=>{

           if(cartItem.quntity <= 1) return toast.error("Item is Decresed");
       dispatch(addToCart({...cartItem, quntity:cartItem.quntity - 1}));

};

      const removeHandler=(productId:string) => {

      dispatch(removeCartItem(productId));
};



      useEffect(()=>{

        const {token:cancelToken, cancel} = axios.CancelToken.source() 

          const timeOutID = setTimeout(()=>{

            axios.
            get(`${server}/api/v1/payment/discount?coupon=${couponCode}`,{cancelToken}).
            then((res) => {

              dispatch(discountApplied(res.data.discount));
              setIsValidCouponCode(true)
              dispatch(calculatePrice());
            }). 
            catch(() =>{

              dispatch(discountApplied(0));
              setIsValidCouponCode(false)
              dispatch(calculatePrice());
            });

          },1000);

        return () =>{
            clearTimeout(timeOutID);
            cancel();
            setIsValidCouponCode(false);

        }
      }, [couponCode]);


      useEffect(() => {

            dispatch(calculatePrice());
      }, [cartItems])



  return (
    <div className="cart">
      <main>

    {cartItems.length > 0 ? (
      cartItems.map((i,idx) =>
                    <>      
                    {/* <h4>AvailableStock={cartItems.length}</h4> */}
                          <CartItemCard 
                            incrementHandler={incrementHandler} 
                            decrementHandler={decrementHandler} 
                            removeHandler={removeHandler} key={idx} cartItem={i}
                            />            
                            </> 
                            )
      
      ) : (
      <h1>No Item Added</h1> 
      )}

      </main>
      <aside>
        <p>Subtotal:₹{subtotal}</p>
        <p>shoppingCharges:₹{shippingCharges}</p>
        <p>tax:₹{tax}</p>
        <p>
        Discount: <em className="red">  - ₹{discount} </em>
        </p>
        <p>
          <b>Total:₹{total}</b>
        </p>
        <input type="text" 
        placeholder="Coupon Code"
        value={couponCode}
        onChange={(e)=>setCouponCode(e.target.value)}
        />

    {

        couponCode && 
        (isValidCouponCode ? (
          <span className="green">
           ₹{discount} off using the <code>{couponCode}</code>
            </span>
       ) : (
       <span className="red">
         Invalid Coupon <VscError />

         </span>
))}


     {cartItems.length > 0 &&

       <Link to="/shipping"> Checkout</Link>}
      {/* <Link to= "/shipping"> Checkout</Link> */}

      </aside>



    </div>

  )
};

export default Cart
