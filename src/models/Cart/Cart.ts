import { CartItem } from "./CartItem";

    export interface Cart {
        id: number;
        buyerId: string;
        cartItems: CartItem[];
    }
