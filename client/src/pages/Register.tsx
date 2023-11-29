import React, { useState } from "react";
import Footer from "../components/Footer";
import NavTop from "../components/NavTop";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Signup } from "../entity/user.entity";
import instance from "../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [signup, setSignup] = useState<Signup>({
    userName: "",
    phone: "",
    email: "",
    passwords: "",
    confirmPassword: "",
  });

  const { userName, phone, email, passwords, confirmPassword } = signup;

  const navigate =  useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registerForm = {
      userName,
      phone,
      email,
      passwords,
      confirmPassword,
    };

    instance
      .post("/auth/register", registerForm)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((err) => {
        // console.log("err:", err);
        if (err.response.data.message === "Email da ton tai") {
          toast.warning(err.response.data.message);
        } else {
          return toast.warning(
            err.response.data.message[1] ||
              err.response.data.message[0] ||
              err.response.data.message[3] ||
              err.response.data.message[2] ||
              err.response.data.message[5] ||
              err.response.data.message[4] ||
              err.response.data.message[8] ||
              err.response.data.message[6] ||
              err.response.data.message[7] ||
              err.response.data.message[11] ||
              err.response.data.message[9] ||
              err.response.data.message[10]
          );
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
      <NavTop />
      <Navbar />

      <div className="flex justify-center">
        <div className="apx  py-4 ">
          <h1 className="font-bold text-3xl flex justify-center py-5">
            ĐĂNG KÍ MỚI
          </h1>
          <form onSubmit={handleSubmit} className="w-96 shadow p-5 rounded-lg">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-zinc-500 focus:outline-none focus:ring-0 focus:border-zinc-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="userName"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Tên của bạn
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-zinc-500 focus:outline-none focus:ring-0 focus:border-zinc-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Số điện thoại
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-zinc-500 focus:outline-none focus:ring-0 focus:border-zinc-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email của bạn
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="passwords"
                id="passwords"
                value={passwords}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-zinc-500 focus:outline-none focus:ring-0 focus:border-zinc-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="passwords"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mật khẩu
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-zinc-500 focus:outline-none focus:ring-0 focus:border-zinc-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="confirmPassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-zinc-600 peer-focus:dark:text-zinc-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nhập lại mật khẩu
              </label>
            </div>

            <div className="w-full flex justify-center text-white font-bold ">
              <button
                type="submit"
                className="w-full h-full py-3 bg-zinc-800 hover:bg-zinc-900 rounded"
              >
                ĐĂNG KÍ
              </button>
            </div>
            <div className="bg-zinc-600 h-px border- my-6 "></div>

            <div className="flex justify-between">
              <Link to={"/login"}>
                <span>Đăng nhập</span>
              </Link>
              <span>Quên mật khẩu</span>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Register;
