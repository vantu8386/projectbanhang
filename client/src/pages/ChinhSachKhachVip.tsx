import React from "react";
import PageRight from "../components/PageRight";
import Footer from "../components/Footer";
import NavTop from "../components/NavTop";
import Navbar from "../components/Navbar";

const ChinhSachKhachVip: React.FC = () => {
  return (
    <>
      <NavTop />
      <Navbar />

      <div className="apx py-4 bg-gray-50 font-thin ">
        <span>
          Thời trang nam /{" "}
          <span className="cursor-pointer text-gray-600">
            Chính sách khách vip
          </span>
        </span>
      </div>

      <div className="apx flex">
        <div className="w-4/6 mr-10">
          <h1 className="text-3xl font-bold py-10">Chính sách khách vip</h1>
          <div className="flex flex-col items-center">
            <div className=" w-36 h-36 bg-white">
              <img className="w-full h-full" src="../../../images/logo_shop_x.png" alt="" />
            </div>
            <div className="w-11/12 h-max">
              <img className="w-full h-full" src="../../../images/chinh_sach.png" alt="" />
            </div>
          </div>
        </div>
        <div className="w-2/6 font-thin">
          <PageRight />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ChinhSachKhachVip;
