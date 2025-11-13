
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ShoppingCart,
  LogIn,
  LogOut,
  Search,
  Menu,
  X,
} from "lucide-react";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { CDN_URL } from "../utils/constants";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  
  const { loggedInUser, setUserName } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((store) => store.cart.items);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("username");
    if (token && name) {
      setIsLoggedIn(true);
      setUserName(name);
    }
  }, [setUserName]);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setUserName("");
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setMobileMenu(false);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={CDN_URL}
            alt="Eatzo Logo"
            className="w-10 h-10 object-contain rounded-full transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-2xl font-bold text-orange-500">
            Eatzo
          </span>
        </Link>

        {/* Desktop Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-1 shadow-inner focus-within:ring-2 focus-within:ring-orange-400 transition w-full md:w-96 mx-6"
        >
          <Search size={18} className="text-gray-500 mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search restaurants..."
            className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full ml-2 hover:bg-orange-600 transition"
          >
            Search
          </button>
        </form>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-7 text-gray-700 font-medium">

          <li>
            <Link to="/" className="hover:text-orange-500 transition">
              Home
            </Link>
          </li>

          <li>
            <Link to="/about" className="hover:text-orange-500 transition">
              About
            </Link>
          </li>

          <li>
            <Link to="/contact" className="hover:text-orange-500 transition">
              Contact
            </Link>
          </li>

          <li>
            <Link to="/grocery" className="hover:text-orange-500 transition">
              Grocery
            </Link>
          </li>

          {/* Cart */}
          <li>
            <Link
              to="/cart"
              className="flex items-center gap-2 font-semibold text-orange-500 hover:text-orange-600 transition"
            >
              <div className="relative">
                <ShoppingCart size={22} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-1.5">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </Link>
          </li>

          {/* Auth */}
          <li>
            <button
              onClick={handleAuthClick}
              className="flex items-center gap-2 bg-orange-500 text-white px-4 py-1.5 rounded-full hover:bg-orange-600 shadow-sm transition"
            >
              {isLoggedIn ? (
                <>
                  <LogOut size={18} /> Logout
                </>
              ) : (
                <>
                  <LogIn size={18} /> Login
                </>
              )}
            </button>
          </li>

          {/* Username */}
          {isLoggedIn && (
            <li className="text-sm text-green-600 font-medium">
              {loggedInUser}
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden block text-gray-700"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div
          className="md:hidden bg-white border-t px-4 py-4 space-y-5 animate-slide-down"
        >
          {/* Search Bar Mobile */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-100 rounded-full px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-orange-400 transition"
          >
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search restaurants..."
              className="bg-transparent flex-1 outline-none text-gray-700 placeholder-gray-400"
            />
          </form>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col space-y-4 text-lg text-gray-700">
            <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
            <Link to="/about" onClick={() => setMobileMenu(false)}>About</Link>
            <Link to="/contact" onClick={() => setMobileMenu(false)}>Contact</Link>
            <Link to="/grocery" onClick={() => setMobileMenu(false)}>Grocery</Link>

            {/* Cart */}
            <Link
              to="/cart"
              onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 text-orange-500 font-semibold"
            >
              <ShoppingCart />
              Cart ({cartItems.length})
            </Link>

            {/* Auth */}
            <button
              onClick={handleAuthClick}
              className="flex items-center gap-3 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600"
            >
              {isLoggedIn ? <LogOut /> : <LogIn />}
              {isLoggedIn ? "Logout" : "Login"}
            </button>

            {/* Username */}
            {isLoggedIn && (
              <p className="text-sm text-green-600 font-medium">
                Logged in as: {loggedInUser}
              </p>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
