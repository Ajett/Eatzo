import React from "react";
import UserContext from "../utils/UserContext";

const RestaurantCard = ({ resData }) => {
  if (!resData) return null;

  const {
    name,
    cuisines,
    avgRating,
    costForTwo,
    sla,
    cloudinaryImageId,
  } = resData;

  return (
    <div className="m-4 p-4 w-[270px] bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
      {/* Restaurant Image */}
      <div className="relative">
        <img
          alt="restaurant"
          className="rounded-xl w-full h-[170px] object-cover"
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
            cloudinaryImageId
          }
        />
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded-md">
          {sla?.deliveryTime} mins
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="mt-3 px-1">
        <h3 className="font-bold text-lg text-gray-800 truncate">{name}</h3>
        <p className="text-gray-500 text-sm truncate">{cuisines?.slice(0, 3).join(", ")}</p>

        <div className="flex items-center justify-between mt-2">
          <span
            className={`text-sm font-semibold px-2 py-1 rounded-md ${
              avgRating >= 4
                ? "bg-green-100 text-green-700"
                : avgRating >= 3
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            ⭐ {avgRating}
          </span>
          <span className="text-gray-700 font-medium text-sm">{costForTwo}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
