import { IsOptional } from "class-validator";

export class CreateCartItemsDTO {
    @IsOptional()
    idUsers?: number;
    @IsOptional()
    idCart?: number;
  }