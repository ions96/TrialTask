import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CartItem {
  id: string | number;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}
interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const {id, title, price, imageUrl, quantity} = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === id);

      if (existingItemIndex !== -1) {
        // If item exists, update quantity
        state.items[existingItemIndex].quantity += quantity;
      } else {
        // If item doesn't exist, add to cart
        state.items.push({id, title, price, imageUrl, quantity});
      }
    },
    removeFromCart: (state, action: PayloadAction<string | number>) => {
      const targetItem = state.items.find(item => item.id === action.payload);

      if (targetItem) {
        if (targetItem.quantity > 1) {
          // Decrement quantity if greater than 1
          targetItem.quantity -= 1;
        } else {
          // Remove the item if the quantity is 1
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
    },
  },
});

export const {addToCart, removeFromCart} = cartSlice.actions;

export default cartSlice.reducer;
