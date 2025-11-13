// import { createSlice } from "@reduxjs/toolkit";
// import ItemList from "../components/ItemList";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//   },
//   reducers: {
//     addItem: (state, action) => {
//       // mutating the state here
//       state.items.push(action.payload);
//     },
//     removeItem: (state) => {
//       state.items.pop();
//     },
//     clearCart: (state) => {
//       //RTK- either Mutate the existing state or return a new State
//       state.items.length = 0;   // originalState =[] or
      
//       // return {items : []}; // this new object will be replaced inside originalState = { items : []}

//     },
//   },
// })

// export const { addItem, removeItem, clearCart } = cartSlice.actions;

// export default cartSlice.reducer


import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const itemId = newItem.card.info.id;
      
      // Find existing item
      const existingItem = state.items.find(item => item.id === itemId);
      
      if (existingItem) {
        // Increase quantity
        existingItem.quantity += 1;
      } else {
        // Add new item
        state.items.push({
          id: itemId,
          name: newItem.card.info.name,
          price: newItem.card.info.price || newItem.card.info.defaultPrice,
          imageId: newItem.card.info.imageId,
          quantity: 1
        });
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find(item => item.id === itemId);
      
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== itemId);
        }
      }
    },
    clearCart: (state) => {
      state.items.length = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;