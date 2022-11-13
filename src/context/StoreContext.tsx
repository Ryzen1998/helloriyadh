/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, PropsWithChildren, useContext,useState } from "react";
import { Cart } from "../models/Cart/Cart";

interface IStoreContext{
    cart:Cart|null;
    setCart:(cart:Cart)=>void;
    removeItem:(productId:number,quantity:number)=>void;
}

export const StoreContext=createContext<IStoreContext|undefined>(undefined);

export const useStoreContext=()=>{
    const context = useContext(StoreContext);

    if(context===undefined){
        throw Error("oops no context");
    }

    return context;
}

export function storeProvider({children}:PropsWithChildren<any>){

    const [cart,setCart]=useState<Cart|null>(null);

    const removeItem=(productId:number,quantity:number)=>{

        if(!cart) return;
        const items =[...cart.cartItems];
        const itemIndex = items.findIndex(i=>i.productId===productId);

        if(itemIndex>=0){
            items[itemIndex].quantity-=quantity;
            if(items[itemIndex].quantity===0){
                items.splice(itemIndex,1);

            } 
            setCart(prevState=>{
                return {...prevState!,items}
            })

            
        }

    }

    return (
        <StoreContext.Provider value={{cart,setCart,removeItem}}>
        {children}
        </StoreContext.Provider>
     
    );
}

export default StoreContext;