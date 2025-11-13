

import React from "react";
import { useDispatch } from "react-redux";
import { LOGO_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {items.map((item, index) => (
        <div
          key={`${item.card.info.id}-${index}`}
          className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4 border border-gray-100"
        >
          {/* Left Section */}
          <div className="w-full md:w-8/12">
            <h3 className="text-lg font-semibold text-gray-900 flex flex-wrap items-center">
              {item.card.info.name}
              <span className="ml-2 text-sm font-medium text-green-600">
                ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              {item.card.info.description?.length > 100
                ? item.card.info.description.slice(0, 100) + "..."
                : item.card.info.description}
            </p>
          </div>

          {/* Right Section */}
          <div className="relative w-full md:w-3/12 flex flex-col items-center mt-3 md:mt-0">
            <div className="relative">
              <img
                src={LOGO_URL + item.card.info.imageId}
                alt={item.card.info.name}
                className="w-32 h-28 object-cover rounded-xl shadow-sm hover:scale-105 transition-transform duration-300"
              />
              <button
                onClick={() => handleAddItem(item)}
                className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-1.5 text-sm rounded-full shadow-md hover:bg-gray-800 transition-colors duration-300"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;