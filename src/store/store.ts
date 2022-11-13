import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { counterSlice } from '../pages/contact/counterSlice';
import { useSelector } from 'react-redux';
import { cartSlice } from '../components/cart/slice/cartSlice';


export const store=configureStore({
    reducer:{
        counter:counterSlice.reducer,
        cart:cartSlice.reducer
    }
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch=()=>useDispatch<AppDispatch>();
export const useAppSelector : TypedUseSelectorHook<RootState>=useSelector;