import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { AllOrderResponse, MessageResponse, NewOrderRequest, orderDetailsResponse, updateOrderRequest} from '../../types/api-types';


export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/order/`
    }), 

    tagTypes:["orders"],
    endpoints:(builder) => ({

        newOrder:builder.mutation<MessageResponse,NewOrderRequest>({
            query:(order)=>({
                url:"new", 
                method:"POST", 
                body:order}),
            invalidatesTags:["orders"]
        }),

        updateOrder:builder.mutation<MessageResponse,updateOrderRequest>({
            query:({userId,orderId})=>({
                url:`${orderId}?id=${userId}`, 
                method:"PUT", 
            }),
            invalidatesTags:["orders"]
        }),

        deleteOrder:builder.mutation<MessageResponse,updateOrderRequest>({
            query:({userId,orderId})=>({
                url:`${orderId}?id=${userId}`, 
                method:"DELETE", 
            }),
            invalidatesTags:["orders"]
        }),

        myOrders:builder.query<AllOrderResponse,string>({
            query:(id)=>`my?id=${id}`,
            providesTags:["orders"]
        }),

        allOrders:builder.query<AllOrderResponse,string>({
            query:(id)=>`all?id=${id}`,
            providesTags:["orders"]
        }),

        orderDetails:builder.query<orderDetailsResponse,string>({
            query:(id)=> id,
            providesTags:["orders"]
        }),
    }),
});


    export const {useNewOrderMutation,
                useUpdateOrderMutation,
                useDeleteOrderMutation,
                useMyOrdersQuery,
                useAllOrdersQuery,
                useOrderDetailsQuery
            
                    } = orderApi;