import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { baseURL } from "../../Util/constant";
import axios from "axios";
import useProduct from "../../Context/ProductContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { Cart } = useProduct();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async (e) => {
    navigate("/");
    localStorage.removeItem("token");
  };

  const [admin, setAdmin] = useState({});

  useEffect(() => {
    axios
      .get(`${baseURL}/v1/auth/getLoggedinUser`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setAdmin(res.data.user);
        console.log(res.data.user);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-3">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">
            {" "}
            E-COMM WEBSITE{" "}
          </span>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          >
            {isOpen ? (
              <svg
                className="w-3 h-3 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 6.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-3 h-3 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 10l3.794-3.794a1 1 0 10-1.414-1.414l-4.5 4.5a1 1 0 000 1.414l4.5 4.5a1 1 0 101.414-1.414L9.293 10z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          {localStorage.getItem("token") && (
            <div className="text-sm text-right mr-12 lg:flex-grow">
              <NavLink
                to="/home"
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Home
              </NavLink>

              <NavLink
                to="/cart"
                className="mt-2 flex lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
              >
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h10.72a2 2 0 0 0 2-1.61L19 6H5" />
                  </svg>
                  <span>{Cart.length}</span>
                </span>
              </NavLink>
            </div>
          )}
          {localStorage.getItem("token") ? (
            <div>
              <a
                href="#"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          ) : (
            <div className="ml-auto">
              <a
                href="/"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Login
              </a>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
