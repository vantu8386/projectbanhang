import React from "react";

const ChinhSach: React.FC = () => {
  return (
    <div className="apx bg-slate-50 mt-4">  
      <div className="flex justify-between py-32">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold py-2">
            <i className="fa-solid fa-plane-departure "></i>
            <h3>THANH TOÁN & GIAO HÀNG</h3>
          </div>
          <div className="text-sm">
            <p>Miễn phí vận chuyển cho đơn hàng trên 399.000 VNĐ</p>
            <p>- Giao hàng và thu tiền tận nơi </p>
            <p>- Chuyển khoản và giao hàng</p>
            <p>- Mua hàng tại shop</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-lg font-bold py-2">
            <i className="fa-regular fa-credit-card"></i>
            <h3>THẺ THÀNH VIÊN</h3>
          </div>
          <div className="text-sm">
            <p>Chế độ ưu đãi thành viên VIP:</p>
            <p>- 5% cho thành viên Bạc</p>
            <p>- 10% cho thành viên Vàng</p>
            <p>- 15% cho thành viên Kim cương</p>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-lg font-bold py-2">
            <i className="fa-regular fa-clock"></i>
            <h3>GIỜ MỞ CỬA</h3>
          </div>
          <div className="text-sm">
            <p className="font-bold">8h30 đến 22:00</p>
            <p>- Tất cả các ngày trong tuần</p>
            <div>
              - Áp dụng cho tất cả các chi nhánh{" "}
              <p>hệ thống cửa hàng SHOP X.</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 text-lg font-bold py-2">
            <i className="fa-solid fa-headphones-simple"></i>
            <h3>HỖ TRỢ 24/7</h3>
          </div>
          <div className="text-sm">
            <p>Gọi ngay cho chúng tôi khi bạn có thắc mắc</p>
            <p>- 0365.12.12.97</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChinhSach;
