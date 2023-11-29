export type Products = {
  idProduct?: number | undefined;
  productName?: string;
  salePrice?: number | undefined;
  description?: string;
  productImage?: string;
  idCollections?: number;
  size: any;
  media: any;
  idSize?: number;
  price?: number;
  quantity?: number;    
  sizeName?: string;
};

export type UploadProducts = {
    idProduct?: number;
    productName?: string;
    salePrice?: number | undefined;
    description?: string;
    productImage?: string;
    idCollections?: number;

  };
  