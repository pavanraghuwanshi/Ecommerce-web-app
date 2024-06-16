import {Link} from 'react-router-dom'
import ProductCard from '../components/ProductCard.tsx'
import { useLatestProductsQuery } from '../redux/api/productAPI.ts'
import toast from 'react-hot-toast';
import { Skeleton } from '../components/loader.tsx';
import { CartItem } from '../types/types.ts';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducer/cartReducer.ts';



const Home = () => {

        const { data,isLoading,isError } = useLatestProductsQuery(""); 


      const dispatch = useDispatch()

    const addToCartHandler=(cartItem:CartItem)=>{

              if(cartItem.stock < 1) return toast.error("Out Of Stock");

            dispatch(addToCart(cartItem));
            toast.success("Item Added Successfully")         
    };

      if(isError) toast.error("Cannot Fetch The Products")

  return (
    <div className="home">
      <section></section>

      <h1>
        Latest Product
      <Link to="/Search" className="findmore">
        More
      </Link>
      </h1>
      
      <main>
      { isLoading?( 
         <Skeleton width='80vw'/>
        ) :(
        data?.products.map((i)=>(<ProductCard 
          key = {i._id}
          productId={i._id} 
          name={i.name}
          price={i.price}
          stock={i.stock}
          handler = {addToCartHandler}
  
          photo = {i.photo}
          />

        ))
        )}
      </main>

    </div>
  )
}

export default Home
