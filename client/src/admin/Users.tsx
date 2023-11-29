import React, { useEffect, useState } from "react";
import ModalUser from "../modal/ModalUser";
import { ListUsers } from "../entity/user.entity";
import instance from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users: React.FC = () => {
  const [isModalUser, setIsmodalUser] = useState<boolean>(false);
  const [listUsers, setListUsers] = useState<ListUsers[]>([]);
  const [lockedUsers, setLockedUsers] = useState<number[]>([]);

  const openModal = () => {
    // console.log("id:", id)
    setIsmodalUser(true);
  };
  const closeModal = () => {
    setIsmodalUser(false);
  };

  const loadUsers = () => {
    instance
      .get("/users")
      .then((res) => {
        setListUsers(res.data);
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleOpen = (id: number) => {
    const open = {
      isBlocked: 0,
    };
    instance.patch(`/users/isBlocked/${id}`, open).then(() => {
      loadUsers();
      // toast.success("người dùng đã được mở khóa");
      setLockedUsers([...lockedUsers, id]);
    });
  };

  const handleBlock = (id: number) => {
    const block = {
      isBlocked: 1,
    };
    instance
      .patch(`/users/isBlocked/${id}`, block)
      .then(() => {
        loadUsers();
        // toast.success("Người dùng đã bị khóa.");
        setLockedUsers([...lockedUsers, id]);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="px-10">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable={false}
      />
      <div className="flex justify-between items-center">
        <h1 className="uppercase text-2xl py-10">Quản lý người dùng </h1>
        <p className="w-1/3">
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
        </p>
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
            {listUsers.map((e, i) => (
              <tr key={i} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  
                  scope="row"
                  className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </th>
                <td className="px-6 py-2">{e.userName}</td>
                <td className="px-6 py-2">{e.phone}</td>
                <td className="px-6 py-2">{e.email}</td>
                <td className="px-6 py-2">
                  <button
                    onClick={() => openModal()}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Show
                  </button>
                </td>
                <td className="px-6 py-2">
                  {e.isBlocked === 1 ? (
                    <button
                      onClick={() => handleOpen(Number(e.idUsers))}
                      type="button"
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      <i className="fa-solid fa-key"></i>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBlock(Number(e.idUsers))}
                      type="button"
                      className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      <i className="fa-solid fa-unlock-keyhole"></i>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="relative">
        <ModalUser
          // openModal={openModal}
          closeModal={closeModal}
          isModalUser={isModalUser}
        />
      </div>
    </div>
  );
};

export default Users;
