import React from "react";
import PageRight from "../components/PageRight";
import Footer from "../components/Footer";
import NavTop from "../components/NavTop";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const SearchResults: React.FC = () => {
  return (
    <>
      <NavTop />
      <Navbar />

      <div className="apx py-4 bg-gray-50 font-thin ">
        <span>
          Thời trang nam /{" "}
          <span className="cursor-pointer text-gray-600">Tìm kiếm</span>
        </span>
      </div>

      <div className="apx flex">
        <div className="w-4/6 mr-10">
          <div className="flex justify-center items-center text-xl my-5">
            Kết quả tìm kiếm "<span className="text-red-600">sản phẩm</span>"
            của bạn.
          </div>
          <div className="bg-zinc-300 h-px border- my-10"></div>

          <div className="flex flex-wrap gap-4">
            <div className="shadow-md w-64  py-3 relative group">
              <div className="hvbl w-64 h-80 relative ">
                <img
                  className="w-full h-full"
                  src="../../../images/ao_vest.jfif"
                  alt=""
                />
                <span className="absolute top-2 right-2 bg-zinc-700 text-white text-sm h-12 w-12 flex justify-center items-center rounded-full">
                  -70%
                </span>
                <div className="hvbl1 hidden absolute top-0 w-64 h-80">
                  <img
                    className="w-full h-full"
                    src="../../../images/veset.jfif"
                    alt=""
                  />
                </div>
              </div>

              <div className="w-full  my-1 flex justify-center">
                <div className="w-16">
                  <img
                    className="w-full h-full flex justify-center"
                    src="../../../images/ao_vest.jfif "
                    alt=""
                  />
                </div>
              </div>
              <div className="py-2 ">
                <div className="flex justify-center">
                  <span>Áo Vest NAZAFU Màu Xám Da Bò AV1138</span>
                </div>
                <div className="flex justify-center gap-3">
                  <span>
                    <i>
                      <s>100.000 đ</s>
                    </i>
                  </span>
                  <span className="text-red-700">30.000 đ</span>
                </div>
              </div>
              <div className="hidden group-hover:block absolute top-1/3 left-1/2 transform -translate-x-1/2 ">
                <i className="fa-solid fa-cart-shopping text-white w-14 h-14 bg-red-600 flex justify-center items-center rounded-full"></i>
              </div>
            </div>
            <div className="shadow-md w-64  py-3 relative group">
              <div className="hvbl w-64 h-80 relative ">
                <img
                  className="w-full h-full"
                  src="../../../images/ao_vest.jfif"
                  alt=""
                />
                <span className="absolute top-2 right-2 bg-zinc-700 text-white text-sm h-12 w-12 flex justify-center items-center rounded-full">
                  -70%
                </span>
                <div className="hvbl1 hidden absolute top-0 w-64 h-80">
                  <img
                    className="w-full h-full"
                    src="../../../images/veset.jfif"
                    alt=""
                  />
                </div>
              </div>

              <div className="w-full  my-1 flex justify-center">
                <div className="w-16">
                  <img
                    className="w-full h-full flex justify-center"
                    src="../../../images/ao_vest.jfif "
                    alt=""
                  />
                </div>
              </div>
              <div className="py-2 ">
                <div className="flex justify-center">
                  <span>Áo Vest NAZAFU Màu Xám Da Bò AV1138</span>
                </div>
                <div className="flex justify-center gap-3">
                  <span>
                    <i>
                      <s>100.000 đ</s>
                    </i>
                  </span>
                  <span className="text-red-700">30.000 đ</span>
                </div>
              </div>
              <div className="hidden group-hover:block absolute top-1/3 left-1/2 transform -translate-x-1/2 ">
                <i className="fa-solid fa-cart-shopping text-white w-14 h-14 bg-red-600 flex justify-center items-center rounded-full"></i>
              </div>
            </div>
            <div className="shadow-md w-64  py-3 relative group">
              <div className="hvbl w-64 h-80 relative ">
                <img
                  className="w-full h-full"
                  src="../../../images/ao_vest.jfif"
                  alt=""
                />
                <span className="absolute top-2 right-2 bg-zinc-700 text-white text-sm h-12 w-12 flex justify-center items-center rounded-full">
                  -70%
                </span>
                <div className="hvbl1 hidden absolute top-0 w-64 h-80">
                  <img
                    className="w-full h-full"
                    src="../../../images/veset.jfif"
                    alt=""
                  />
                </div>
              </div>

              <div className="w-full  my-1 flex justify-center">
                <div className="w-16">
                  <img
                    className="w-full h-full flex justify-center"
                    src="../../../images/ao_vest.jfif "
                    alt=""
                  />
                </div>
              </div>
              <div className="py-2 ">
                <div className="flex justify-center">
                  <span>Áo Vest NAZAFU Màu Xám Da Bò AV1138</span>
                </div>
                <div className="flex justify-center gap-3">
                  <span>
                    <i>
                      <s>100.000 đ</s>
                    </i>
                  </span>
                  <span className="text-red-700">30.000 đ</span>
                </div>
              </div>
              <div className="hidden group-hover:block absolute top-1/3 left-1/2 transform -translate-x-1/2 ">
                <i className="fa-solid fa-cart-shopping text-white w-14 h-14 bg-red-600 flex justify-center items-center rounded-full"></i>
              </div>
            </div>
            <div className="shadow-md w-64  py-3 relative group">
              <div className="hvbl w-64 h-80 relative ">
                <img
                  className="w-full h-full"
                  src="../../../images/ao_vest.jfif"
                  alt=""
                />
                <span className="absolute top-2 right-2 bg-zinc-700 text-white text-sm h-12 w-12 flex justify-center items-center rounded-full">
                  -70%
                </span>
                <div className="hvbl1 hidden absolute top-0 w-64 h-80">
                  <img
                    className="w-full h-full"
                    src="../../../images/veset.jfif"
                    alt=""
                  />
                </div>
              </div>

              <div className="w-full  my-1 flex justify-center">
                <div className="w-16">
                  <img
                    className="w-full h-full flex justify-center"
                    src="../../../images/ao_vest.jfif "
                    alt=""
                  />
                </div>
              </div>
              <div className="py-2 ">
                <div className="flex justify-center">
                  <span>Áo Vest NAZAFU Màu Xám Da Bò AV1138</span>
                </div>
                <div className="flex justify-center gap-3">
                  <span>
                    <i>
                      <s>100.000 đ</s>
                    </i>
                  </span>
                  <span className="text-red-700">30.000 đ</span>
                </div>
              </div>
              <div className="hidden group-hover:block absolute top-1/3 left-1/2 transform -translate-x-1/2 ">
                <i className="fa-solid fa-cart-shopping text-white w-14 h-14 bg-red-600 flex justify-center items-center rounded-full"></i>
              </div>
            </div>
          </div>
          <div className="bg-zinc-300 h-px border- my-10"></div>

          <div className="flex justify-between my-4">
            <div className="flex items-center text-white text-sm gap-2">
              <button className="bg-blue-600 px-4 rounded-md border-blue-600 py-1">
                <i className="fa-solid fa-thumbs-up pr-1"></i>
                <span>Thích</span>
              </button>
              <button className="bg-blue-600 px-4 rounded-md border-blue-600 py-1">
                <span>Chia Sẻ</span>
              </button>
            </div>
            <div>
              <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-base h-10">
                  <li>
                    <Link
                      to={"#"}
                      className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <i className="fa-solid fa-angles-left"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"#"}
                      className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-red-600 hover:text-white "
                    >
                      1
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"#"}
                      className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-red-600 hover:text-white "
                    >
                      2
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"#"}
                      className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-red-600 hover:text-white "
                    >
                      3
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"#"}
                      className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                      <i className="fa-solid fa-angles-right"></i>
                    </Link>
                  </li>
                </ul>
              </nav>
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

export default SearchResults;
