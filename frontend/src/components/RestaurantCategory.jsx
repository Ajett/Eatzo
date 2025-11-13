
import React from "react";
import ItemList from "./ItemList";
import { motion, AnimatePresence } from "framer-motion";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div className="flex justify-center">
      <div
        className="w-full sm:w-8/12 md:w-6/12 my-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        {/* Header */}
        <div
          className="flex justify-between items-center cursor-pointer px-4 py-3 border-b border-gray-100 hover:bg-orange-50 rounded-t-xl"
          onClick={handleClick}
        >
          <span className="font-semibold text-gray-800 text-lg">
            {data.title}{" "}
            <span className="text-gray-500 text-sm">
              ({data.itemCards.length})
            </span>
          </span>
          <span
            className={`transition-transform duration-300 text-xl ${
              showItems ? "rotate-180 text-orange-500" : "text-gray-400"
            }`}
          >
            ⬇️
          </span>
        </div>

        {/* Items List (Animated Expand/Collapse) */}
        <AnimatePresence>
          {showItems && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <ItemList items={data.itemCards} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RestaurantCategory;
