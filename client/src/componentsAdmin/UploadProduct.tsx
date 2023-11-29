import React, { useEffect, useState } from "react";
import { AllCategory } from "../entity/categoryed.entity";
import instance from "../api/axios";
import { AllCollection } from "../entity/collection.entity";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UploadProducts } from "../entity/product.entity";
import { store } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const UploadProduct: React.FC = () => {
  const [categoryed, setCategoryed] = useState<AllCategory[]>([]);
  const [collection, setCollection] = useState<AllCollection[]>([]);

  const [imageUrls, setImageUrls] = useState<any>([]);
  const [downloadUrls, setDownloadUrls] = useState<any>([]);

  const [uploadProducts, setUploadProducts] = useState<UploadProducts>({
    productName: "",
    salePrice: 0,
    description: "",
    productImage: "",
    idCollections: 0,
  });

  const { productName, salePrice, description, idCollections } = uploadProducts;

  const navigate = useNavigate();

  const loadCategoryed = () => {
    instance
      .get("/categoryed")
      .then((res) => setCategoryed(res.data))
      .catch((err) => console.log(err));
  };

  const handleCategory = (id: number | undefined) => {
    // console.log("id:", id);
    instance
      .get(`/collections/idCategory/${id}`)
      .then((res) => {
        // console.log(res.data);
        setCollection(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadCategoryed();
  }, []);

  // Chọn nhiều hình ảnh
  const handleChangeInput = (e: any) => {
    const files = Array.from(e.target.files);
    setImageUrls(files);

    const tempUrls = files.map((file: any) => URL.createObjectURL(file));
    // setTempImageUrls(tempUrls);
    setDownloadUrls(tempUrls);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setUploadProducts({ ...uploadProducts, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productName || !description || !idCollections || !collection) {
      toast.warning(" các trường không được để trống");
    }


    Promise.all(
      imageUrls.map((file: any) => {
        const imageRef = ref(store, `images/${file.name + uuidv4()}`);
        return uploadBytes(imageRef, file).then((value: any) => {
          return getDownloadURL(value.ref);
        });
      })
    ).then((response: any) => {
      // Cập nhật state downloadUrls với mảng đường link của ảnh
      setDownloadUrls(response);

      // Cập nhật state uploadProducts với đường link đầu tiên
      setUploadProducts((prevProducts) => ({
        ...prevProducts,
        productImage: response[0], // Lấy đường link của ảnh đầu tiên
      }));

      // Tiếp tục thực hiện lưu dữ liệu hoặc các thao tác khác theo nhu cầu của bạn
      const formUpload = {
        productName,
        salePrice,
        description,
        productImage: response, // Cập nhật productImage với mảng đường link của ảnh
        idCollections,
      };

      if (imageUrls.length > 0) {
        instance
          .post("/products", formUpload)
          .then((res) => {
            console.log(res.data);
            toast.success("upload thành công");
            setUploadProducts({
              productName: "",
              salePrice: 0,
              description: "",
              productImage: "",
              idCollections: 0,
            });
            setTimeout(() => {
              navigate("/admin/product-management");
            }, 1000);
          })
          .catch((err) => console.log(err));
      }
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
      <div className="flex">
        <div className="w-1/2">
          <h1 className="uppercase py-5 font-semibold text-xl">
            thêm mới sản phẩm
          </h1>
          <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-5">
              <label
                htmlFor="productName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên sản phẩm
              </label>
              <input
                name="productName"
                value={productName}
                onChange={handleChange}
                type="text"
                id="productName"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tên sản phẩm"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="sale"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Sale
              </label>
              <input
                name="salePrice"
                value={salePrice}
                onChange={handleChange}
                type="number"
                id="sale"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mô tả
              </label>
              <textarea
                name="description"
                value={description}
                onChange={handleChange}
                id="description"
                rows={4}
                className="block p-2.5 w-full outline-none   text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Mô tả sản phẩm"
              />
            </div>

            <h1 className="font-semibold text-sm py-2 pt-4">Ảnh sản phẩm</h1>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG , jfif (MAX. 800x400px)
                  </p>
                </div>
                <input
                  name="productImage"
                  onChange={handleChangeInput}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="countries"
                className="block py-2  text-sm font-medium text-gray-900 dark:text-white"
              >
                Phân loại
              </label>
              <select
                onChange={(e) => handleCategory(parseInt(e.target.value))}
                id="countries"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>-------</option>
                {categoryed.length > 0 &&
                  categoryed.slice(1, 5).map((e, i) => (
                    <option key={i} value={e.idCategoryed}>
                      {e.categoryName}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block py-2  text-sm font-medium text-gray-900 dark:text-white"
              >
                Thể loại
              </label>
              <select
                name="idCollections"
                value={idCollections}
                onChange={handleChange}
                id="countries"
                className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>-------</option>
                {collection.length > 0 &&
                  collection.map((e, i) => (
                    <option
                      className="capitalize"
                      key={i}
                      value={e.idCollections}
                    >
                      {e.collectionsName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="py-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Thêm sản phẩm
              </button>
            </div>
          </form>
        </div>
        <div className="w-1/2">
          <h1 className="uppercase py-5 font-semibold text-xl">ảnh sản phẩm</h1>
          <div className="flex flex-wrap gap-4">
            <div className="w-48 h-64 shadow">
              {downloadUrls.map((url: string, index: number) => (
                <img key={index} className="w-full h-full" src={url} alt="" />
              ))}
              {/* <div className="flex items-center justify-end">
              <label
                htmlFor="dropzone-file"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <i className="fa-solid fa-pen-to-square w-8 h-8 mb-4 text-gray-500 dark:text-gray-400 cursor-pointer"></i>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadProduct;
