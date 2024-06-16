import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { BaseQuery, newProductRequsetBody, searchRequestQuery } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
import {faker} from '@faker-js/faker'
import { myCache } from "../app.js";
import { isJSON } from "validator";
import { invalidateCache } from "../utils/features.js";




// export const newProduct = TryCatch(async(
//     req: Request<{}, {},newProductRequsetBody>,res,next)=>{

//             const {name, price, stock , category} = req.body;
//             const photo = req.file;

//             if(!photo) 
//                 return next(new ErrorHandler("Please add Photo", 400))

//             if(!name || !price ||!stock ||!category) {               
//             rm(photo.path, ()=> {
//                 console.log("Deleted");
                
//             })
    
//     return next(new ErrorHandler("Please Enter All Field ", 400))
// }

//             await Product.create({
//                 name, 
//                 price, 
//                 stock , 
//                 category:category.toLowerCase(),
//                 photo: photo?.path,

//             });

//                 return res.status(201).json({
//                     success:true,
//                     message:"Product Created Successfully"
//                 })
//     }
// );




    //  Revalidate On New, Update, Delete Product & New Order  
export const getlatestProducts = TryCatch(async(
    req: Request<{}, {},newProductRequsetBody>,res,next)=>{

            let products;

            if(myCache.has("latest-product"))
                 products = JSON.parse(myCache.get("latest-product") as string)

            else{

                products = await Product.find({}).sort({createdAt: -1}).limit(5);
                myCache.set("latest-product", JSON.stringify(products));
    

            }

                return res.status(201).json({
                    success:true,
                    products,
                })
    }
);


    //  Revalidate On New, Update, Delete Product & New Order  
export const getAllCategories = TryCatch(async(req,res,next)=>{

            let categories;

            if(myCache.has("categories"))
                categories = JSON.parse( myCache.get("categories") as string)
             
             
             else{
                categories = await Product.distinct("category")
                myCache.set("categories", JSON.stringify(categories))
   
             }
                
                return res.status(201).json({
                    success:true,
                    categories,
                })
    }
);

    //  Revalidate On New, Update, Delete Product & New Order  
export const getAdminProduct = TryCatch(async(
    req: Request<{}, {},newProductRequsetBody>,res,next)=>{

            let products;
            if(myCache.has("all-products")) 
                products = JSON.parse(myCache.get("all-products") as string)


            else{
                products = await Product.find({});
                myCache.set("all-products", JSON.stringify(products))

            }

                return res.status(201).json({
                    success:true,
                    products,
                })
    }
);
export const getSingleProduct = TryCatch(async(
    req,res,next)=>{

            let product;
            const id = req.params.id;
            if(myCache.has(`product-${id}`))
                 product = JSON.parse(myCache.get(`product-${id}`) as string);

            else{

                 product = await Product.findById(id);
            if(!product) return next(new ErrorHandler("Product note found", 404))

            myCache.set(`product-${id}`, JSON.stringify(product))

            }
            return res.status(201).json({
                success:true,
                product,
            })
            
    }
);





export const newProduct = TryCatch(async(
    req: Request<{}, {},newProductRequsetBody>,res,next)=>{

            const {name, price, stock , category} = req.body;
            const photo = req.file;

            if(!photo) 
                return next(new ErrorHandler("Please add Photo", 400))

            if(!name || !price ||!stock ||!category) {               
            rm(photo.path, ()=> {
                console.log("Deleted");
                
            })
    
    return next(new ErrorHandler("Please Enter All Field ", 400))
}

            await Product.create({
                name, 
                price, 
                stock , 
                category:category.toLowerCase(),
                photo: photo.path,

            });

                await invalidateCache({product:true, admin:true});

                return res.status(201).json({
                    success:true,
                    message:"Product Created Successfully"
                })
    }
);









export const updateProduct = TryCatch(async( req, res, next )=>{
            const {id} = req.params;
            const {name, price, stock , category} = req.body;
            const photo = req.file;
            const product = await Product.findById(id);

            if(!product) return next(new ErrorHandler("Invailid Product Id", 404))


            if(photo) {               
            rm(product.photo!, ()=> {
                console.log("old photo Deleted");
                
            })
            product.photo = photo.path;  
}
            if(name) product.name = name;
            if(price) product.price = price;
            if(stock) product.stock = stock;
            if(category) product.category = category;

            await product.save();

            await invalidateCache({product:true, productId: String(product._id), admin:true});

                return res.status(200).json({
                    success:true,
                    message:"Product Updated Successfully"
                })
    }
);

export const DeleteProduct = TryCatch(async(
    req,res,next)=>{

            const product = await Product.findById(req.params.id );
            if(!product) return next(new ErrorHandler("Product note found", 404))
               
                    rm(product.photo!, ()=> {
                        console.log("Product Photo Deleted");
                        
                    });
                    await product.deleteOne();
                    await invalidateCache({product:true, productId: String(product._id), admin:true});


                return res.status(201).json({
                    success:true,
                    message:"Product Deleted Successfully"
                })
    }
);




export const getAllProducts = TryCatch(async(req: Request<{}, {},searchRequestQuery>,res,next)=>{


            const {search,sort, category,price} = req.query;

            const page = Number(req.query.page) || 1;
//             1,2,3,4,5,6,7,8

                // 2
            const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
            const skip = limit * (page - 1);

            const baseQuery: BaseQuery = {};
            
            if(search){

                if(typeof search === 'string')
                    baseQuery.name = {
    
                     $regex:search,
                      $options:"i",
                
                    };
            }
          
            if(price) baseQuery.price = {
                    $lte:Number(price),
    
                };
                if(category){

                    if(typeof category === "string") baseQuery.category = category;
                }

                const productsPromise = Product.find(baseQuery)
                    .sort(sort && {price:sort ==="asc" ? 1:-1})
                    .limit(limit)
                    .skip(skip)

                const [products,filteredOnlyProduct] = await Promise.all([ 
                    productsPromise,
                    Product.find(baseQuery)
            ])


                const totatpage = Math.ceil(filteredOnlyProduct.length/limit);

                return res.status(200).json({
                    success:true,
                    products,
                    totatpage,
                })
    }
);


// const generateRangomProducts = async(count:number = 10) =>{
//     const products = [];
//     for(let i=1; i< count; i++){
//         const product = {
//             name: faker.commerce.productName(),
//             photo:"uploads\ff8478b1-ad03-4cb5-900f-f4e28e48df57.jpeg",
//             price: faker.commerce.price({min:1500, max:80000, dec:0}),
//             stock: faker.commerce.price({min:0, max:100, dec:0}),
//             category: faker.commerce.department(),
//             createdAt: new Date(faker.date.past()),
//             updatedAt: new Date(faker.date.recent()),
//             __v:0,
//         }
//         products.push(product);
//     }
//     await Product.create(products);
//     console.log({success:true});
    
// }

// generateRangomProducts(40);