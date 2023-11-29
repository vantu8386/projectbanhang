import React from "react";
import NavTop from "../components/NavTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageRight from "../components/PageRight";

const ChonSize: React.FC = () => {
  return (
    <>
      <NavTop />
      <Navbar />

      <div className="apx py-4 bg-gray-50 font-thin ">
        <span>
          Thời trang nam /{" "}
          <span className="cursor-pointer text-gray-600">
            Hướng dẫn chọn size
          </span>
        </span>
      </div>

      <div className="apx flex">
        <div className="w-4/6 mr-10">
          <h1 className="text-3xl font-bold py-10">Hướng dẫn chọn size</h1>
          <div>
            <p className="mb-8">
              Nếu bạn băn khoăn không biết chọn size nào cho phù hợp với cân
              nặng và chiều cao của mình, đừng lo lắng! Hãy xem bảng hướng dẫn
              chọn size bên dưới mà SHOP X tư vấn riêng dành cho bạn
            </p>
            <div>
              <div className="w-full h-96">
                <img
                  className="w-ful h-full"
                  src="../../../images/size_ao.png"
                  alt=""
                />
              </div>
              <div className="w-full h-96">
                <img
                  className="w-ful h-full"
                  src="../../../images/size_quan.png"
                  alt=""
                />
              </div>
              <div className="w-full h-96 flex justify-center">
                <img
                  className="w-ful h-full"
                  src="../../../images/size_giay.jpg"
                  alt=""
                />
              </div>
              <p className="py-2 pr-2">
                Bảng hướng dẫn chọn size trên là bảng hướng dẫn dựa trên kinh
                nghiệm nhiều năm của SHOP X theo khảo sát nhu cầu sở thích của
                khách hàng, tất nhiên sẽ không tuyệt đối, sẽ có những trường hợp
                ngoại lệ phụ thuộc theo vóc dáng, sở thích của từng người. Ví dụ
                có người thích mặc ôm, có người thích mặc rộng...
              </p>
              <p className="py-2 pr-2">
                Nếu bạn vẫn còn có những mắc thắc và băn khoăn cần được giải
                đáp? Hãy liên hệ ngay với Bộ phận Chăm sóc khách hàng của SHOP X
                qua Hotline 0365.12.12.97 để được hỗ trợ thêm.
              </p>
              <div className="bg-zinc-300 h-px border- my-2 mb-16"></div>
            </div>
          </div>
        </div>
        <div className="w-2/6 font-thin">
          <PageRight/>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ChonSize;
