import React, { useState } from "react";
import { baseURL } from "../../Util/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Context/authContext";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  console.log(useAuth());

  const { setUserState, user } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/auth/login`, {
        username,
        password,
      });

      const { message, token } = response.data;

      if (response.status === 200) {
        navigate("/home");
        toast.success("Login successful!");
        console.log(response.data);
        setUserState(response.data);

        localStorage.setItem("token", token);
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div
        className="min-h-screen flex items-center justify-center  bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1133980246/photo/shopping-online-concept-shopping-service-on-the-online-web-with-payment-by-credit-card-and.jpg?s=612x612&w=0&k=20&c=joeQ74hTCWThhW6XfnBsCUc5Qp3YB868J-hyBWxGSUM=')",
        }}
      >
        <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
            Login to Your Account
          </h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                type="name"
                placeholder="username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
                />
              </div>
            </div>

            <button className="w-full bg-indigo-500 text-white p-3 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-500">
              Log in
            </button>
            <h1>
              {" "}
              username : kminchelle , Password : 0lelplR <br /> from
              dummyjson.com
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
