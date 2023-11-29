import { Products } from "./product.entity";
import { SizeProduct } from "./size.entity";
import { ListUsers } from "./user.entity";

export type Carts = {
  idUsers?: ListUsers[];
  idSize?: number;
  quantity?: number;
  size?: SizeProduct[];
  product: Products[];
  sizeName?: string;
};
