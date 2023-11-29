import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavTop from "../components/NavTop";
import Navbar from "../components/Navbar";
import AccountLeft from "../components/AccountLeft";
import { ListUsers } from "../entity/user.entity";
import instance from "../api/axios";

const Account = () => {
  const idUser = localStorage.getItem("idUsers");

  const [isDropdownName, setIsDropdownName] = useState(false);
  const [isDropdownAddress, setIsDropdownAddress] = useState(false);

  const [users, setUsers] = useState<any>([]);

  const isBlockName = () => setIsDropdownName(true);
  const isNoneName = () => setIsDropdownName(true);
  const isBlockAddress = () => setIsDropdownAddress(true);
  const isNoneAddress = () => setIsDropdownAddress(true);

  const loadUsers = () => {
    instance
      .get(`/users/${idUser}`)
      .then((res) => {
        setUsers(res.data)
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadUsers();
  }, []);
  return (
    <>
      <NavTop />
      <Navbar />

      <div className="apx py-4 bg-gray-50 font-thin ">
        <div className="font-bold text-2xl flex justify-center gap-2">
          <span>Xin chào! </span><span>{users.userName}</span>
        </div>
        <div className="flex py-20">
          <div className="bg-slate-100 w-2/6 p-5">
            <AccountLeft />
          </div>
        
          <div className="bg-slate-200 w-4/6 p-5">
            <div className="flex justify-between items-center group relative cursor-pointer py-1">
              <div className="flex items-center gap-2">
                <p className="font-bold text-lg">Họ và tên:</p>
                <h1 className="">{users.userName}</h1>
              </div>

              {isDropdownName ? (
                <div className="absolute top-0 left-0 w-full">
                  <form className="flex items-center">
                    <input
                      type="text"
                      className="w-5/6 px-2 py-1 border outline-none rounded focus:border-green-400"
                      // placeholder="Nhập nội dung mới"
                    />
                    <button
                      type="submit"
                      className="ml-2 px-4 py-1 bg-blue-500 text-white rounded w-24 font-semibold"
                      onClick={isNoneName}
                    >
                      Đồng ý
                    </button>
                    <button
                      type="submit"
                      className="ml-2 px-4 py-1 bg-red-500 text-white rounded w-24 font-semibold"
                      onClick={isNoneName}
                    >
                      Hủy
                    </button>
                  </form>
                </div>
              ) : (
                <div onClick={isBlockName}>
                  <i className="fa-regular fa-pen-to-square h-7 w-7 py-2 cursor-pointer items-center justify-center hidden group-hover:block"></i>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center group relative cursor-pointer py-1">
              <div>
                {/* <div className="flex items-center gap-3 py-1">
                  <h1 className="font-bold text-lg">Địa chỉ:</h1>
                  <span>Đại yên chương mỹ</span>
                </div> */}
                <div className="flex items-center gap-3 py-1">
                  <h1 className="font-bold text-lg">Số điện thoại:</h1>
                  <span>0{users.phone}</span>
                </div>
              </div>

              {isDropdownAddress ? (
                <div className="absolute top-0 left-0 bg-white shadow-xl w-1/2 p-5">
                  <form className="">
                    <div className="flex flex-col">
                      <label>Số điện thoại:</label>
                      <input
                        type="text"
                        className="w-5/6 px-2 py-1 border outline-none rounded focus:border-blue-400"
                      />
                    </div>
                    {/* <div className="flex flex-col">
                      <label>Địa chỉ:</label>
                      <input
                        type="text"
                        className="w-5/6 px-2 py-1 border outline-none rounded focus:border-blue-400"
                      />
                    </div> */}
                    <div className="flex items-center py-2">
                      <button
                        type="submit"
                        className="ml-2 px-4 py-1 bg-blue-500 text-white rounded w-24 font-semibold"
                        onClick={isNoneAddress}
                      >
                        Đồng ý
                      </button>
                      <button
                        type="submit"
                        className="ml-2 px-4 py-1 bg-red-500 text-white rounded w-24 font-semibold"
                        onClick={isNoneAddress}
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div onClick={isBlockAddress}>
                  <i className="fa-regular fa-pen-to-square h-7 w-7 py-2 cursor-pointer items-center justify-center hidden group-hover:block"></i>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 py-1">
              <p className="font-bold text-lg">Tài khoản đăng nhập:</p>
              <h1 className="">{users.email}</h1>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Account;
