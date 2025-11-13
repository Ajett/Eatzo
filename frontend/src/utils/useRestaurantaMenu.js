import { useEffect, useState } from "react"
import { MENU_API } from "./constants";
const useRestaurantaMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    setResInfo(json.data);
  };

  return resInfo;
}

export default useRestaurantaMenu;


useRestaurantaMenu.js

import { useEffect, useState } from "react"
import { MENU_API } from "./constants"; // Make sure constants.js is in the correct directory

const useRestaurantaMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Use the relative path defined in MENU_API
      const data = await fetch(MENU_API + resId); 
      
      // Check for non-network errors first
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      const json = await data.json();
      setResInfo(json.data);
    } catch (error) {
      // Log the error for debugging
      console.error("Failed to fetch restaurant menu:", error); 
    }
  };

  return resInfo;
}

export default useRestaurantaMenu;


// import { useEffect, useState } from "react";

// const useRestaurantaMenu = (resId) => {
//   const [resInfo, setResInfo] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (resId) {
//       fetchMenu();
//     }
//   }, [resId]); // 🔥 important: refetch when restaurant changes

//   const fetchMenu = async () => {
//     try {
//       const url =
//         `/dapi/menu/pl?` +
//         new URLSearchParams({
//           "page-type": "REGULAR_MENU",
//           "complete-menu": "true",
//           lat: 28.7041,
//           lng: 77.1025,
//           restaurantId: resId,
//         });

//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const json = await response.json();

//       setResInfo(json?.data || null);
//     } catch (error) {
//       console.error("Failed to fetch restaurant menu:", error);
//     }

//     setLoading(false);
//   };

//   return { resInfo, loading };
// };

// export default useRestaurantaMenu;


