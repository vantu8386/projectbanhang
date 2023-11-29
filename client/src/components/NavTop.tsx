import React from "react";
import { Link } from "react-router-dom";

const NavTop: React.FC = () => {
  return (
    <>
      <div className="apx flex justify-between py-3 text-sm bg-zinc-800 text-gray-300">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-phone"></i>
          <span>Hotline:</span>
          <span className="cursor-pointer">0365.12.12.97</span>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <Link to={"/chon-size"}>
              <span className="cursor-pointer hover:text-red-500">
                Cách chọn Size
              </span>
            </Link>
          </div>
          <div className="border-x px-3 shadow-sm">
            <Link to={"/chinh-sach"}>
              <span className="cursor-pointer hover:text-red-500">
                Chính sách khách vip
              </span>
            </Link>
          </div>
          <div>
            <Link to={"/gioi-thieu"}>
              <span className="cursor-pointer hover:text-red-500">
                Giới thiệu
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavTop;
