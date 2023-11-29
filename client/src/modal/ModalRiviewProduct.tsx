import React from "react";
import { ModalReviewProduct } from "../entity/modal.entity";
import { Media } from "../entity/media.entity";
import { SizeProduct } from "../entity/size.entity";
import { formatCurrency } from "../formatVND";

const ModalRiviewProduct: React.FC<ModalReviewProduct> = ({
  closeModal,
  isModalReviewProduct,
  listProduct,
  selectedProductId,
  productId,
}) => {
  // console.log("productId:", productId)
  // console.log("productId1:", productId);
  // console.log("selectedProductId:", selectedProductId)
  // console.log("listProduct:", listProduct)
  return (
    <div
      className={`modal fixed w-full h-full top-0 left-0 flex justify-center z-50 text-black ${
        isModalReviewProduct ? "" : "hidden"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
    >
      <div className="modal-container overflow-y-auto h-2/4 w-5/12 bg-white shadow-2xl mt-20">
        <div className="flex justify-between p-4 items-center">
          <h2 className="font-bold text-2xl uppercase">thông tin sản phẩm</h2>
          <div
            className="closeCart w-6 h-6 flex justify-center items-center"
            onClick={closeModal}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>

        {productId.length > 0 &&
          productId.map((e, i) => (
            <div key={i} className="modal-content px-4">
              <div>
                <div className="flex gap-3">
                  <span className=" ">Tên sản phẩm:</span>
                  <span className="font-semibold">{e.productName}</span>
                </div>
                {e.size.length > 0 &&
                  e.size.map((s: SizeProduct, j: number) => (
                    <ul key={j}>
                      <li className="flex gap-8">
                        <div className="flex gap-2 w-12">
                          <span className="">Size:</span>
                          <span className="font-semibold uppercase">
                            {s.sizeName}{" "}
                          </span>
                        </div>
                        <div className="flex gap-2 w-28">
                          <span className="">Số lượng:</span>
                          <span className="font-semibold">{s.quantity}</span>
                        </div>
                        <div className="flex gap-2 ">
                          <span className="">Giá bán:</span>
                          {e.salePrice !== undefined &&
                          s.price !== undefined ? (
                            <span className="font-semibold">
                              {formatCurrency((1 - e.salePrice) * s.price)}
                            </span>
                          ) : (
                            <span className="text-red-500">
                              Lỗi: Giá không hợp lệ
                            </span>
                          )}
                          <span className="font-semibold">
                            {s.price !== undefined &&
                            e.salePrice !== undefined &&
                            e.salePrice > 0 ? (
                              <div className="flex gap-2">
                                {" _ "}
                                <span>Giá gốc:</span>
                                <i className="line-through font-normal">
                                  {formatCurrency(s.price)}
                                </i>
                              </div>
                            ) : (
                              <span className="text-red-500">
                                Sản phẩm chưa áp dụng giảm giá
                              </span>
                            )}
                          </span>
                        </div>
                      </li>
                    </ul>
                  ))}

                <div className="bg-zinc-300 h-px border- my-5 "></div>
                <h1 className="uppercase">ảnh sản phẩm</h1>
                <div className="flex flex-wrap gap-3">
                  {e.media.length > 0 &&
                    e.media.map((m: Media, n: number) => (
                      <div className="w-40 h-56" key={n}>
                        <img
                          className="w-full h-full my-2 "
                          src={m.urlImage}
                          alt={m.type}
                        />
                      </div>
                    ))}
                </div>

                {/* <p className="font-semibold">
                  Sdt: <span className="font-semibold">222</span>
                </p> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ModalRiviewProduct;
