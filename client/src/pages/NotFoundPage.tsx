import React from "react";
import Footer from "../components/Footer";
import NavTop from "../components/NavTop";
import Navbar from "../components/Navbar";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <NavTop />
      <Navbar />
      <div className="flex flex-col items-center py-10">
        <h1 className="text-3xl font-bold py-10">Lỗi truy cập 404!</h1>
        <div className="">
          <img className="w-full h-full" src="../../../images/404.jpg" alt="" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
