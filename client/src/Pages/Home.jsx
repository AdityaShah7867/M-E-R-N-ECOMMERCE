import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../Context/authContext";
import useProduct from "../Context/ProductContext";
import StarRatingComponent from "react-star-rating-component";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(99999);

  const [searchQuery, setSearchQuery] = useState("");
  const { setUserState, user } = useAuth();
  const { setCartState } = useProduct();

  const handleCart = async (product) => {
    setCartState(product);
    toast.success("Added to cart");
  };

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products`)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      product.price >= minPrice &&
      product.price <= maxPrice
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome, {user?.username}!
        </h1>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <label htmlFor="minPrice" className="mr-4">
              Min Price:
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border-2 border-gray-300 rounded-md px-3 py-2 w-32"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="maxPrice" className="mr-4">
              Max Price:
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border-2 border-gray-300 rounded-md px-3 py-2 w-32"
            />
          </div>
          <button
            onClick={() => {
              setMinPrice(0);
              setMaxPrice(99999);
            }}
            className="bg-gray-300 text-gray-700 px-3 py-2 rounded-md transition-transform transform hover:scale-105"
          >
            Reset Price Range
          </button>
        </div>

        <div className="relative mx-auto text-gray-600 mb-12">
          <input
            type="search"
            name="search_123"
            className="border-2 border-gray-300 mb-4 self bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="new-password"
          />
          <button className="absolute right-0 top-0 mt-3 mr-4">
            <i className="fas fa-search"></i>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-md overflow-hidden transition-transform transform hover:scale-105"
            >
              <center>
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="max-w-full h-36 object-cover mb-2"
                />
              </center>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
                <div className="flex mb-2">
                  <p className="text-gray-700 text-sm">
                    Brand: {product.brand}
                  </p>
                  <p className="text-gray-700 ml-4 text-sm">
                    Category: {product.category}
                  </p>
                </div>

                <p className="text-gray-700 text-sm mb-2">
                  <i className="fas fa-star text-yellow-500"></i>{" "}
                  {product.rating} STARS{" "}
                  <StarRatingComponent
                    name={`rating_${product.id}`}
                    value={parseFloat(product.rating)}
                    starCount={5}
                    editing={false}
                  />
                </p>

                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-green-500 text-lg font-semibold mb-2">
                    ${product.price}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    ({product.discountPercentage})% OFF
                  </p>
                </div>
                <button
                  onClick={() => handleCart(product)}
                  className="bg-blue-500 text-white px-3 py-1 mt-2 rounded transition-transform transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
