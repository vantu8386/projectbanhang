import { Products } from "./product.entity";

export type PostSize = {
    price?: number;
    quantity?: number;
    sizeName?: string;
    idProduct?: number
}

export type SizeProduct = {
    idSize?: number;
    price?: number;
    quantity?: number;
    sizeName?: string;
    
    
}