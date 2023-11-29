import React from "react";
import PageRight from "../components/PageRight";
import Footer from "../components/Footer";
import NavTop from "../components/NavTop";
import Navbar from "../components/Navbar";

const GioiThieu: React.FC = () => {
  return (
    <>
      <NavTop />
      <Navbar />

      <div className="apx py-4 bg-gray-50 font-thin ">
        <span>
          Thời trang nam /{" "}
          <span className="cursor-pointer text-gray-600">
            Giới thiệu SHOP X
          </span>
        </span>
      </div>

      <div className="apx flex">
        <div className="w-4/6 mr-10">
          <h1 className="text-3xl font-bold py-10">Giới thiệu SHOP X </h1>
          <div>
            <div >
              <span>
                Thương hiệu thời trang nam SHOP X được thành lập từ tháng 3 năm
                2010, là thương hiệu thời trang uy tín hàng đầu tại Việt Nam
                dành riêng cho phái mạnh.
              </span>
            </div>
            <div className="flex flex-col my-5">
              <b>SỨ MỆNH</b>
              <span>
                Không ngừng sáng tạo và tỉ mỉ từ công đoạn sản xuất đến các khâu
                dịch vụ, nhằm mang đến cho Quý Khách Hàng những trải nghiệm mua
                sắm đặc biệt nhất: sản phẩm chất lượng - dịch vụ hoàn hảo - xu
                hướng thời trang mới mẻ và tinh tế. Thông qua các sản phẩm thời
                trang, SHOP X luôn mong muốn truyền tải đến bạn những thông điệp
                tốt đẹp cùng với nguồn cảm hứng trẻ trung và tích cực.
              </span>
            </div>
            <div className="flex flex-col my-5">
              <b>TẦM NHÌN</b>
              <span>
                Với mục tiêu xây dựng và phát triển những giá trị bền vững,
                trong 10 năm tới, SHOP X sẽ trở thành thương hiệu dẫn đầu về
                thời trang phái mạnh trên thị trường Việt Nam.
              </span>
            </div>
            <div className="flex flex-col my-5">
              <b>THÔNG ĐIỆP SHOP X GỬI ĐẾN BẠN</b>
              <span>
                SHOP X muốn truyền cảm hứng tích cực đến các chàng trai: Việc
                mặc đẹp rất quan trọng, nó thể hiện được cá tính, sự tự tin và
                cả một phần lối sống, cách suy nghĩ của bản thân. Mặc thanh
                lịch, sống thanh lịch.
              </span>
            </div>
            <b className="my-4">
              Chọn 4MEN, bạn đang lựa chọn sự hoàn hảo cho điểm nhấn thời trang
              của chính mình!
            </b>
          </div>
          <div className="bg-zinc-300 h-px border- my-10 w-full"></div>
        </div>
        <div className="w-2/6 font-thin">
          <PageRight />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default GioiThieu;
