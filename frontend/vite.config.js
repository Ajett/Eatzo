// vite.config.js

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'; // You likely need this plugin for React!

export default defineConfig({
  plugins: [
    react(), // 👈 Add the React plugin if you are using React
    tailwindcss(),
  ],
  
  // 👇 Add the server configuration to set up the proxy
  server: {
    proxy: {
      // All requests starting with '/mapi' (like /mapi/menu/pl?...) 
      // will be intercepted and proxied to the target URL.
      '/mapi': {
        target: 'https://www.swiggy.com',
        changeOrigin: true, // IMPORTANT: Changes the 'Origin' header to the target URL
        secure: true,       // Use HTTPS for the target
      },
    },
  },
})



// // vite.config.js
// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],

//   server: {
//     proxy: {
//       // Swiggy actual working API (2025)
//       '/dapi': {
//         target: 'https://www.swiggy.com',
//         changeOrigin: true,
//         secure: true,
//       },
//     },
//   },
// });
