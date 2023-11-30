import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@store';
import {addToCart, removeFromCart} from '@store/cartproducts';

import {CartItem} from '@api/types';

const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const addProductToCart = (product: CartItem) => {
    dispatch(addToCart(product));
  };

  const removeProductFromCart = (productId: string | number) => {
    dispatch(removeFromCart(productId));
  };

  const getCartItems = () => {
    return cartItems;
  };
  const calculateCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  return {
    addProductToCart,
    removeProductFromCart,
    getCartItems,
    calculateCartTotal,
  };
};

export default useCart;
