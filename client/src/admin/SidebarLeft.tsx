import React from "react";
import { Link } from "react-router-dom";
// import "../../images/user.png"

const SidebarLeft = () => {
  const admin = localStorage.getItem("admin");
  
  const handleLogout = () => {
    localStorage.removeItem("admin");
  }
  return (
    <>
      <div
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className=" flex justify-center ">
            <img className="w-44 h-44" src="../../images/user.png" alt="" />
          </div>
          <div className="flex justify-center py-2">
            <span className="font-bold uppercase">{admin}</span>
          </div>
          {/* <div className="bg-zinc-300 h-px border- mb-4"></div> */}
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={"/admin"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Bảng điều khiển</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/admin/user"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-user-group flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Danh sách người dùng
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={"/admin/product-management"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-bag-shopping flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Các sản phẩm
                </span>
              </Link>
            </li>
            <li onClick={handleLogout}>
              <Link
                to={"/login"}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-right-from-bracket flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">LogOut</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="p-4 sm:ml-56 "></div>
    </>
  );
};

export default SidebarLeft;
