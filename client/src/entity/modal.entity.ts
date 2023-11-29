
import { Products } from "./product.entity";

export interface IsModalCart {
  isModalCart: boolean;
  openModal: () => void;
  closeModal: () => void;
  // cartUser: Carts[]
}

export interface IsShowModalUser {
  isModalUser: boolean;
  idUserItem: number | undefined;
  closeModal: () => void;
}

export interface IsModalUser {
  isModalUser: boolean;
  closeModal: () => void;
}

export interface IsModalSize {
  isModalSize: boolean;
  closeModal: () => void;
  selectedProductId: number | undefined;
  productId: Products[];
}

export interface ModalMedia {
  selectedMediaId: number | undefined;
  isModalMedia: boolean;
  closeModalMedia: () => void;
}

export interface ModalReviewProduct {
  isModalReviewProduct: boolean;
  listProduct: Products[];
  productId: Products[];
  selectedProductId: number | undefined;
  closeModal: () => void;
}
