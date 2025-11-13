

import React, { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantaMenu from "../utils/useRestaurantaMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantaMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantaMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (resInfo === null) return <Shimmer />;

  // ✅ safe destructuring with fallback {}
  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards?.[2]?.card?.card?.info || {};

  const { itemCards } =
    resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card || {};

  console.log(resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

  const categories = resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c) =>
      c.card?.["card"]?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  //console.log(categories);
    
  
  return (
    
    <div className="text-center">
      <h1 className="font-bold m-6 text-2xl">{name }</h1>
      <p className="font-bold text-lg">
        {cuisines?.join(", ")} - {costForTwoMessage }
      </p>
      {/* categories accordions */}
      {
        categories.map((category, index) => (
          // controlled componenets
          <RestaurantCategory key={category?.card?.card.title} data={category?.card?.card}
            showItems={index === showIndex? true : false}
            setShowIndex={ ()=> setShowIndex(index)}         
          />
        ) )
      }
      
      

      
    </div>
  );
};

export default RestaurantaMenu;

