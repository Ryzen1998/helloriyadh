import { Cart } from "../../../models/Cart/Cart";
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import agent from '../../../Api/agent';
import { getCookies } from '../../../utils/utils';

interface CartState{
    cart:Cart|null,
    status:string;
}

const initialState:CartState={
    cart :null,
    status:'idle',
}
 export const addBasketItemAsync= createAsyncThunk<Cart,{productId:number,quantity?:number}>(
    'cart/addcartitemasync',
    async({productId,quantity=1})=>{
        try {
            return await agent.Cart.addItem(productId,quantity);
            
        } catch (error) {
            console.log(error);
        }
    }
 );

 export const removeBasketItemAsync= createAsyncThunk<void,{productId:number,quantity?:number,name?:string}>(
    'cart/removeBasketItemAsync',
    async({productId,quantity=1})=>{
        try {
             await agent.Cart.removeItem(productId,quantity)
        } catch (error) {
            console.log(error);
        }
    }
 )

 export const fetchCartAsync = createAsyncThunk<Cart>(
    'cart/fetchCartAsync',
   async (_,thunkAPI) => {
    try {
        return await agent.Cart.get();
    } catch (error:any) {
        return thunkAPI.rejectWithValue(error.data)
    }
   },
   {
    condition:()=>{
        if(!getCookies('buyerId')) return false;
    }
   }
 )

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCart:(state,action)=>{
            state.cart=action.payload
        },
        removeCart:(state)=>{
            state.cart=null;
        }
    },
    extraReducers:(builder)=>{
        //add
        builder.addCase(addBasketItemAsync.pending,(state,action)=>{
            state.status='pendingAddItem'+action.meta.arg.productId;
        });
         //remove
        builder.addCase(removeBasketItemAsync.pending,(state,action)=>{
            state.status='pendingRemoveItem'+action.meta.arg.productId+action.meta.arg.name;
            console.log(state.status)
        });
        builder.addCase(removeBasketItemAsync.fulfilled,(state,action)=>{
            const {productId,quantity}=action.meta.arg;
            const itemIndex = state.cart?.cartItems.findIndex(
                x=>x.productId===productId
            );
            if(itemIndex=== -1|| itemIndex===undefined) return;
            state.cart!.cartItems[itemIndex].quantity -= quantity!;
            if(state.cart?.cartItems[itemIndex].quantity===0)
            state.cart.cartItems.splice(itemIndex,1);
            state.status='idle';
        });
        builder.addCase(removeBasketItemAsync.rejected,(state,action)=>{
            state.status='idle';
        });

        builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled,fetchCartAsync.fulfilled),(state,action)=>{
            state.cart=action.payload;
            state.status='idle';
        });
        builder.addMatcher(isAnyOf(addBasketItemAsync.rejected,fetchCartAsync.rejected),(state,action)=>{
            state.status='idle';
        });

    }
})

export const {setCart,removeCart} = cartSlice.actions;