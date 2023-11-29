import React, { useState, useEffect } from "react";
import NavbarAdmin from "../componentsAdmin/NavbarAdmin";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalSize from "../modal/ModalSize";
import ModalRiviewProduct from "../modal/ModalRiviewProduct";
import { Products } from "../entity/product.entity";
import instance from "../api/axios";
import { SizeProduct } from "../entity/size.entity";
import ModalUploadMedia from "../modal/ModalUploadMedia";
import ModalDelete from "../modal/ModalDelete";

const ProductManagement: React.FC = () => {
  const [isModalSize, setIsModalSize] = useState(false);
  const [isModalMedia, setIsModalMedia] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState<number | undefined>(
    undefined
  );
  const [isModalReviewProduct, setIsModalReviewProduct] = useState(false);
  const [listProduct, setListProduct] = useState<Products[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<
    number | undefined
  >(undefined);
  const [productId, setProductId] = useState<Products[]>([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteIdCart, setDeleteIdCart] = useState<number | null>(null);

  const openModalSize = (id: number | undefined) => {
    // console.log("id:", id)
    setSelectedProductId(id);
    instance
      .get(`/products/${id}`)
      .then((res) => {
        setProductId(res.data);
      })
      .catch((err) => console.log(err));
    setIsModalSize(true);
  };
  const closeModalSize = () => {
    setIsModalSize(false);
  };
  const openModalMedia = (id: number | undefined) => {
    setSelectedMediaId(id);
    setIsModalMedia(true);
  };
  const closeModalMedia = () => {
    setIsModalMedia(false);
  };

  const openModalReview = (id: number | undefined) => {
    setSelectedProductId(id);
    instance
      .get(`/products/${id}`)
      .then((res) => {
        setProductId(res.data);
      })
      .catch((err) => console.log(err));
    setIsModalReviewProduct(true);
  };
  const closeModalReview = () => {
    setIsModalReviewProduct(false);
  };

  const loadListProduct = () => {
    instance
      .get("/products")
      .then((res) => {
        // console.log(res.data);
        setListProduct(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadListProduct();
    // loadSizes
  }, []);

  const handleDelete = (idCart: number) => {
    setDeleteIdCart(idCart);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    instance
      .delete(`products/${deleteIdCart}`)
      .then((res) => {
        toast.success("Successfully deleted");
        loadListProduct();
      })
      .catch((err) => console.log("err:", err));
    setIsDeleteModalVisible(false);
  };

  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
  };

  return (
    <div className="px-10">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable={false}
      />
      <NavbarAdmin />
      <div className="flex justify-between items-center">
        <h1 className="uppercase text-2xl py-10">danh sách sản phẩm </h1>

        <div className="w-1/3">
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <i className="fa-solid fa-magnifying-glass w-4 h-4 text-gray-500 dark:text-gray-400"></i>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full outline-none p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tìm kiếm"
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <i className="fa-solid fa-magnifying-glass w-4 h-4 text-white dark:text-gray-400"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex justify-end items-center mb-10">
        <button type="button">
          <Link
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            to={"/admin/upload-product"}
          >
            Thêm mới sản phẩm
          </Link>
        </button>
      </div>
      <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3  w-48">
                sản phẩm
              </th>
              <th scope="col" className="px-6 py-3 ">
                sale %
              </th>
              <th scope="col" className="px-6 py-3 ">
                mô tả
              </th>
              <th scope="col" className="px-6 py-3 ">
                size
              </th>
              <th scope="col" className="px-6 py-3 ">
                review
              </th>
              <th scope="col" className="px-6 py-3 ">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {listProduct.length > 0 &&
              listProduct.map((e, i) => (
                <tr
                  key={i}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {i + 1}
                  </th>
                  <td className="px-6 py-2 flex justify-center items-center gap-5 w-48">
                    <img className="w-20 h-28" src={e.productImage} alt="" />
                    <span>{e.productName}</span>
                  </td>

                  <td className="px-6 py-2">
                    {e.salePrice !== undefined ? (
                      <span className="px-6 py-2">{e.salePrice * 100}%</span>
                    ) : (
                      <span className="text-red-500">
                        Lỗi: Giá không hợp lệ
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-2 shorten-text">{e.description}</td>
                  <td className="px-6 py-2">
                    {/* {e.size.length > 0 ? (
                      e.size.map((i: SizeProduct, j: number) => (
                        <ul key={j}>
                          <li>{i.sizeName}</li>
                        </ul>
                      ))
                    ) : ( */}
                    <button
                      onClick={() => openModalSize(e.idProduct)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      {/* <i className="fa-solid fa-pen-to-square"></i> */}
                      Thiết lập
                    </button>
                    {/* // )} */}
                  </td>

                  <td className="px-6 py-2">
                    <button
                      data-title="Chi tiết"
                      onClick={() => openModalReview(e.idProduct)}
                      className="title_content text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </td>
                  <td className=" px-6 py-2 w-60">
                    <button
                      onClick={() => openModalMedia(e.idProduct)}
                      data-title="Thêm ảnh"
                      type="button"
                      className="title_content text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      <i className="fa-regular fa-file-image"></i>
                    </button>
                    <button
                      data-title="Sửa"
                      type="button"
                      className="title_content text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(Number(e.idProduct))}
                      data-title="Xóa"
                      type="button"
                      className="title_content text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="relative">
        <ModalSize
          selectedProductId={selectedProductId}
          closeModal={closeModalSize}
          isModalSize={isModalSize}
          productId={productId}
        />
      </div>
      <div className="relative">
        <ModalUploadMedia
          isModalMedia={isModalMedia}
          selectedMediaId={selectedMediaId}
          closeModalMedia={closeModalMedia}
        />
      </div>
      <div className="relative">
        <ModalRiviewProduct
          // openModal={openModal}
          closeModal={closeModalReview}
          isModalReviewProduct={isModalReviewProduct}
          listProduct={listProduct}
          selectedProductId={selectedProductId}
          productId={productId}
        />
      </div>
      <div>
        <ModalDelete
          isVisible={isDeleteModalVisible}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </div>
    </div>
  );
};

export default ProductManagement;
