Eatzo – Food Ordering Web App (React + Redux + Tailwind)

Eatzo is a beautifully designed, fully responsive food delivery web application inspired by Swiggy/Zomato.
It includes restaurant listing, menu pages, cart system, checkout flow, authentication, and a seamless animated UI.

🚀 Live Features
🏠 Home Page

Displays restaurants with name, cuisines, rating, delivery time, cost, and image.

Search restaurants directly from navbar.

“⭐ Top Rated Restaurants” filter.

Fully responsive restaurant grid.

🍽️ Restaurant Menu

Each restaurant page displays:

Restaurant info (ratings, cuisines, delivery time, price).

Menu categories with accordion-style expand/collapse.

Smooth Framer Motion animations.

Safe rendering (no crashes even if API data missing).

🛒 Cart + Checkout

Add items to cart

Increase / decrease quantity

Clear cart

Auto-calculated:

Subtotal

Delivery Charges

Platform Fee

GST

Grand Total

💳 Payment Flow

Card number auto-formatting (XXXX XXXX XXXX XXXX)

Expiry date formatting (MM/YY)

CVV validation

Delivery address form

Animated “Processing Payment” loader

Success screen showing:

Order ID

Delivery estimate

Bill summary

Delivery address

🔐 Authentication

User Signup

Login (JWT based)

Stores token + username in localStorage

Header updates dynamically based on logged-in user

Logout anywhere

📱 100% Fully Responsive

Responsive navbar with mobile mode

Responsive menu items & cards

Responsive cart and payment screen

🔗 API Integration

Uses Live Swiggy Data through a CORS Proxy:

https://corsproxy.io/?<swiggy-endpoint>

🛠️ Tech Stack
Tech	Usage
React.js	UI components
React Router	Navigation
Redux Toolkit	Cart management
Tailwind CSS	Styling
Framer Motion	Animations
Express.js + Node.js (optional)	Login/Signup backend
LocalStorage	User session
Fetch API	API calls
📁 Project Structure
/src
 ┣ components/
 ┃ ┣ Header.jsx
 ┃ ┣ Body.jsx
 ┃ ┣ RestaurantCard.jsx
 ┃ ┣ RestaurantMenu.jsx
 ┃ ┣ RestaurantCategory.jsx
 ┃ ┣ ItemList.jsx
 ┃ ┣ Login.jsx
 ┃ ┣ Signup.jsx
 ┃ ┗ Cart.jsx
 ┣ utils/
 ┃ ┣ useRestaurantaMenu.js
 ┃ ┣ appStore.js
 ┃ ┣ cartSlice.js
 ┃ ┣ constants.js
 ┃ ┣ useOnlineStatus.js
 ┃ ┗ UserContext.js
 ┣ appRouter.js
 ┗ App.jsx
