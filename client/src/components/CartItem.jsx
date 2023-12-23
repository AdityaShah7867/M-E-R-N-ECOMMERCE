import React from "react";

const CartItem = ({ product }) => {
  return (
    <div>
      <div className="bg-white shadow-lg m-8 rounded-lg flex flex-col md:flex-row">
        <div className="md:w-1/3 p-6">
          {product.thumbnail && (
            <img
              src={product.thumbnail}
              alt={product.name}
              className="max-w-56 h-full object-cover"
            />
          )}
        </div>

        <div className="md:w-2/3 p-6">
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-700 text-base">{product.description}</p>
          <p className="text-gray-700 text-base ">Brand: {product.brand}</p>
          <p className="text-gray-700 text-base ">
            Category: {product.category}
          </p>
          <p className="text-gray-700 text-base ">Rating: {product.rating}</p>

          <p className="text-gray-700 text-base mb-2">
            {product.discountPercentage}% OFF
          </p>
          <p className="text-green-500 text-xl font-semibold">
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
