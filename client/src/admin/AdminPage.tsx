import React, { useState, useEffect } from "react";
import ModalShowProductUser from "../modal/ModalShowProductUser";
import instance from "../api/axios";

const AdminPage: React.FC = () => {
  const [isModalUser, setIsmodalUser] = useState<boolean>(false);
  const [orderCartItems, setOrderCartItems] = useState<any>([]);
  const [idUserItem, setIdUserItem] = useState<number>();

  const loadOrderCartItems = () => {
    instance
      .get(`/cart-items/`)
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

  const openModal = (id: number) => {
    setIdUserItem(id);
    setIsmodalUser(true);
  };
  const closeModal = () => {
    setIsmodalUser(false);
  };
  return (
    <div>
      <div className="px-10">
        <div className="flex justify-between items-center">
          <h1 className="uppercase text-2xl py-10">Quản lý đơn hàng </h1>
          <div className="w-1/3">
            <form>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <i className="fa-solid fa-magnifying-glass w-4 h-4 text-gray-500 dark:text-gray-400"></i>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full outline-none p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tìm kiếm"
                />
                <button
                  type="submit"
                  className="text-white absolute end-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <i className="fa-solid fa-magnifying-glass w-4 h-4 text-white dark:text-gray-400"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Số điện thoại
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Chi tiết đặt hàng
                </th>
                <th scope="col" className="px-6 py-3">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {orderCartItems.length > 0 &&
                orderCartItems.map((e: any, i: number) => (
                  <tr
                    key={i}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {i + 1}
                    </th>
                    <td className="px-6 py-2">{e.idUsers.userName}</td>
                    <td className="px-6 py-2">0{e.idUsers.phone}</td>
                    <td className="px-6 py-2">{e.idUsers.email}</td>
                    <td className="px-6 py-2">
                      <button
                        onClick={() => openModal(e.idUsers.idUsers)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Show
                      </button>
                    </td>
                    <td className="px-6 py-2">
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
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="relative">
        <ModalShowProductUser
          idUserItem={idUserItem}
          closeModal={closeModal}
          isModalUser={isModalUser}
        />
      </div>
    </div>
  );
};

export default AdminPage;
