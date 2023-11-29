import React from "react";

const Footer: React.FC = () => {
  return (
    <>
      <div className="">
        <div className="apx py-20 flex justify-between bg-zinc-900">
          <div className="font-sans">
            <div className="relative">
              <img
                className="w-20 text-white white-filter"
                src="../../../images/logo_shop_xx.png"
                alt=""
              />
              <span className="text-white absolute bottom-0 transform left-2 font-serif font-semibold">
                SHOP X
              </span>
            </div>
            <div>
              <p className="text-zinc-400 hover:text-red-700 py-1 cursor-pointer">
                <i className="fa-solid fa-angles-right text-xs text-zinc-700"></i>{" "}
                Giới thiệu
              </p>
              <p className="text-zinc-400 hover:text-red-700 py-1 cursor-pointer">
                <i className="fa-solid fa-angles-right text-xs text-zinc-700"></i>{" "}
                Liên hệ
              </p>
              <p className="text-zinc-400 hover:text-red-700 py-1 cursor-pointer">
                <i className="fa-solid fa-angles-right text-xs text-zinc-700"></i>{" "}
                Tuyển dụng
              </p>
              <p className="text-zinc-400 hover:text-red-700 py-1 cursor-pointer">
                <i className="fa-solid fa-angles-right text-xs text-zinc-700"></i>{" "}
                Tin tức
              </p>
              <p className="flex items-center gap-1 text-zinc-400 hover:text-red-700 py-1 cursor-pointer">
                <i className="fa-regular fa-envelope text-zinc-400"></i>
                <span>Email: Nguyenvantu@gmail.com</span>
              </p>
              <p className="text-zinc-400  py-1 mt-5">
                Đăng kí email nhận khuyến mãi
              </p>
              <p className="flex">
                <input
                  className="bg-neutral-600 outline-none pl-4 py-1 rounded-s"
                  type="text"
                  placeholder="Email của bạn"
                />
                <button className="text-white bg-red-700 hover:bg-red-800 py-1 px-3 rounded-e font-semibold">
                  Đăng kí
                </button>
              </p>
            </div>
          </div>
          <div className="font-sans">
            <h3 className="text-white font-semibold pb-2">HỖ TRỢ KHÁCH HÀNG</h3>
            <div>
              <p className="text-zinc-400 hover:text-red-700 py-1 cursor-pointer">
                <i className="fa-solid fa-angles-right text-xs text-zinc-700"></i>{" "}
                Hướng dẫn đặt hàng
              </p>
              <p className="text-zinc-400 hover:text-red-700 py-1 cursor-pointer">
                <i className="fa-solid fa-angles-right text-xs text-zinc-700"></i>{" "}
                Hướng dẫn chọn size
              </p>
              <p className="text-zinc-400 hover:text-red-700 py-1 cursor-pointer">
                <i className="fa-solid fa-angles-right text-xs text-zinc-700"></i>{" "}
                Câu hỏi thường gặp
              </p>
              <p className="text-zinc-400 hover:text-red-700 py-1 cursor-pointer">
                <i className="fa-solid fa-angles-right text-xs text-zinc-700"></i>{" "}
                Chính sách khách VIP
              </p>
              <p className="text-zinc-400 hover:text-red-700 py-1 cursor-pointer">
                <i className="fa-solid fa-angles-right text-xs text-zinc-700"></i>{" "}
                Thanh toán - Giao hàng
              </p>
              <p className="text-zinc-400 hover:text-red-700 py-1 cursor-pointer">
                <i className="fa-solid fa-angles-right text-xs text-zinc-700"></i>{" "}
                Chính sách đổi hàng Hướng dẫn đặt hàng
              </p>
              <p className="text-zinc-400 hover:text-red-700 py-1 cursor-pointer">
                <i className="fa-solid fa-angles-right text-xs text-zinc-700"></i>{" "}
                Chính sách bảo mật
              </p>
              <p className="text-zinc-400 hover:text-red-700 py-1 cursor-pointer">
                <i className="fa-solid fa-angles-right text-xs text-zinc-700"></i>{" "}
                Chính sách cookie
              </p>
            </div>
          </div>
          <div className="font-sans">
            <h3 className="text-white font-semibold pb-2">HỆ THỐNG CỬA HÀNG</h3>
            <div className="w-60 h-48">
              <iframe
                className="google-iframe"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.35721207169!2d105.78325654644679!3d21.02118501269837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x315b74b9f162b555%3A0xc0d36ae06007f544!2zU8OibmcgxJDGsG5nIEzhuqFpIEzhu6NpIFbEg24gTeG7m2kgTXkgxJDpdeG6rW4gTVMgQGjDoCBOaMO0aSBN4budaA!5e0!3m2!1svi!2s!4v1603125402556!5m2!1svi!2s
                "
                style={{ border: 0, width: "100%" }}
                allowFullScreen
                aria-hidden="false"
              />
            </div>

            <div>
              <p className="text-zinc-400 hover:text-red-700 py-1 cursor-pointer">
                <i className="fa-solid fa-angles-right text-xs text-zinc-700"></i>{" "}
                Hướng dẫn đặt hàng
              </p>
            </div>
          </div>
          <div className="font-sans">
            <h3 className="text-white font-semibold pb-2">
              KẾT NỐI VỚI SHOP X
            </h3>

            <div className="flex gap-3 text-white">
              <img
                className="w-7 h-7 bg-white rounded-md cursor-pointer"
                src="../../../images/Facebook_Logo_(2019).png"
                alt=""
              />
              <img
                className="w-7 h-7 bg-white rounded-md cursor-pointer"
                src="../../../images/instagram.png"
                alt=""
              />
              <img
                className="w-7 h-7 bg-white rounded-md cursor-pointer"
                src="../../../images/logo-youtube.jpg"
                alt=""
              />
              <button className="bg-blue-600 px-3 rounded-md">
                <i className="fa-solid fa-thumbs-up"></i>
                <span>Thích</span>
              </button>
              <button className="bg-blue-600 px-3 rounded-md">
                <span>Chia Sẻ</span>
              </button>
            </div>
          </div>
        </div>

        <div className="apx py-20 flex  bg-black">
          <div className="text-zinc-400 font-sans w-5/6">
            <div>
              <span>
                Copyright 2023 · Thiết kế và phát triển bởi{" "}
                <span className="text-white font-bold">SHOP X</span> All rights
                reserved
              </span>
            </div>
            <div className="bg-zinc-600 h-px border- mb-3"></div>
            <div>
              <div>Chủ quản: ông Nguyễn Văn Tú.</div>
              <div>MST cá nhân: 0365.12.12.97</div>
              <div>
                Số ĐKKD: 41G8031109 do UBND CM - Tp.HN cấp ngày 12/12/2012
              </div>
              <div className="bg-zinc-600 h-px border- mb-3"></div>
              <div className="text-red-500 font-semibold">
                Nhãn hiệu "SHOP X" đã được đăng kí độc quyền tại Cục sở hữu trí
                tuệ Việt Nam
              </div>
            </div>
          </div>
          {/* <div className="text-white w-1/6">s</div>  */}
        </div>
      </div>
    </>
  );
};

export default Footer;
