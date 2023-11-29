import { IsOptional } from "class-validator";


export class CreateProduct {
    idProduct?: number;
    @IsOptional()
    productName?: string;
    @IsOptional()
    salePrice?: number;
    @IsOptional()
    description?: string;
    @IsOptional()
    productImage?: string;
    @IsOptional()
    idCollections?: number;
}