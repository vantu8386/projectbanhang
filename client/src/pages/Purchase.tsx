import React, { useEffect, useState } from "react";
import AccountLeft from "../components/AccountLeft";
import Footer from "../components/Footer";
import NavTop from "../components/NavTop";
import Navbar from "../components/Navbar";
import instance from "../api/axios";
import { formatCurrency } from "../formatVND";

const Purchase: React.FC = () => {
  const user: any = localStorage.getItem("user");
  const idUsers = localStorage.getItem("idUsers");

  const [orderCartItems, setOrderCartItems] = useState<any>([]);

  const loadOrderCartItems = () => {
    instance
      .get(`/cart-items/${idUsers}`)
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
  }, []);
  return (
    <>
      <NavTop />
      <Navbar />

      <div className="apx py-4 bg-gray-50 font-thin ">
        <div className="font-bold text-2xl flex justify-center gap-2 items-center ">
          <span>Xin chào!</span>
          <span>{user}</span>
        </div>
        <div className="flex py-3">
          <div className="bg-slate-100 w-2/6 p-5 h-screen">
            <AccountLeft />
          </div>
          <div className="w-full mx-4 py-1 h-screen">
            {orderCartItems.length > 0 &&
              orderCartItems.map((e: any, i: number) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-2 py-1">
                    <div className="w-24 h-24">
                      <img
                        className="w-full h-full"
                        src={e.cart.size.product.productImage}
                        alt=""
                      />
                    </div>

                    <div className="flex  flex-col">
                      <span className="font-bold">{e.cart.size.product.productName}</span>

                      <div className=" flex  gap-2">
                        <span className="font-bold">Size:</span>
                        <span className="uppercase">
                          {e.cart.size.sizeName}
                        </span>
                      </div>
                      <div className=" flex  gap-2">
                        <span className="font-bold">Số lượng:</span>
                        <span>{e.cart.quantity}</span>
                      </div>
                      <div className=" flex  gap-3">
                        <span className="font-bold">Giá tiền:</span>
                        <span>{formatCurrency((1 - e.cart.size.product.salePrice)  * e.cart.size.price)}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    {e.status === "Chưa Xác Nhận" ? (
                      <>
                        <button
                          type="button"
                          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                          {e.status}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                          Lime
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Purchase;
