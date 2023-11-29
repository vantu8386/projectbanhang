import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalCart from "../modal/ModalCart";
import instance from "../api/axios";
import { AllCategory } from "../entity/categoryed.entity";
import { AllCollection } from "../entity/collection.entity";

const Navbar: React.FC = () => {
  const user = localStorage.getItem("user");
  const avatarUrl = localStorage.getItem("avatarUrl");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("idUsers");
    localStorage.removeItem("avatarUrl");
    localStorage.removeItem("phone")
  };

  const idUsers = localStorage.getItem("idUsers");

  const [cartUser, setCartUser] = useState<any>([]);
  const [isModalCart, setIsmodalCart] = useState(false);
  const [isDropdow, setIsDropdow] = useState(false);

  const [categoryed, setCategoryed] = useState<AllCategory[]>([]);
  const [collection, setCollection] = useState<AllCollection[]>([]);

  const navigate = useNavigate()

  const openDropdw = () => {
    setIsDropdow(true);
  };

  const closeDropdw = () => {
    setIsDropdow(false);
  };

  const openModal = () => {
    // console.log("openModal:", openModal);
    setIsmodalCart(true);
  };

  const closeModal = () => {
    setIsmodalCart(false);
  };

  const loadCategoryed = () => {
    instance
      .get("/categoryed")
      .then((res) => setCategoryed(res.data))
      .catch((err) => console.log(err));
  };

  const handleCollection = (id: number | undefined) => {
    instance
      .get(`/collections/idCategory/${id}`)
      .then((res) => setCollection(res.data))
      .catch((err) => console.log(err));
  };

  const loadCartUser = () => {
    instance
      .get(`/cart/user/${idUsers}`)
      .then((res) => {
        setCartUser(res.data.length);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    loadCartUser();
    loadCategoryed();
  }, []);

  const handleCollectionClick = (id: number) => {
    navigate(`/products/${id}`);
    
  }
  return (
    <>
      <div className="apx flex items-center justify-between py-5  sticky top-0 bg-white shadow-md z-50">
        <div className="cursor-pointer">
          <Link to={"/"}>
            <img
              className="w-11"
              src="../../../images/logo_shop_x.png"
              alt=""
            />
          </Link>
        </div>
        <div className="flex items-center gap-32">
          <ul className="flex items-center gap-8">
            {categoryed.length > 0 &&
              categoryed.map((e, i) => (
                <li
                  onMouseEnter={() => handleCollection(e.idCategoryed)}
                  key={i}
                  className="group relative "
                >
                  <span className="cursor-pointer hover:text-red-700 uppercase">
                    {e.categoryName}
                  </span>

                  <ul className="hidden -left-3 w-48 group-hover:block absolute bg-white shadow-lg z-50 capitalize">
                    {collection.length > 0 &&
                      collection.map((eu, iu) => (
                        
                        <li
                        onClick={() => handleCollectionClick(Number(eu.idCollections))}
                          key={iu}
                          className="border-b py-2 cursor-pointer px-3 hover:bg-zinc-100 hover:text-red-700 "
                        >
                          {eu.collectionsName}
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
          </ul>
          <div className="flex items-center gap-5">
            <ul>
              <li className="group relative">
                <button className="bg-zinc-200 w-8 h-8 rounded-md text-red-800">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <ul className="hidden border -right-10 w-80 group-hover:block absolute bg-white ">
                  <li className="py-2 px-3">
                    <form>
                      <label
                        htmlFor="search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                      >
                        Search
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <i className="fa-solid fa-magnifying-glass text-gray-500 dark:text-gray-400"></i>
                        </div>
                        <input
                          type="search"
                          id="search"
                          className="block outline-red-500 w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                          placeholder="Search"
                        />
                        <button
                          type="submit"
                          className="hidden text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 "
                        >
                          Search
                        </button>
                      </div>
                    </form>
                  </li>
                </ul>
              </li>
            </ul>

            {user ? (
              <>
                <div className="relative">
                  <div className="hover_title">
                    <button
                      onClick={openDropdw}
                      data-title={`${user}`}
                      type="button"
                      className="title_content w-8 h-8 justify-center text-sm font-medium text-center text-red-800 bg-zinc-200 rounded-lg "
                    >
                      <span>
                        <img
                          className="w-full h-full"
                          src={avatarUrl ? avatarUrl : undefined}
                          alt=""
                        />
                      </span>
                    </button>
                  </div>
                  {isDropdow && (
                    <div className="absolute bg-white shadow-xl w-56 -left-16 mt-1">
                      <p className=" my-2 px-4 font-bold">
                        THÔNG TIN TÀI KHOẢN
                      </p>
                      <p
                        onClick={closeDropdw}
                        className="my-1 px-4 cursor-pointer font-medium flex items-center gap-3"
                      >
                        <span>Xin chào:</span>
                        <span>{user}</span>
                      </p>
                      <p
                        onClick={closeDropdw}
                        className="my-1 px-4 cursor-pointer"
                      >
                        <Link to={"/account"}>Tài khoản của tôi</Link>
                      </p>
                      <p
                        className="my-1 px-4 cursor-pointer"
                        onClick={handleLogout}
                      >
                        <Link to={"/"}>Đăng xuất</Link>
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="relative">
                  <div className="hover_title">
                    <button
                      onClick={openDropdw}
                      data-title={`Tài khoản`}
                      type="button"
                      className="title_content w-8 h-8 justify-center text-sm font-medium text-center text-red-800 bg-zinc-200 rounded-lg "
                    >
                      <i className="fa-solid fa-user"></i>
                    </button>
                  </div>
                  {isDropdow && (
                    <div className="absolute bg-white shadow-xl w-56 -left-16 mt-1">
                      <p
                        className="my-1 px-4 cursor-pointer"
                        onClick={closeDropdw}
                      >
                        <Link to={"/login"}>Đăng Nhập</Link>
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            <button
              type="button"
              className="relative inline-flex items-center w-8 h-8 justify-center text-sm font-medium text-center text-red-800 bg-zinc-200 rounded-lg "
              onClick={openModal}
            >
              <i className="fa-solid fa-cart-plus text-lg"></i>
              <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                {cartUser}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="relative">
        <ModalCart
          openModal={openModal}
          closeModal={closeModal}
          isModalCart={isModalCart}
        />
      </div>
    </>
  );
};

export default Navbar;
