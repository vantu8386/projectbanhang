import React, { useState, useEffect } from "react";
import MyGallery from "../components/MyGallery ";
import NavTop from "../components/NavTop";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import { Products } from "../entity/product.entity";
import instance from "../api/axios";
import { SizeProduct } from "../entity/size.entity";
import { formatCurrency } from "../formatVND";
import { Media } from "../entity/media.entity";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product: React.FC = () => {
  const idUsers = localStorage.getItem("idUsers");

  const [productId, setProductId] = useState<Products[]>([]);
  const [sizeIn, setSizeIn] = useState<number>();
  // console.log("sizeIn:", sizeIn);
  const [quantity, setQuantity] = useState<number>(1);
  let { product } = useParams();
  // console.log("product:", product);

  const loadProduct = () => {
    instance
      .get(`products/${product}`)
      .then((res) => {
        console.log(res.data);

        setProductId(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const handeleClickUp = () => {
    setQuantity(quantity + 1);
  };
  const handeleClickDown = () => {
    if (quantity > 0) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };
  const handleClickCart = () => {
    if (!idUsers) {
      return toast.warning("Đăng nhập để mua hàng");
    }
    if (!sizeIn) {
      return toast.warning("Chọn 1 size bất kì");
    }
    const cartItems = {
      idUsers,
      idSize: sizeIn,
      quantity,
    };

    instance
      .post("/cart", cartItems)
      .then((res) => {
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable={false}
      />
      <NavTop />
      <Navbar />

      <div className="apx py-4 bg-gray-50 font-thin ">
        <span>
          Thời trang nam /{" "}
          <span className="cursor-pointer text-gray-600">
            Áo Sơ Mi Nam / Áo Sơ Mi Sọc Tay Dài Thêu 4MEN Form Regular SM141 Sọc
            Đen
          </span>
        </span>
      </div>

      <div className="apx flex">
        <div className="w-3/6 mr-10">
          <h1 className="text-3xl font-bold py-10">Giới thiệu SHOP X </h1>
          <div>
            {productId.length > 0 &&
              productId.map(
                (e, i) =>
                  e.media.length > 0 && (
                    <div className="shadow" key={i}>
                      <MyGallery
                        urlImage={e.media[0].urlImage}
                        listImage={e.media}
                      />
                      {/* {console.log("lll", e.media[0].urlImage)} */}
                    </div>
                  )
              )}
          </div>
        </div>
        {productId.length > 0 &&
          productId.map((e, i) => (
            <div key={i} className="w-3/6">
              <h1 className="font-bold text-xl uppercase">{e.productName}</h1>
              <div className="bg-zinc-300 h-px border- my-5 w-full"></div>
              {e.size.length > 0 && (
                <div>
                  <div className="flex items-center gap-2">
                    {e.size[0].price == 0 ? (
                      <>{""}</>
                    ) : (
                      <>
                        {sizeIn ? (
                          <>
                            {(e.salePrice !== undefined || e.salePrice === 0) &&
                              e.size.find(
                                (i: SizeProduct) => i.idSize == sizeIn
                              ) && (
                                <>
                                  <span className="font-bold text-lg">
                                    {formatCurrency(
                                      (1 - e.salePrice) *
                                        e.size.find(
                                          (i: SizeProduct) => i.idSize == sizeIn
                                        )?.price
                                    )}
                                  </span>
                                  <i className="line-through">
                                    {e.salePrice > 0 ? (
                                      <span>
                                        {formatCurrency(
                                          e.size.find(
                                            (i: SizeProduct) =>
                                              i.idSize == sizeIn
                                          )?.price
                                        )}
                                      </span>
                                    ) : (
                                      <></>
                                    )}
                                  </i>
                                </>
                              )}
                          </>
                        ) : (
                          <span className="font-bold text-lg">
                            {formatCurrency(
                              (1 - Number(e.salePrice)) * e.size[0].price
                            )}
                          </span>
                        )}
                      </>
                    )}
                  </div>
                  <div className="bg-zinc-300 h-px border- my-2 w-full"></div>
                  <div className="">
                    <p className="my-2">
                      SIZE:
                      <Link to={"/chon-size"}>
                        <i className="text-red-600"> Hướng dẫn chọn size</i>
                      </Link>
                    </p>

                    <div className="flex items-center gap-2">
                      {e.size.map((u: SizeProduct) => (
                        <button
                          className={`w-10 h-10 shadow-lg border ${
                            Number(u.idSize) === sizeIn
                              ? "bg-black text-white"
                              : ""
                          }`}
                          key={u.idSize}
                          onClick={() => setSizeIn(Number(u.idSize))}
                        >
                          {u.sizeName}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-zinc-300 h-px border- my-2 w-full"></div>

              <div className="">
                <p className="my-2">SỐ LƯỢNG:</p>
                <div className="flex items-center">
                  <button
                    onClick={handeleClickDown}
                    className="w-10 h-10 shadow-lg border "
                  >
                    <i className="fa-solid fa-window-minimize mb-3"></i>
                  </button>
                  <span className="w-10 h-10 shadow-lg border flex items-center justify-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handeleClickUp}
                    className="w-10 h-10 shadow-lg border"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="bg-zinc-300 h-px border- my-2 w-full"></div>
              <div
                onClick={handleClickCart}
                className="flex items-center justify-center w-full bg-red-500 py-2 hover:bg-red-600 rounded-lg"
              >
                <button className="text-white font-semibold">
                  Thêm Vào Giỏ
                </button>
              </div>
              <div>
                <div className="my-4">
                  <p className="font-semibold">Mô tả</p>
                  <p className="font-semibold">
                    MĂNG TÔ KAKI VELVET JACKET MT182 KIỂU DÁNG:
                  </p>
                  <span> Regular fit</span>{" "}
                  <p>Áo dáng ôm vừa vặn người, thoải mái, tôn dáng khi mặc.</p>{" "}
                  <p className="font-semibold mt-2">CHẤT LIỆU:</p>{" "}
                  <span>Kaki nhung. Lót lông cừu.</span>{" "}
                  <p>
                    Áo sở hữu chất vải kaki nhung sang, dày dặn, bền bỉ, chống
                    gió tốt. Lớp lông cừu bên trong ấm áp, giữ nhiệt tốt vào mùa
                    Đông.
                  </p>{" "}
                  <p className="font-semibold mt-2">ĐẶC ĐIỂM NỔI BẬT</p>{" "}
                  <p>
                    - Thiết kế khuy sừng Mickey Mouse bắt mắt. Cộng thêm khóa
                    kéo kim loại bên trong chắc chắn, trơn mượt, chống gỉ nước.
                  </p>{" "}
                  <p>- Mũ chùm ấm áp phối viền lông cáo thời thượng.</p>
                  <p>
                    - Túi hai bên hông sâu, rộng; túi hộp bên cánh tay tiện lợi.
                  </p>{" "}
                  <p> - Label bằng da cao cấp, nổi trên nền áo.</p>
                  <p className="font-semibold mt-2"> HƯỚNG DẪN BẢO QUẢN </p>
                  <p>
                    <b>- Giặt khô:</b> Bạn nên chọn giặt khô tại các địa chỉ
                    chuyên nghiệp và uy tín để tránh bị hỏng sản phẩm.
                  </p>{" "}
                  <b>- Giặt tay:</b>
                  <p>
                    Giặt tay bằng nước sạch có nhiệt độ trung bình khoảng 37 -40
                    độ C với bột giặt chuyên dụng hoặc nước giặt có độ tẩy nhẹ ({" "}
                    {"<"}8 pH) hoặc dầu gội đầu. Vò nhẹ nhàng trong khoảng 10
                    phút trước khi xả với nước, không vắt quá khô.
                  </p>
                  <p>
                    - Giặt máy: Chọn chế độ giặt nhẹ và không giặt với các sản
                    phẩm khác. Để khô tự nhiên.
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="bg-zinc-300 h-px border- my-10 w-full"></div>

      {/* sp cùng danh mục */}
      <div className="apx">
        <div>
          <h2 className="font-black text-3xl py-5">THỜI TRANG BÁN CHẠY</h2>
        </div>
        <div className="flex gap-4 relative hvbl2 mb-10   ">
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
          <div className="hidden hvbl3 ">
            <div className="text-8xl cursor-pointer hover:text-zinc-400 absolute left-0  top-1/3">
              {"<"}
            </div>
            <div className="text-8xl cursor-pointer hover:text-zinc-400 absolute right-0  top-1/3">
              {">"}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
