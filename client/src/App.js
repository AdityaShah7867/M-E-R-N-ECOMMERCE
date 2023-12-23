import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import Private from "./components/Privateroutes.jsx/Private";
import Navbar from "../src/components/Navbar/Navbar";
import Cart from "./Pages/Cart";
import { AuthProvider } from "./Context/authContext";
import { ProductProvider } from "./Context/ProductContext";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/" element={<Private />}>
              <Route path="/home" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
