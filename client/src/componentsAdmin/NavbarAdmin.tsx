import React, { useEffect, useState } from "react";
import instance from "../api/axios";
import { AllCategory } from "../entity/categoryed.entity";
import { AllCollection } from "../entity/collection.entity";

const NavbarAdmin: React.FC = () => {
  const [categoryed, setCategoryed] = useState<AllCategory[]>([]);
  const [collection, setCollection] = useState<AllCollection[]>([]);

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

  useEffect(() => {
    loadCategoryed();
  }, []);
  return (
    <>
      <div className="w-full flex items-center justify-between py-5 px-10 sticky top-0 bg-white shadow-md z-50">
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
                        <li key={iu} className="border-b py-2 cursor-pointer px-3 hover:bg-zinc-100 hover:text-red-700 ">
                          {eu.collectionsName}
                        </li>
                      ))}
                  </ul>
                </li>
              ))}

          </ul>
        </div>
        <div className="w-1/5">
          <div></div>
          {/* <form>
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
          </form> */}
        </div>
      </div>
    </>
  );
};

export default NavbarAdmin;
