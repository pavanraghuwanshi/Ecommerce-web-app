import mongoose from 'mongoose'
import { InvailidateCacheProps, OrderItemType } from '../types/types.js';
import { Product } from '../models/product.js';
import { myCache } from '../app.js';
import { Order } from '../models/order.js';


export const connectDB = (uri:string)=>{

        mongoose.connect(uri, {
            dbName:"Ecommerce_24",
        })
        .then((c)=>console.log(`DB connected to ${c.connection.host}`) )
        .catch((e)=>console.log(e))
    };

export const invalidateCache = async({
                    product, 
                    order, 
                    admin,
                    userId,
                    orderId,
                    productId
                }: InvailidateCacheProps)=> {

        if(product){

            const productKeys:string[] = [
                "latest-product",
                "categories",
                "all-products",
                `product-${productId}`
            ];
            // product-${id}

           if(typeof productId === "string") productKeys.push(`product-${productId}`);
           if(typeof productId === "object") productId.forEach((i)=>  productKeys.push(`product-${i}`));

                myCache.del(productKeys);

        }

        if(order){

            const orderKeys: string[] = ["all-orders", `my-orders-${userId}`,`orders-${orderId}`];
            const orders = await Order.find({}).select("_id");

            orders.forEach((i) => {
                    
                orderKeys.push();
            });

            myCache.del(orderKeys);
        }
        if(admin){

            myCache.del(["admin-stats", "admin-pie-charts", "admin-bar-charts", "admin-line-charts" ])

        }

}; 

export const reduceStock = async(orderItems:OrderItemType[])=>{

    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i]; 
        const product = await Product.findById(order.productId);
        if(!product) throw new Error("Product Not Found");
            product.stock -= order.quntity;
        await product.save(); 
             
    }
};


export const calculatePercentage = (thisMonth: number,lastMonth: number) => {

    
        if(lastMonth === 0) return thisMonth*100;
        const percent =(thisMonth / lastMonth) * 100;
        return Number(percent.toFixed(0));

};



export const getInventories =  async({categories,productsCount}:{categories:string[]; productsCount:number;})=>{

    const categoryCountPromise = categories.map((category)=>Product.countDocuments({category}));

    const categoriesCount = await Promise.all(categoryCountPromise);
    
    
    const categoryCount: Record<string, number>[] = [] 
    
    categories.forEach((category,i)=>{
        categoryCount.push({
            [category]:Math.round(categoriesCount[i]/ productsCount * 100),
    })
    })
    
    return categoryCount;

};

    interface Mydocument extends Document{

        createdAt:Date;
        discount?: number;
        total?:number;

    }

type funcProps = {
    length:number;
    docArr:Mydocument[];
    today: Date;
    property?:"discount" | "total";
    }



export const getChartData = ({ length, docArr, today,property}:funcProps)=>{
   
        const data:number[] = new Array(length).fill(0);


    docArr.forEach((i)=>{

        const creationDate = i.createdAt;
        const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

        if(monthDiff < length){


            if (property) {
                
                data[length - monthDiff - 1] += i[property]!;
            } else {
                
                data[length - monthDiff - 1] += 1;
            }
        }
    });
    return data;
};