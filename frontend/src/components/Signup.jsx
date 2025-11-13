// import React,{ useState } from "react";
// import { useNavigate, Link } from "react-router-dom";


// const Signup = () => {
//   const [formData, setFormData] = useState({ username: "", email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`http://localhost:5000/api/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setMessage("Signup successful! Redirecting...");
//         setTimeout(() => navigate("/login"), 1000);
//       } else {
//         setMessage(data.message || "Signup failed");
//       }
//     } catch (err) {
//       setMessage("Error: " + err.message);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-lg w-96 space-y-4"
//       >
//         <h2 className="text-2xl font-bold text-center">Sign Up</h2>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           onChange={handleChange}
//           value={formData.username}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           value={formData.email}
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           value={formData.password}
//           className="w-full p-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//         >
//           Sign Up
//         </button>
//         {message && <p className="text-center text-sm mt-2">{message}</p>}
//         <p className="text-center text-sm">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-500">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Signup successful! Redirecting...");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="
          bg-white 
          w-full 
          max-w-md 
          px-8 
          py-10 
          rounded-2xl 
          shadow-lg 
          space-y-5 
          animate-fadeIn
        "
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Sign Up
        </h2>

        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
          className="
            w-full 
            p-3 
            border 
            rounded-lg 
            focus:ring-2 
            focus:ring-blue-400 
            outline-none 
            text-gray-700
          "
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="
            w-full 
            p-3 
            border 
            rounded-lg 
            focus:ring-2 
            focus:ring-blue-400 
            outline-none 
            text-gray-700
          "
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          className="
            w-full 
            p-3 
            border 
            rounded-lg 
            focus:ring-2 
            focus:ring-blue-400 
            outline-none 
            text-gray-700
          "
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="
            w-full 
            bg-blue-500 
            text-white 
            py-3 
            rounded-lg 
            text-lg 
            font-semibold 
            hover:bg-blue-600 
            transition
          "
        >
          Sign Up
        </button>

        {/* Message */}
        {message && (
          <p
            className={`text-center text-sm ${
              message.toLowerCase().includes("successful")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
