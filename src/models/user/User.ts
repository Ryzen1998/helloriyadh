import { Cart } from "../Cart/Cart"

export interface User{
    email:string,
    token:string
    cart?:Cart
}