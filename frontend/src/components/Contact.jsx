import React from "react";
const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-50 px-4">
      <h1 className="text-3xl font-semibold text-orange-500 mb-4">
        Contact Us
      </h1>
      <p className="text-gray-600 max-w-md text-center mb-6">
        We'd love to hear from you! Whether you have a question about our app, feedback, or need help—just drop us a message below.
      </p>

      <form className="bg-white shadow-md rounded-xl p-6 w-full max-w-md space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Message</label>
          <textarea
            rows="4"
            placeholder="Write your message..."
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
