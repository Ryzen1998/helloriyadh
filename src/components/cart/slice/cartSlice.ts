import { Cart } from "../../../models/Cart/Cart";
import { createSlice } from '@reduxjs/toolkit';

interface cartState{
    cart:Cart|null
}

const initialState:cartState={
    cart :null,
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCart:(state,action)=>{
            state.cart=action.payload
        },
        removeItem:(state,action)=>{
            const {productId,quantity}=action.payload;
            const itemIndex = state.cart?.cartItems.findIndex(
                x=>x.productId===productId
            );
            if(itemIndex=== -1|| itemIndex===undefined) return;
            state.cart!.cartItems[itemIndex].quantity -= quantity;
            if(state.cart?.cartItems[itemIndex].quantity===0)
            state.cart.cartItems.splice(itemIndex,1);

        }

    }
})

export const {setCart,removeItem} = cartSlice.actions;