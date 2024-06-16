import Mongoose  from 'mongoose'




const Schema = new Mongoose.Schema({

    code:{
        type:String,
        required:[true, "Please enter the Coupon Code"],
        unique:true
    },
    amount:{
        type:Number,
        required:[true, "Please enter the Discount Amount Code"],
    },

})




export const Coupon = Mongoose.model("Coupons", Schema);