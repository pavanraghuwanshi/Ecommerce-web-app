import { FaTrash } from 'react-icons/fa';
import {Link} from 'react-router-dom'
import { server } from '../redux/store';
import { CartItem as CartItems } from '../types/types';



type cartItemsProps = {

    cartItem:CartItems;
    incrementHandler: (CartItem:CartItems)=> void;
    decrementHandler: (CartItem:CartItems)=> void;
    removeHandler: (id:string)=> void;
};

    const CartItem = ({cartItem, incrementHandler, decrementHandler, removeHandler}: cartItemsProps) => {

        const {photo , productId, name, price,quntity} = cartItem

  return <div className="Cart-item">
    
        <img src={`${server}/${photo}`} alt={name} />
        <article>
            <Link to={`/product/${productId}`}>{name}</Link>
            <span> ₹{price} </span>
        </article>

        <div>

        <button onClick={()=>decrementHandler(cartItem)}> - </button>
        <p>{quntity}</p>
        <button onClick={()=>incrementHandler(cartItem)} >+</button>
        </div>

        <button onClick={()=>removeHandler(productId)}>
            <FaTrash/>
        </button>


       </div>
}

export default CartItem;
