import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem, addItem } from "../utils/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: ""
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleAddItem = (item) => {
    if (item.originalItem) {
      dispatch(addItem(item.originalItem));
    } else if (item.card && item.card.info) {
      dispatch(addItem(item));
    } else {
      const originalItem = {
        card: {
          info: {
            id: item.id,
            name: item.name,
            price: item.price,
            defaultPrice: item.price,
            imageId: item.imageId
          }
        }
      };
      dispatch(addItem(originalItem));
    }
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleProceedToCheckout = () => {
    setShowPayment(true);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const handleBackToCart = () => {
    setShowPayment(false);
    setPaymentSuccess(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
    }
    return v;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentDetails(prev => ({
      ...prev,
      cardNumber: formatted
    }));
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setPaymentDetails(prev => ({
      ...prev,
      expiryDate: formatted
    }));
  };

  // Helper functions to handle both nested and flat item structures
  const getItemPrice = (item) => {
    const price = item.card?.info?.price ||
                  item.card?.info?.defaultPrice ||
                  item.price ||
                  item.defaultPrice ||
                  0;
    return price / 100;
  };

  const getItemName = (item) => {
    return item.card?.info?.name || item.name || "Unknown Item";
  };

  const getItemImage = (item) => {
    const imageId = item.card?.info?.imageId || item.imageId || item.image;
    if (imageId) {
      return `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${imageId}`;
    }
    return "https://via.placeholder.com/80";
  };

  const getItemId = (item) => {
    return item.card?.info?.id || item.id;
  };

  // Calculate individual item total amount
  const calculateItemAmount = (item) => {
    const price = getItemPrice(item);
    const quantity = item.quantity || 1;
    return price * quantity;
  };

  // Calculate subtotal (sum of all items)
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + calculateItemAmount(item);
    }, 0);
  };

  // Calculate delivery charges
  const calculateDeliveryCharges = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 500 ? 0 : 40;
  };

  // Calculate platform fee
  const calculatePlatformFee = () => {
    return 5;
  };

  // Calculate tax (5% GST on food items)
  const calculateTax = () => {
    return calculateSubtotal() * 0.05;
  };

  // Calculate grand total
  const calculateGrandTotal = () => {
    return calculateSubtotal() + calculateDeliveryCharges() + calculatePlatformFee() + calculateTax();
  };

  const validateForm = () => {
    const { cardNumber, expiryDate, cvv, name, email, address, city, zipCode } = paymentDetails;
    
    if (cardNumber.replace(/\s/g, '').length !== 16) return "Please enter a valid 16-digit card number";
    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) return "Please enter a valid expiry date (MM/YY)";
    if (cvv.length !== 3) return "Please enter a valid CVV";
    if (!name.trim()) return "Please enter cardholder name";
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return "Please enter a valid email";
    if (!address.trim()) return "Please enter delivery address";
    if (!city.trim()) return "Please enter city";
    if (!zipCode.trim()) return "Please enter ZIP code";
    
    return null;
  };

  const generateOrderId = () => {
    return `SWIGGY${Date.now()}${Math.floor(Math.random() * 1000)}`;
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    setIsProcessing(true);

    // Generate order ID
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);

    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      setPaymentSuccess(true);
      setTimeout(() => {
        dispatch(clearCart());
        setShowPayment(false);
        setIsProcessing(false);
        setPaymentDetails({
          cardNumber: "",
          expiryDate: "",
          cvv: "",
          name: "",
          email: "",
          address: "",
          city: "",
          zipCode: ""
        });
      }, 5000);
    } catch (error) {
      alert("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  // Cart Item Component with Amount Display
  const CartItem = ({ item }) => {
    const itemPrice = getItemPrice(item);
    const itemTotal = calculateItemAmount(item);
    const quantity = item.quantity || 1;
    const itemName = getItemName(item);
    const itemImage = getItemImage(item);
    const itemId = getItemId(item);

    return (
      <div className="flex items-center justify-between py-6 border-b border-gray-200">
        <div className="flex items-center space-x-4 flex-1">
          <img
            className="w-20 h-20 object-cover rounded-lg"
            src={itemImage}
            alt={itemName}
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 text-lg">{itemName}</h3>
            <p className="text-gray-600 text-sm mt-1">
              ₹{itemPrice.toFixed(2)} per item
            </p>
            
            {/* Quantity Controls */}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleRemoveItem(itemId)}
                  className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-lg hover:bg-orange-600 transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-medium text-gray-700 min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleAddItem(item)}
                  className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-lg hover:bg-orange-600 transition-colors"
                >
                  +
                </button>
              </div>
              <div className="text-sm text-gray-500">
                {quantity} × ₹{itemPrice.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
        
        {/* Item Total Amount */}
        <div className="text-right">
          <p className="text-xl font-bold text-orange-500">₹{itemTotal.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">Total</p>
        </div>
      </div>
    );
  };

  if (paymentSuccess) {
    const orderSummary = {
      subtotal: calculateSubtotal(),
      delivery: calculateDeliveryCharges(),
      platformFee: calculatePlatformFee(),
      tax: calculateTax(),
      grandTotal: calculateGrandTotal()
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center py-10 px-4">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          
          {/* Success Message */}
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Payment Successful! 🎉</h2>
          <p className="text-gray-600 mb-2">Thank you for your order!</p>
          <p className="text-gray-500 text-sm mb-6">We've sent a confirmation email to <strong>{paymentDetails.email}</strong></p>

          {/* Order ID */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-green-800">
              <span className="font-semibold">Order ID:</span>
              <span className="font-mono bg-green-100 px-3 py-1 rounded-lg">{orderId}</span>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-blue-800">
              <span>🚗 Estimated Delivery:</span>
              <span className="font-semibold">30-45 minutes</span>
            </div>
          </div>
          
          {/* Order Amount Summary */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6 text-left border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3 text-lg border-b pb-2">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Items Total:</span>
                <span>₹{orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee:</span>
                <span className={orderSummary.delivery === 0 ? 'text-green-600 font-semibold' : ''}>
                  {orderSummary.delivery === 0 ? 'FREE' : `₹${orderSummary.delivery.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Platform Fee:</span>
                <span>₹{orderSummary.platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST (5%):</span>
                <span>₹{orderSummary.tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg text-green-600">
                  <span>Grand Total:</span>
                  <span>₹{orderSummary.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-orange-700 mb-2">Delivery Address</h3>
            <p className="text-sm text-orange-800">
              {paymentDetails.address}, {paymentDetails.city} - {paymentDetails.zipCode}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleBackToHome}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition flex items-center justify-center space-x-2"
            >
              <span>🏠</span>
              <span>Back to Home</span>
            </button>
            <button
              onClick={handleBackToCart}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition flex items-center justify-center space-x-2"
            >
              <span>🛒</span>
              <span>View Cart</span>
            </button>
          </div>

          {/* Thank You Message */}
          <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              💫 Thank you for choosing us! Your food is being prepared with love.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (showPayment) {
    const orderSummary = {
      subtotal: calculateSubtotal(),
      delivery: calculateDeliveryCharges(),
      platformFee: calculatePlatformFee(),
      tax: calculateTax(),
      grandTotal: calculateGrandTotal()
    };

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-orange-500">Payment Details</h1>
            <button
              onClick={() => setShowPayment(false)}
              className="text-gray-500 hover:text-gray-700 flex items-center space-x-1"
            >
              <span>←</span>
              <span>Back to Cart</span>
            </button>
          </div>

          {/* Detailed Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Order Summary</h3>
            {cartItems.map(item => (
              <div key={getItemId(item)} className="flex justify-between items-center text-sm text-gray-600 mb-3 py-2">
                <div className="flex-1">
                  <span className="font-medium">{getItemName(item)}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    (₹{getItemPrice(item).toFixed(2)} × {item.quantity || 1})
                  </span>
                </div>
                <span className="font-semibold text-orange-500">₹{calculateItemAmount(item).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 space-y-1">
              <div className="flex justify-between text-gray-700">
                <span>Item Total:</span>
                <span>₹{orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Delivery Fee:</span>
                <span className={orderSummary.delivery === 0 ? 'text-green-600' : ''}>
                  {orderSummary.delivery === 0 ? 'FREE' : `₹${orderSummary.delivery.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Platform Fee:</span>
                <span>₹{orderSummary.platformFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>GST (5%):</span>
                <span>₹{orderSummary.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-orange-500 mt-2 pt-2 border-t">
                <span>Total Amount:</span>
                <span>₹{orderSummary.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentDetails.expiryDate}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                name="name"
                value={paymentDetails.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={paymentDetails.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Address
              </label>
              <input
                type="text"
                name="address"
                value={paymentDetails.address}
                onChange={handleInputChange}
                placeholder="123 Main Street"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={paymentDetails.city}
                  onChange={handleInputChange}
                  placeholder="Mumbai"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={paymentDetails.zipCode}
                  onChange={handleInputChange}
                  placeholder="400001"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-3 px-6 rounded-xl text-lg font-semibold shadow-md transition ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 text-white'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : `Pay ₹${calculateGrandTotal().toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const orderSummary = {
    subtotal: calculateSubtotal(),
    delivery: calculateDeliveryCharges(),
    platformFee: calculatePlatformFee(),
    tax: calculateTax(),
    grandTotal: calculateGrandTotal()
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-orange-500 text-center mb-6">
          🛍️ Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-10">
            <p>Your cart is empty 😔</p>
            <p className="mt-2">Add some delicious meals to your cart!</p>
            <button
              onClick={handleBackToHome}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">
                Items in Cart ({cartItems.reduce((total, item) => total + (item.quantity || 1), 0)})
              </h2>
              <button
                onClick={handleClearCart}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Clear Cart
              </button>
            </div>

            {/* Cart Items with Individual Amounts */}
            <div className="divide-y divide-gray-200 mb-6">
              {cartItems.map(item => (
                <CartItem key={getItemId(item)} item={item} />
              ))}
            </div>

            {/* Detailed Amount Breakdown */}
            <div className="mt-6 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Bill Details</h3>
              
              <div className="space-y-3">
                {/* Item Total */}
                <div className="flex justify-between text-gray-700">
                  <span>Item Total</span>
                  <span>₹{orderSummary.subtotal.toFixed(2)}</span>
                </div>

                {/* Delivery Fee */}
                <div className="flex justify-between text-gray-700">
                  <span>
                    Delivery Fee
                    {orderSummary.delivery === 0 && (
                      <span className="text-green-600 text-sm ml-2">• FREE delivery on orders above ₹500</span>
                    )}
                  </span>
                  <span className={orderSummary.delivery === 0 ? 'text-green-600' : ''}>
                    {orderSummary.delivery === 0 ? 'FREE' : `₹${orderSummary.delivery.toFixed(2)}`}
                  </span>
                </div>

                {/* Platform Fee */}
                <div className="flex justify-between text-gray-700">
                  <span>Platform Fee</span>
                  <span>₹{orderSummary.platformFee.toFixed(2)}</span>
                </div>

                {/* GST */}
                <div className="flex justify-between text-gray-700">
                  <span>GST (5%)</span>
                  <span>₹{orderSummary.tax.toFixed(2)}</span>
                </div>

                {/* Grand Total */}
                <div className="border-t pt-3 mt-2">
                  <div className="flex justify-between text-lg font-bold text-orange-500">
                    <span>Total Amount</span>
                    <span>₹{orderSummary.grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Savings Info */}
                {orderSummary.delivery > 0 && (
                  <div className="text-sm text-green-600 bg-green-50 p-2 rounded mt-2">
                    🎉 Add ₹{(500 - orderSummary.subtotal).toFixed(2)} more for FREE delivery!
                  </div>
                )}
              </div>
            </div>

            {/* Checkout Section */}
            <div className="mt-8 text-right">
              <button
                onClick={handleProceedToCheckout}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md transition flex items-center justify-center ml-auto"
              >
                Proceed to Pay ₹{orderSummary.grandTotal.toFixed(2)}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

