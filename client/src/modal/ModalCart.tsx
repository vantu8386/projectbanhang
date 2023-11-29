import React, { useState, useEffect } from "react";
// import Cart from "../components/Cart";
import { IsModalCart } from "../entity/modal.entity";
import instance from "../api/axios";
// import { Carts } from "../entity/cart.entity";
import { Link } from "react-router-dom";
import { formatCurrency } from "../formatVND";
import ModalDelete from "./ModalDelete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalCart: React.FC<IsModalCart> = ({ closeModal, isModalCart }) => {
  const idUsers = localStorage.getItem("idUsers");
  
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteIdCart, setDeleteIdCart] = useState<number | null>(null);
  const [cartUser, setCartUser] = useState<any>([]);
  // console.log("cartUser:", cartUser);

  const loadCartUser = () => {
    instance
      .get(`/cart/user/${idUsers}`)
      .then((res) => {
        setCartUser(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    loadCartUser();
  }, []);

  const handleQuantityChange = (index: number, newQuantity: number) => {
    const updatedCart = [...cartUser];
    updatedCart[index].quantity = newQuantity;
    setCartUser(updatedCart);
  };

  const handeleClickUp = (index: number): void => {
    handleQuantityChange(index, cartUser[index].quantity + 1);
  };
  const handeleClickDown = (index: number): void => {
    if (cartUser[index].quantity > 1) {
      handleQuantityChange(index, cartUser[index].quantity - 1);
    }
  };

  const calculateTotal = (): number => {
    return cartUser.reduce(
      (total: number, item: any) =>
        total +
        (1 - item.size.product.salePrice) * item.size.price * item.quantity,
      0
    );
  };

  const handleDelete = (idCart: number) => {
    setDeleteIdCart(idCart);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    instance
      .delete(`cart/${deleteIdCart}`)
      .then((res) => {
        toast.success("Successfully deleted");
        loadCartUser();
      })
      .catch((err) => console.log("err:", err));
    setIsDeleteModalVisible(false);
  };

  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  const handleUpdate = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (!Array.isArray(cartUser)) {
      console.error("Dữ liệu giỏ hàng không phải là một mảng");
      return;
    }
    const updatedCarts = cartUser.map((item: any) => ({
      idCart: item.idCart,
      quantity: item.quantity,
    }));

    try {
      await instance.patch("/cart", { carts: updatedCarts });
      // toast.success("Successfully updated");
      console.log("Updated ok");
      

      loadCartUser();
    } catch (error) {
      console.error("Error :", error);
    }
  };
  return (
    <div
      className={`modal fixed w-full h-full top-0 left-0 flex justify-end z-50 text-black ${
        isModalCart ? "" : "hidden"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable={false}
      />
      <div className="modal-container overflow-y-auto h-screen w-3/12 bg-white shadow-2xl">
        <div className="flex justify-between p-4 items-center">
          <h2 className="font-bold text-2xl">Giỏ hàng</h2>
          <div
            className="closeCart w-6 h-6 flex justify-center items-center"
            onClick={closeModal}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>

        <div className="modal-content">
          {cartUser.length > 0 &&
            cartUser.map((e: any, i: number) => (
              <div key={i}>
                {e.size && e.size && (
                  <div className="flex gap-3 p-2">
                    <div className="w-20 h-28">
                      <img
                        className="w-full h-full"
                        src={e.size.product.productImage}
                        alt=""
                      />
                    </div>
                    <div className=" w-full flex justify-between">
                      <div className="flex flex-col">
                        <strong className="uppercase">
                          {e.size.product.productName}
                        </strong>

                        <div className=" flex gap-7">
                          <span>Size:  <span className="uppercase font-semibold">{e.size.sizeName}</span></span>
                          <span>Số lượng: {e.quantity}</span>
                        </div>
                        <div className=" flex gap-7">
                          <span>
                            {formatCurrency(
                              (1 - e.size.product.salePrice) *
                                e.size.price *
                                e.quantity
                            )}
                          </span>
                          {e.size.product.salePrice > 0 ? (
                            <span>
                              Giá gốc:{" "}
                              <span className="line-through">
                                {formatCurrency(e.size.price)}
                              </span>
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="flex items-center py-2">
                          <button
                            onClick={() => handeleClickDown(Number(i))}
                            className="w-7 h-7 shadow-lg border flex items-center justify-center relative"
                          >
                            <i className="fa-solid fa-window-minimize absolute top-0"></i>
                          </button>
                          <span className="w-7 h-7 shadow-lg border flex items-center justify-center">
                            {e.quantity}
                          </span>
                          <button
                            onClick={() => handeleClickUp(Number(i))}
                            className="w-7 h-7 shadow-lg border"
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <ModalDelete
                            isVisible={isDeleteModalVisible}
                            onConfirm={confirmDelete}
                            onCancel={cancelDelete}
                          />
                        </div>
                      </div>
                      <div
                        onClick={() => handleDelete(Number(e.idCart))}
                        className="ml-4 text-red-600 hover:text-red-500 cursor-pointer"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-zinc-300 h-px border- my-5 "></div>
              </div>
            ))}

          <div className="flex justify-between mx-2 my-4">
            <span>Tổng cộng: </span>
            <span>{formatCurrency(calculateTotal())}</span>
          </div>
          <div onClick={handleUpdate} className="ml-5">
            <Link
              // to={"/#"}
              to={"/check-out"}
            >
              <button className="modal-close bg-orange-600 hover:bg-orange-500 text-white text-xl font-semibold py-3 px-8 rounded-md">
                Thanh toán
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCart;
