import React, { useEffect, useState } from "react";
import { IsShowModalUser } from "../entity/modal.entity";
import instance from "../api/axios";
import { formatCurrency } from "../formatVND";

const ModalShowProductUser: React.FC<IsShowModalUser> = ({
  idUserItem,
  closeModal,
  isModalUser,
}) => {

  const [orderCartItems, setOrderCartItems] = useState<any>([]);

  const loadOrderCartItems = async () => {
   await instance
      .get(`/cart-items/${idUserItem}`)
      .then((res) => {
        // console.log(res.data);
        setOrderCartItems(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    loadOrderCartItems();
  }, [idUserItem]);
  return (
    <div
      className={`modal fixed w-full h-full top-0 left-0 flex justify-end z-50 text-black ${
        isModalUser ? "" : "hidden"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className="modal-container overflow-y-auto h-screen w-5/12 bg-white shadow-2xl">
        <div className="flex justify-between p-4 items-center">
          <h2 className="font-bold text-2xl">Các đơn hàng</h2>
          <div
            className="closeCart w-6 h-6 flex justify-center items-center"
            onClick={closeModal}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>

        <div className="w-full mx-4 py-1 h-screen">
          {orderCartItems.length > 0 &&
            orderCartItems.map((e: any, i: number) => (
              <div key={i} className="flex items-center gap-2 py-1">
                <div className="w-24 h-24">
                  <img
                    className="w-full h-full"
                    src={e.cart.size.product.productImage}
                    alt=""
                  />
                </div>

                <div className="flex  flex-col">
                  <span className="font-bold">
                    {e.cart.size.product.productName}
                  </span>

                  <div className=" flex  gap-2">
                    <span className="font-bold">Size:</span>
                    <span className="uppercase">{e.cart.size.sizeName}</span>
                  </div>
                  <div className=" flex  gap-2">
                    <span className="font-bold">Số lượng:</span>
                    <span>{e.cart.quantity}</span>
                  </div>
                  <div className=" flex  gap-3">
                    <span className="font-bold">Giá tiền:</span>
                    <span>
                      {formatCurrency(
                        (1 - e.cart.size.product.salePrice) * e.cart.size.price
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="bg-zinc-300 h-px border- my-5 "></div>
      </div>
    </div>
  );
};

export default ModalShowProductUser;
