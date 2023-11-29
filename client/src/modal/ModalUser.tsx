import React from "react";
import { IsModalUser } from "../entity/modal.entity";



const ModalUser: React.FC<IsModalUser> = ({
  // openModal,
  closeModal,
  isModalUser,
}) => {
  return (
    <div
      className={`modal fixed w-full h-full top-0 left-0 flex justify-end z-50 text-black ${
        isModalUser ? "" : "hidden"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
    >
      <div className="modal-container overflow-y-auto h-screen w-5/12 bg-white shadow-2xl">
        <div className="flex justify-between p-4 items-center">
          <h2 className="font-bold text-2xl">Chi tiết đặt hàng</h2>
          <div
            className="closeCart w-6 h-6 flex justify-center items-center"
            onClick={closeModal}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>

        <div className="modal-content px-4">
          <div>
            <p className="font-semibold">
              Họ tên: <span className="font-light"> abc</span>
            </p>
            <p className="font-semibold">
              {" "}
              Địa chỉ: <span className="font-light">xyz</span>
            </p>
            <p className="font-semibold">
              Sdt: <span className="font-light">222</span>
            </p>
          </div>
        </div>
        <div className="bg-zinc-300 h-px border- my-5 "></div>
      </div>
    </div>
  );
};

export default ModalUser;
