import { User } from "../../../models/user/User";
import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { FieldValues } from 'react-hook-form';
import agent from '../../../Api/agent';
import { toast } from 'react-toastify';
import { setCart } from "../../cart/slice/cartSlice";

interface AccountState{
    user:User|null;
}

const initialState:AccountState={
    user:null
}

export const signInUser=createAsyncThunk<User,FieldValues>(
    'account/signInUser',
    async(data,thubkApi)=>{
         try {
            const userData = await agent.Account.login(data);
            const {cart,...user}=userData;
            console.log('a',cart)
            if(cart){
                thubkApi.dispatch(setCart(cart));
            }
            localStorage.setItem('user',JSON.stringify(user))
            return user;
         } catch (error:any) {
            return thubkApi.rejectWithValue(error.data);
         }
    }
)

export const fetchCurrentUser=createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async(_,thubkApi)=>{
        thubkApi.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))
         try {
            const userData = await agent.Account.currentUser();
            const {cart,...user}=userData;
            console.log('a',cart)
            if(cart){
                thubkApi.dispatch(setCart(cart));
            }
            localStorage.setItem('user',JSON.stringify(user))
            return user;
         } catch (error:any) {

            return thubkApi.rejectWithValue(error.data);
         }
    },
    {
        condition:()=>{

            if(!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice=createSlice({
    name:'account',
    initialState,
    reducers:{
        signout:(state)=>{
            state.user=null;
            localStorage.removeItem('user');
        },
        setUser:(state,action)=>{
            state.user = action.payload;
        }
    },
    extraReducers:(builder=>{
        builder.addCase(fetchCurrentUser.rejected,(state)=>{
            state.user=null;
            localStorage.removeItem('user');
            toast('session expired')
        });
        builder.addMatcher(isAnyOf(signInUser.fulfilled,fetchCurrentUser.fulfilled),(state,action)=>{
            state.user=action.payload;
        });
        builder.addMatcher(isAnyOf(signInUser.rejected,fetchCurrentUser.rejected),(state,action)=>{
            console.log(action.payload);
        });
        
    })
})

export const {signout,setUser}=accountSlice.actions;
