import { Product } from "../product/Product";

    export interface CartItem {
        id: number;
        quantity: number;
        productId: number;
        product: Product;
        cartId: number;
    }