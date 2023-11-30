import React, {useCallback} from 'react';
import Container from '@component/Container';
import {CompositeBottomTabScreenProps} from '@navigation/types';
import {FlatList} from 'react-native';
import {useTranslation} from 'react-i18next';
import Box from '@component/Box';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useCart from '@hooks/useCartActions';
import Text from '@component/Text';
import CartProductItem from '@component/CartProductItem';
import {CartItem} from '@api/types';
type Props = CompositeBottomTabScreenProps<'Cart'>;
export default function ProfileScreen({}: Props) {
  const inserts = useSafeAreaInsets();
  const {t} = useTranslation();
  const {getCartItems, addProductToCart, removeProductFromCart} = useCart();
  const cartItems = getCartItems();
  const handleAddToCart = useCallback(
    (product: CartItem) => {
      addProductToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      });
    },
    [addProductToCart],
  );
  const handleRemoveProductFromCart = useCallback(
    (product: CartItem) => {
      removeProductFromCart(product.id);
    },
    [removeProductFromCart],
  );
  const renderItem = useCallback(
    ({item, index}: {item: CartItem; index: number}) => {
      return (
        <Box paddingHorizontal="md" mt="md">
          <CartProductItem
            index={index}
            item={item}
            handleAddToCart={() => handleAddToCart(item)}
            handleRemoveProductFromCart={() =>
              handleRemoveProductFromCart(item)
            }
          />
        </Box>
      );
    },
    [handleAddToCart, handleRemoveProductFromCart],
  );

  const renderListEmptyComponent = useCallback(() => {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" marginTop="md">
        <Text>{t('t_app_list_empty')}</Text>
      </Box>
    );
  }, [t]);
  const renderListFooterComponent = useCallback(() => {
    return (
      <>
        <Box height={inserts.bottom + 100} />
      </>
    );
  }, [inserts.bottom]);

  return (
    <Container flex={1} backgroundColor="background">
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={renderListFooterComponent}
        ListEmptyComponent={renderListEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
const keyExtractor = (_: any, index: number) => {
  return index.toString();
};
