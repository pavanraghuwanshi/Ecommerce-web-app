import { Order, Product, Stats, User, shippingInfo } from "./types";


export type CustomError = {
    status:number;
    data:{
        message:string;
        success:boolean;
    }
}


export type MessageResponse = {
    success: boolean;
    message: string;
    
}


export type AllUsersResponse = {
    success: boolean;
    users: User[];
    
}




export type UserResponse = {
    success: boolean;
    user: User;
    
}
export type AllProductResponse = {
    success: boolean;
    products:Product[];
    
}


export type categoriesResponse = {
    success: boolean;
    categories:String[];
    
}

export type searchProductsResponse = {
    success: boolean;
    products:Product[];
    totalPage: number;    
};

export type searchProductsRequest = {
        
        price: number;    
        page: number;
        category:string;
        search:string;
        sort:string;

};

export type ProductResponse = {
    success: boolean;
    product:Product;
    
}

export type AllOrderResponse = {
    success: boolean;
    orders:Order[];  
}

export type orderDetailsResponse = {
    success: boolean;
    order:Order;  
}


export type StatsResponse = {
    success: boolean;
    stats:Stats;  
}
export type PieResponse = {
    success: boolean;
    stats:Stats;  
}



export type NewProductRequest = {
    id: string;
    formData:FormData;

}


export type updateProductRequest = {
    userId: string;
    productId: string;
    formData:FormData;

}


export type deleteProductRequest = {
    userId: string;
    productId: string;

}


export type NewOrderRequest = {

    shippingInfo:shippingInfo;
    orderItems:any;
    subtotal:number;
    tax:number;
    shippingCharges:number;
    discount:number;
    total:number;
    user:string;

}


export type updateOrderRequest = {

   userId:string;
   orderId:string;

}


export type deleteUserRequest = {
    userId:string;
    adminUserId:string;
}




