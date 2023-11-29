import React, { useState, useEffect } from "react";
import NavTop from "../components/NavTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChinhSach from "../components/ChinhSach";
import { Products } from "../entity/product.entity";
import instance from "../api/axios";
import { SizeProduct } from "../entity/size.entity";
import { Media } from "../entity/media.entity";
import { formatCurrency } from "../formatVND";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const [listProduct, setListProduct] = useState<Products[]>([]);
  const navigate = useNavigate();

  const loadListProduct = () => {
    instance
      .get("/products")
      .then((res) => {
        // console.log(res.data);

        const limitedProducts = res.data.slice(0, 8);

        setListProduct(limitedProducts);
      })
      .catch((err) => console.log(err));
  };

  const handleIdProduct = (
    id: number | undefined | React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    navigate(`/product/review/${id}`);
  };

  useEffect(() => {
    loadListProduct();
  }, []);

  // console.log({ listProduct });

  return (
    <>
      <NavTop />
      <Navbar />

      <div>
        {/* THỜI TRANG HÓT NHẤT */}
        <div className="apx">
          <div>
            <h2 className="font-black text-3xl py-5">THỜI TRANG HÓT NHẤT</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {listProduct.length > 0 &&
              listProduct.map((e, i) => (
                <div
                  onClick={() => handleIdProduct(e.idProduct)}
                  key={i}
                  className="shadow-md w300 h550 overflow-hidden py-3 relative group"
                >
                  <div className="hvbl w300 h400 relative ">
                    <img
                      className="w-full h-full"
                      src={e.productImage}
                      alt=""
                    />
                    {e.salePrice !== undefined && e.salePrice > 0 ? (
                      <span className="absolute top-2 right-2 bg-zinc-700 text-white text-sm h-12 w-12 flex justify-center items-center rounded-full">
                        {e.salePrice * 100}%
                      </span>
                    ) : (
                      ""
                    )}
                    <div className="hvbl1 hidden absolute top-0 w300 h400">
                      {e.media.length > 0 && (
                        <img
                          className="w-full h-full"
                          src={e.media[0].urlImage}
                          alt=""
                        />
                      )}
                    </div>
                  </div>

                  <div className="w-full  my-1 flex justify-center">
                    <div className="w-16">
                      <img
                        className="w-full h-full flex justify-center"
                        src={e.productImage}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="py-2 ">
                    <div className="flex justify-center relative">
                      <span
                        title={e.productName}
                        className="title_content cursor-pointer uppercase w-32 overflow-hidden whitespace-nowrap overflow-ellipsis"
                      >
                        {e.productName}
                      </span>
                    </div>
                    {e.size.length > 0 && (
                      <div className="flex justify-center gap-3">
                        <span className="font-semibold">
                          {e.salePrice !== undefined && e.salePrice > 0 ? (
                            <div className="flex gap-2">
                              <i className="line-through font-normal">
                                {formatCurrency(e.size[0].price)}
                              </i>
                            </div>
                          ) : (
                           ""
                          )}
                        </span>
                        {e.salePrice !== undefined && (
                          <span className="font-semibold">
                            {formatCurrency(
                              (1 - e.salePrice) * e.size[0].price
                            )}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="hidden group-hover:block absolute top-1/3 left-1/2 transform -translate-x-1/2 ">
                    <i className="fa-solid fa-cart-shopping text-white w-14 h-14 bg-red-600 flex justify-center items-center rounded-full"></i>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="apx flex justify-center gap-8 h-96 py-10">
          <div className="w-1/4 overflow-hidden">
            <img
              className="w-full h-full cursor-pointer transform hover:scale-110"
              src="../../../images/slide1.jpg"
              alt=""
            />
          </div>
          <div className="w-2/4 overflow-hidden">
            <img
              className="w-full h-full cursor-pointer transform hover:scale-110"
              src="../../../images/slide2.jpg"
              alt=""
            />
          </div>
          <div className="w-1/4 overflow-hidden">
            <img
              className="w-full h-full cursor-pointer transform hover:scale-110"
              src="../../../images/slide3.jpg"
              alt=""
            />
          </div>
        </div>

        {/* THỜI TRANG MỚI NHẤT */}
        {/* <div className="apx">
          <div>
            <h2 className="font-black text-3xl py-5">THỜI TRANG MỚI NHẤT</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="shadow-md w300 h550 py-3 relative group">
              <div className="hvbl w300 h400 relative ">
                <img
                  className="w-full h-full"
                  src="../../../images/ao_vest.jfif"
                  alt=""
                />
                <span className="absolute top-2 right-2 bg-zinc-700 text-white text-sm h-12 w-12 flex justify-center items-center rounded-full">
                  -70%
                </span>
                <div className="hvbl1 hidden absolute top-0 w300 h400">
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
        </div> */}

        {/* hr */}
        <div className="bg-zinc-300 h-px border- my-10 mx-5"></div>

        {/* THỜI TRANG BÁN CHẠY */}
        {/* <div className="apx">
          <div>
            <h2 className="font-black text-3xl py-5">THỜI TRANG BÁN CHẠY</h2>
          </div>
          <div className="flex gap-4 relative hvbl2">
            <div className="shadow-md w300 h550 py-3 relative group">
              <div className="hvbl w300 h400 relative ">
                <img
                  className="w-full h-full"
                  src="../../../images/ao_vest.jfif"
                  alt=""
                />
                <span className="absolute top-2 right-2 bg-zinc-700 text-white text-sm h-12 w-12 flex justify-center items-center rounded-full">
                  -70%
                </span>
                <div className="hvbl1 hidden absolute top-0 w300 h400">
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
                <i className="fa-solid fa-cart-shopping text-white w-14 h-14 bg-red-600 flex justify-center items-center rounded-full cursor-pointer"></i>
              </div>
            </div>

            <div className="hidden hvbl3 ">
              <div className="text-8xl cursor-pointer hover:text-zinc-400 absolute left-0  top-1/3">
                {"<"}
              </div>
              <div className="text-8xl cursor-pointer hover:text-zinc-400 absolute right-0  top-1/3">
                {">"}
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <ChinhSach />

      <Footer />
    </>
  );
};

export default HomePage;
