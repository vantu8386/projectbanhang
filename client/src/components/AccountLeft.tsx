import React from "react";
import { Link } from "react-router-dom";

const AccountLeft = () => {
  const user = localStorage.getItem("user");
  return (
    <div className="">
      <p className=" my-2 px-4 font-bold">THÔNG TIN TÀI KHOẢN</p>
      <p className="my-1 px-4 cursor-pointer font-medium">{user}</p>
      <p className="my-1 px-4 cursor-pointer">
        <Link to={"/account"}>Tài khoản của tôi</Link>
      </p>
      <p className="my-1 px-4 cursor-pointer">
        <Link to={"/purchase"}>Sản phẩm đã đặt</Link>
      </p>
      <p className="my-1 px-4 cursor-pointer">Đăng xuất</p>
    </div>
  );
};

export default AccountLeft;
