import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageRight from "../components/PageRight";
import Footer from "../components/Footer";
import NavTop from "../components/NavTop";
import Navbar from "../components/Navbar";
import instance from "../api/axios";
import { Products } from "../entity/product.entity";
import { formatCurrency } from "../formatVND";

const ProductPages: React.FC = () => {
  const [collectionId, setCollectionId] = useState<Products []>([]);

  const { idCollection } = useParams();
  const navigate = useNavigate()

  const loadcolection = () => {
    instance
      .get(`/products/${idCollection}`)
      .then((res) => setCollectionId(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadcolection();
  }, [idCollection]);

  const handleIdProduct = (
    id: number | undefined | React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    navigate(`/product/review/${id}`);
  };

  return (
    <>
      <NavTop />
      <Navbar />

      <div className="apx py-4 bg-gray-50 font-thin ">
        <span>
          SHOP X /
          <span className="cursor-pointer text-gray-600">
            Thời trang mới nhất
          </span>
        </span>
      </div>

      <div className="apx">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold my-5">Thời trang mới nhất</h1>

          <div>
            <select className="shadow-xl bg-slate-200 py-1 rounded">
              <option value="">Sắp xếp</option>
              <option value="">Mới nhất</option>
              <option value="">Giá tăng dần</option>
              <option value="">Giá giảm dần</option>
            </select>
          </div>
        </div>
        <div className="bg-zinc-300 h-px border- my-3"></div>
      </div>

      <div className="apx flex">
        <div className="w-4/6 mr-10">
        <div className="flex flex-wrap gap-4">
            {collectionId.length > 0 &&
              collectionId.map((e, i) => (
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

export default ProductPages;
