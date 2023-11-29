export const formatCurrency = (price: any) => {
    price = price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    return price;
  };
  