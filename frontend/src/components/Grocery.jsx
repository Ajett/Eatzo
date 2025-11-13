import React from "react";
const Grocery = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-orange-500 mb-4">
          🛒 Welcome to Eatzo Grocery
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Your one-stop shop for fresh fruits, vegetables, dairy products, and more.
          Explore our wide range of grocery items, all delivered right to your doorstep!
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
          {[
            { name: "Fruits", img: "https://cdn-icons-png.flaticon.com/512/415/415733.png" },
            { name: "Vegetables", img: "https://cdn-icons-png.flaticon.com/512/2909/2909765.png" },
            { name: "Dairy", img: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png" },
            { name: "Snacks", img: "https://cdn-icons-png.flaticon.com/512/1046/1046785.png" },
            { name: "Beverages", img: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png" },
            { name: "Bakery", img: "https://cdn-icons-png.flaticon.com/512/3081/3081902.png" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-orange-50 rounded-xl p-4 flex flex-col items-center hover:shadow-lg transition"
            >
              <img src={item.img} alt={item.name} className="w-16 h-16 mb-3" />
              <p className="text-gray-700 font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grocery;
