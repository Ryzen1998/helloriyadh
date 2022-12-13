import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch,useSelector } from 'react-redux';
import { counterSlice } from '../pages/contact/counterSlice';
import { cartSlice } from '../components/cart/slice/cartSlice';
import { catalogSlice } from '../components/catalog/slice/catalogSlice';
import { accountSlice } from '../components/account/slice/accountsSlice';

export const store=configureStore({
    reducer:{
        account:accountSlice.reducer,
        counter:counterSlice.reducer,
        cart:cartSlice.reducer,
        catalog:catalogSlice.reducer,
    }
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector : TypedUseSelectorHook<RootState>=useSelector;