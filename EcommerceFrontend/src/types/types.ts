
export type User = {
    name:string,
    email:string,
    photo:string,
    gender:string,
    role:string,
    dob:string,
    _id:string,
}


export type Product = {

    name:string;
    price:number
    stock:number;
    category:string;
    photo:string;
    _id:string;
}

export type shippingInfo = {

    address:string;
    city:string;
    state:string;
    country:string;
    pinCode:string;
   
};
export type CartItem = {

    productId:string;
    photo:string;
    name:string;
    price:number;
    quntity:number;
    stock:number;
   
};


export type OrderItem =  Omit<CartItem, "stock"> & {_id:string};

export type Order = {

    orderItems:OrderItem[];
    shippingInfo:shippingInfo;
    subtotal:number;
    tax:number;
    shippingCharges:number;
    discount:number;
    total:number;
    status:string;
    user:{
        name:string;
        _id:string;
     };
    _id:string;
};


type CountAndChange = {
    revenue: number;
    product: number;
    user: number;
    order: number;
}

type LatestTransaction = {

_id: string;
amount: number;
discount: number;
quantity: number;
status: string;

}

export type Stats = {

    categoryCount: Record<string, number>[],
    ChangePercent:CountAndChange,
    count:CountAndChange,
chart:{
    order:number[],
    revenue:number[],
},
userRatio:{
    male: number;
    female: number;
},
latestTransaction:LatestTransaction[],
};


export type Stats = {

    categoryCount: Record<string, number>[],
    ChangePercent:CountAndChange,
    count:CountAndChange,
chart:{
    order:number[],
    revenue:number[],
},
userRatio:{
    male: number;
    female: number;
},
latestTransaction:LatestTransaction[],
};