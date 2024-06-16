import { stringify } from "querystring";
import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { log } from "console";
import { stripe } from "../app.js";




export const createPaymentIntent = TryCatch(async(req,res,next)=>{

    const {amount} = req.body;

    if(!amount) return next(new ErrorHandler("Please enter amount", 400));

    const createPaymentIntent = await stripe.paymentIntents.create(
        {   amount:Number(amount)*100, 
            currency:"inr",
        })


res.status(201).json({
    success:true,
    clientSecret:createPaymentIntent.client_secret,
})


})


export const newCoupon = TryCatch(async(req,res,next)=>{

        const {coupon, amount} = req.body;

        if(!coupon || !amount) return next(new ErrorHandler("Please enter both coupon and amount", 400));

    await Coupon.create({code:coupon, amount})

    res.status(201).json({
        success:true,
        message:`Coupon ${coupon} Created Successsfully`,
    })


})
export const applyDiscount = TryCatch(async(req,res,next)=>{

        const {coupon} = req.query;

        const discount = await Coupon.findOne({code:String(coupon)})

        if(!discount) return next(new ErrorHandler("Invailid Coupon code", 400));


    res.status(200).json({
        success:true,
        discount:discount.amount,
    })


})
export const allCoupons = TryCatch(async(req,res,next)=>{

        const coupons = await Coupon.find({})
        console.log(coupons);
        

    res.status(200).json({
        success:true,
        coupons,
    })

})

export const deleteCoupon = TryCatch(async(req,res,next)=>{

        const {id} = req.params;
        const coupon = await Coupon.findByIdAndDelete(id);
        
        if(!coupon) return next(new ErrorHandler("Invalid Coupon Id", 400))
     

        return res.status(200).json({
        success:true,
        message:`Coupon deleted successfully`
    })

})