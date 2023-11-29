import React, { useState } from "react";
import { IsModalSize } from "../entity/modal.entity";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PostSize, SizeProduct } from "../entity/size.entity";
import instance from "../api/axios";
import { formatCurrency } from "../formatVND";

const ModalSize: React.FC<IsModalSize> = ({
  selectedProductId,
  closeModal,
  isModalSize,
  productId,
}) => {
  // console.log("productId:", productId);
  const [postSize, setPostSize] = useState<PostSize>({
    sizeName: "",
    quantity: 1,
    price: 0,
    idProduct: selectedProductId,
  });

  const { sizeName, quantity, price } = postSize;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPostSize({ ...postSize, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sizeName) {
      return toast.warning("Các trường không được để trống");
    } else if (!price || price <= 0) {
      return toast.warning("Giá tền quá nhỏ");
    } else if (!quantity || quantity <= 0) {
      return toast.warning("Số lượng phải lớn hơn 0");
    }
    const formData = {
      sizeName,
      quantity,
      price,
      idProduct: selectedProductId,
    };
    instance
      .post("/sizes", formData)
      .then((res) => {
        console.log(res.data);
        
        toast.success("success");
        setTimeout(() => {
          closeModal();
        });
      })
      .catch((err) => {
        console.log(err.response.data.message)
        if (err.response.data.message) {
          return toast.warning(err.response.data.message)
        }
      });
    setPostSize({
      sizeName: "",
      quantity: 1,
      price: 0,
    });
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable={false}
      />
      <div
        className={`modal fixed w-full h-full top-0 left-0 flex justify-center z-50 text-black ${
          isModalSize ? "" : "hidden"
        }`}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
      >
        <div className="modal-container overflow-y-auto h-96 w-6/12 bg-white shadow-2xl mt-20">
          <div className="flex justify-between p-4 items-center">
            <h2 className="font-bold text-2xl uppercase">size</h2>
            <div
              className="closeCart w-6 h-6 flex justify-center items-center"
              onClick={closeModal}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>

          <div className="modal-content px-4">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-10 bg-slate-200"
            >
              <div className="w-28">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Thêm size
                </label>
                <select
                  name="sizeName"
                  value={sizeName}
                  onChange={handleChange}
                  id="countries"
                  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>--------</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="2XL">2XL</option>
                  <option value="3XL">3XL</option>
                  <option value="4XL">4XL</option>
                </select>
              </div>
              <div className="">
                <label
                  htmlFor="quantity-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Số lượng
                </label>
                <div className="relative flex items-center max-w-[8rem]">
                  <input
                    name="quantity"
                    value={quantity}
                    onChange={handleChange}
                    type="number"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={"999"}
                    required
                  />
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="quantity-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Giá tiền
                </label>
                <div className="relative flex items-center max-w-[8rem]">
                  <input
                    name="price"
                    value={price}
                    onChange={handleChange}
                    type="number"
                    className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={"VND"}
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="mt-9 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
          <div className="bg-zinc-300 h-px border- my-2 mt-5 "></div>
          <div className="px-4">
            {productId.length > 0 &&
              productId.map((e, x) => (
                <div key={x}>
                  {e.size.length > 0 ? (
                    e.size.map((s: SizeProduct, j: number) => (
                      <ul key={j}>
                        <li className="flex gap-8">
                          <div className="flex gap-2 w-12">
                            <span className="">Size:</span>
                            <span className="font-semibold uppercase">
                              {s.sizeName}{" "}
                            </span>
                          </div>
                          <div className="flex gap-2 w-28">
                            <span className="">Số lượng:</span>
                            <span className="font-semibold">{s.quantity}</span>
                          </div>
                          <div className="flex gap-2 ">
                            <span className="">Giá bán:</span>
                            {e.salePrice !== undefined &&
                            s.price !== undefined ? (
                              <span className="font-semibold">
                                {formatCurrency((1 - e.salePrice) * s.price)}
                              </span>
                            ) : (
                              <span className="text-red-500">
                                Lỗi: Giá không hợp lệ
                              </span>
                            )}
                            <span className="font-semibold">
                              {s.price !== undefined &&
                              e.salePrice !== undefined &&
                              e.salePrice > 0 ? (
                                <div className="flex gap-2">
                                  {" _ "}
                                  <span>Giá gốc:</span>
                                  <i className="line-through font-normal">
                                    {formatCurrency(s.price)}
                                  </i>
                                </div>
                              ) : (
                                <span className="text-red-500">
                                  Sản phẩm chưa áp dụng giảm giá
                                </span>
                              )}
                            </span>
                          </div>
                        </li>
                      </ul>
                    ))
                  ) : (
                    <>
                      <p className=" text-red-600 text-xl">Sản phẩm chưa thiết lập size</p>
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalSize;
