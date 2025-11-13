
import React from "react";
const Shimmer = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {Array(15)
        .fill("")
        .map((_, index) => (
          <div
            key={index}
            className="w-[270px] bg-white rounded-2xl shadow-sm animate-pulse"
          >
            {/* Image placeholder */}
            <div className="h-[170px] w-full bg-gray-200 rounded-xl"></div>

            {/* Info placeholder */}
            <div className="mt-3 px-3 space-y-2">
              {/* Restaurant Name */}
              <div className="h-5 w-3/4 bg-gray-200 rounded-md"></div>

              {/* Cuisines */}
              <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>

              {/* Rating & Cost */}
              <div className="flex justify-between items-center mt-2">
                <div className="h-5 w-16 bg-gray-200 rounded-md"></div>
                <div className="h-5 w-12 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
