import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavTop from "../components/NavTop";
import Navbar from "../components/Navbar";
import { Order } from "../entity/order.entity";
import instance from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatCurrency } from "../formatVND";
import ModalDelete from "../modal/ModalDelete";
import { useNavigate } from "react-router-dom";

const CheckOutPage = () => {
  const user: any = localStorage.getItem("user");
  const idUsers = localStorage.getItem("idUsers");
  const phone = localStorage.getItem("phone");

  const [cartUser, setCartUser] = useState<any>([]);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteIdCart, setDeleteIdCart] = useState<number | null>(null);
  const [addressUser, setAddressUser] = useState<Order>({
    idUsers: 0,
    userName: user,
    phone: Number(phone),
    activeProvince: "",
    activeDistrict: "",
    activeWard: "",
    address: "",
  });
 
  const { userName, address } = addressUser;

  let [provinces, setProvinces] = useState<any>([]); // Tỉnh/Thành Phố
  let [activeProvince, setActiveProvince] = useState("");

  let [districts, setDistricts] = useState<any>([]); // Quận/Huyện
  let [activeDistrict, setActiveDistrict] = useState("");

  let [wards, setWards] = useState<any>([]); // Phường/Xã
  let [activeWard, setActiveWard] = useState("");

  let VIETNAM_BASE_API = "https://provinces.open-api.vn/api/?depth=3";

  const navigate = useNavigate();

  // api tỉnh thành phổ
  const fetchProvinces = async () => {
    try {
      let res = await fetch(VIETNAM_BASE_API);
      let data = await res.json();
      // console.log(data);
      setProvinces(() => [...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let clickProvince = provinces.find((e: any) => e.name == activeProvince);
    if (clickProvince) {
      setDistricts(() => [...clickProvince.districts]);
      setActiveWard("");
    }
  }, [activeProvince]);

  useEffect(() => {
    let clickDistrict = districts.find((e: any) => e.name == activeDistrict);
    if (clickDistrict) {
      setWards(() => [...clickDistrict.wards]);
    }
  }, [activeDistrict]);

  const handleActiveProvince = (e: any) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveProvince(e.target.value);
    }
  };

  const handleActiveDistrict = (e: any) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveDistrict(e.target.value);
    }
  };

  const handleActiveWard = (e: any) => {
    if (!e.target.value) {
      resetAllProvinces();
    } else {
      setActiveWard(e.target.value);
    }
  };

  function resetAllProvinces() {
    setActiveProvince("");
    setActiveDistrict("");
    setDistricts([]);
    setActiveWard("");
    setWards([]);
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAddressUser({ ...addressUser, [e.target.name]: e.target.value });
  };

  // thêm địa chỉ nhận hàng
  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      idUsers: idUsers,
      userName: user,
      phone: Number(phone),
      address,
      activeProvince,
      activeDistrict,
      activeWard,
    };
    instance
      .post("orders", data)
      .then((res) => {
        toast.success("Đặt hàng thành công");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        console.log("err", err);
        if (err.response.data.message) {
          return toast.warning(
            err.response.data.message[0] ||
              err.response.data.message[1] ||
              err.response.data.message[2] ||
              err.response.data.message[3]
          );
        }
      });

    for (let i = 0; i < cartUser.length; i++) {
      const idCarts = cartUser[i].idCart;
      const cartItems = [
        {
          idCart: idCarts,
          idUsers,
        },
      ];
      instance
        .post("/cart-items", cartItems)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log("cartitem", err);
        });
    }
  };

  const loadCartUser = () => {
    instance
      .get(`/cart/user/${idUsers}`)
      .then((res) => {
        // console.log(res.data);
        setCartUser(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    loadCartUser();
    fetchProvinces();
  }, []);

  const handleDelete = (idCart: number) => {
    setDeleteIdCart(idCart);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = () => {
    instance
      .delete(`cart/${deleteIdCart}`)
      .then((res) => {
        toast.success("Successfully deleted");
        loadCartUser();
      })
      .catch((err) => console.log("err:", err));
    setIsDeleteModalVisible(false);
  };

  const cancelDelete = () => {
    setIsDeleteModalVisible(false);
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

      <div className="apx flex py-4 bg-gray-50 font-thin ">
        <div className="w-1/2 ">
          <h1 className="text-xl font-semibold">Thông tin vận chuyển</h1>
          <div className="bg-zinc-600 h-px border- my-6 "></div>
          <form onSubmit={handelSubmit} className="shadow p-5">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="userName"
                value={userName}
                onChange={handleChange}
                id="userName"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                // required
              />
              <label
                htmlFor="userName"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Họ và tên
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="phone"
                value={addressUser.phone}
                onChange={handleChange}
                id="phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                required
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Số điện thoại
              </label>
            </div>
            <div className="py-4">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Cách thức nhận hàng
              </label>

              <select
                className="block p-2.5 w-full outline-none text-sm text-gray-900
              bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500
              focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
              dark:focus:border-blue-500"
              >
                <option value="GH">Giao hàng tận nơi</option>
              </select>
            </div>

            {/*  */}
            <div className=" mb-3">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Địa chỉ
              </label>
              <select
                className="outline-none focus:outline-blue-500 mr-2 p-2 border rounded"
                aria-label="Default select example"
                onChange={handleActiveProvince}
                value={activeProvince}
              >
                <option value="">Tỉnh/Thành</option>
                {provinces.length > 0 &&
                  provinces.map((e: any) => (
                    <option key={e.name} value={e.name}>
                      {e.name}
                    </option>
                  ))}
              </select>

              <select
                className="outline-none focus:outline-blue-500 mr-2 p-2 border rounded"
                aria-label="Default select example"
                onChange={handleActiveDistrict}
                value={activeDistrict}
              >
                <option value="">Quận/Huyện</option>
                {districts.length > 0 &&
                  districts.map((e: any, i: number) => (
                    <option key={e.name} value={e.name}>
                      {e.name}
                    </option>
                  ))}
              </select>

              <select
                className="outline-none focus:outline-blue-500 p-2 border rounded"
                aria-label="Default select example"
                onChange={handleActiveWard}
                value={activeWard}
              >
                <option value="">Phường/Xã</option>
                {wards.length > 0 &&
                  wards.map((e: any, i: number) => (
                    <option key={e.name} value={e.name}>
                      {e.name}
                    </option>
                  ))}
              </select>
            </div>

            {/*  */}
            <div className="py-4">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Địa chỉ nhận hàng
              </label>
              <textarea
                id="message"
                name="address"
                value={address}
                onChange={handleChange}
                rows={4}
                className="block p-2.5 w-full outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Địa chỉ cụ thể"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Hoàn thành
            </button>
          </form>
        </div>

        {/* ----------------------------------------- */}
        <div className="w-1/2">
          <h1 className="text-xl font-semibold">Đơn hàng của bạn</h1>
          <div className="bg-zinc-600 h-px border- my-6  "></div>

          {cartUser.length > 0 &&
            cartUser.map((e: any, i: number) => (
              <div key={i} className="flex gap-3 py-2 px-5">
                <div className="w-20 h-28">
                  <img
                    className="w-full h-full"
                    src={e.size.product.productImage}
                    alt=""
                  />
                </div>
                <div className=" w-full flex justify-between">
                  <div className="flex flex-col">
                    <strong>{e.size.product.productName}</strong>

                    <div className=" flex gap-7">
                      <span>
                        Size:{" "}
                        <span className="uppercase font-semibold">
                          {e.size.sizeName}
                        </span>
                      </span>
                      <span>Số lượng: {e.quantity}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span>
                        {formatCurrency(
                          (1 - e.size.product.salePrice) * e.size.price
                        )}
                      </span>
                      <span>x</span>
                      <span>{e.quantity}</span>
                      <span>=</span>
                      <span>
                        {" "}
                        {formatCurrency(
                          (1 - e.size.product.salePrice) *
                            e.size.price *
                            e.quantity
                        )}
                      </span>
                    </div>
                  </div>
                  <div
                    onClick={() => handleDelete(Number(e.idCart))}
                    className="ml-4 text-red-600 hover:text-red-500 cursor-pointer"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </div>
                </div>
              </div>
            ))}

          <div className="bg-zinc-600 h-px border- my-6"></div>

          <div className="flex items-center justify-between px-5">
            <span className="font-bold">Tổng tiền thanh toán</span>
            <span className="font-bold text-red-700">
              {formatCurrency(
                cartUser.reduce(
                  (total: number, item: any) =>
                    total +
                    (1 - item.size.product.salePrice) *
                      item.size.price *
                      item.quantity,
                  0
                )
              )}
            </span>
          </div>
        </div>
      </div>

      <Footer />
      <ModalDelete
        isVisible={isDeleteModalVisible}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
};

export default CheckOutPage;
