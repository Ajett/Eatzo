

import React,{ useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {MENU_API} from '../utils/constants'
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const searchText = query.get("search") || "";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.allorigins.win/raw?url=" +
          encodeURIComponent(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7041&lng=77.1025"
          )
      );
      // const response = await fetch(MENU_API);

      const json = await response.json();
      const restaurants =
        json?.data?.cards?.find(
          (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setListOfRestaurants(restaurants);
      setFilteredRestaurant(restaurants);
    } catch (error) {
      console.error("❌ Error fetching restaurant data:", error);
    }
  };

  // 🔍 Filter restaurants based on URL search text
  useEffect(() => {
    if (!searchText || searchText.trim() === "") {
      setFilteredRestaurant(listOfRestaurants);
    } else {
      const filtered = listOfRestaurants.filter(
        (res) =>
          res?.info?.name &&
          res.info.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredRestaurant(filtered);
    }
  }, [searchText, listOfRestaurants]);

  if (onlineStatus === false)
    return (
      <h1 className="text-center text-xl text-red-500 mt-20">
        ⚠️ Looks like you're offline! Please check your internet connection.
      </h1>
    );

  return (
    <div className="Body">
      {/* 🔸 Filter Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => {
            const topRated = listOfRestaurants.filter(
              (res) => parseFloat(res?.info?.avgRating) > 4
            );
            setFilteredRestaurant(topRated);
          }}
          className="px-5 py-2 bg-orange-100 text-orange-600 font-semibold rounded-full hover:bg-orange-200 transition"
        >
          ⭐ Top Rated Restaurants
        </button>
      </div>

      {/* 🔸 Restaurant Cards */}
      <div className="flex flex-wrap justify-center mt-6">
        {filteredRestaurant.length > 0 ? (
          filteredRestaurant.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurants/" + restaurant.info.id}
              className="m-4"
            >
              <RestaurantCard resData={restaurant.info} />
            </Link>
          ))
        ) : (
          <div className="mt-10">
            <Shimmer />
            <p className="text-center text-gray-500 mt-4">
              {listOfRestaurants.length === 0
                ? "Loading restaurants..."
                : "No results found 😕"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
