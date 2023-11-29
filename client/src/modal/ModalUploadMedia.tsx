import React, { useState } from "react";
import { ModalMedia } from "../entity/modal.entity";
import { store } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import instance from "../api/axios";

interface UploadImage {
  urlImage: string[];
  idProduct: number | undefined;
}

const ModalUploadMedia: React.FC<ModalMedia> = ({
  selectedMediaId,

  isModalMedia,
  closeModalMedia,
}) => {
  const [imageUrls, setImageUrls] = useState<any>([]);
  const [downloadUrls, setDownloadUrls] = useState<any>([]);

  const [uploadProducts, setUploadProducts] = useState<UploadImage>({
    urlImage: [],
    idProduct: selectedMediaId,
  });

  // Chọn nhiều hình ảnh
  const handleChangeInput = (e: any) => {
    const files = Array.from(e.target.files);
    setImageUrls(files);

    const tempUrls = files.map((file: any) => URL.createObjectURL(file));
    setDownloadUrls(tempUrls);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Promise.all(
      imageUrls.map((file: any) => {
        const imageRef = ref(store, `imagesProduct/${file.name + uuidv4()}`);
        return uploadBytes(imageRef, file).then((value: any) => {
          return getDownloadURL(value.ref);
        });
      })
    ).then((response: any) => {
      setDownloadUrls(response);

      setUploadProducts((prevProducts) => ({
        ...prevProducts,
        productImage: response[0],
      }));

      const formUpload = {
        urlImage: response,
        idProduct: selectedMediaId,
      };
      console.log("formUpload:", formUpload);

      if (imageUrls.length > 0) {
        instance
          .post("/media", formUpload)
          .then((res) => {
         
            toast.success("Thêm ảnh thành công");

            closeModalMedia();
          })
          .catch((err) => console.log(err));
      }
      setDownloadUrls([]);
    });
  };
  return (
    <div
      className={`modal fixed w-full h-full top-0 left-0 flex justify-center z-50 text-black ${
        isModalMedia ? "" : "hidden"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        closeOnClick
        pauseOnHover
        draggable={false}
      />
      <div className="modal-container overflow-y-auto h-2/4 w-7/12 bg-white shadow-2xl mt-20">
        <div className="flex justify-between p-4 items-center">
          <h2 className="font-bold text-2xl uppercase">thông tin sản phẩm</h2>
          <div
            className="closeCart w-6 h-6 flex justify-center items-center"
            onClick={closeModalMedia}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>

        {/* --- */}
        <div className="flex gap-3">
          <form onSubmit={handleSubmit} className="w-1/2">
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
                  multiple
                />
              </label>
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
          <div className="flex gap-4">
            {downloadUrls.map((url: string, index: number) => (
              <div key={index} className="w-28 h-36 shadow">
                <img className="w-full h-full" src={url} alt="" />
              </div>
            ))}
          </div>
        </div>
        {/* --- */}
      </div>
    </div>
  );
};

export default ModalUploadMedia;
