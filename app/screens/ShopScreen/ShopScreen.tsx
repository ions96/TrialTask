import React, {useState, useCallback, useMemo} from 'react';
import Container from '@component/Container';
import {CompositeBottomTabScreenProps} from '@navigation/types';
import {useTranslation} from 'react-i18next';
import {FlatList, RefreshControl} from 'react-native';
import ActivityIndicator from '@component/ActivityIndicator';
import Box from '@component/Box';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useInfiniteQuery} from '@tanstack/react-query';
import Text from '@component/Text';
import {getProducts} from '@api/endpoints';
import {Product} from '@api/types';
import {AxiosError} from 'axios';
import useCart from '@hooks/useCartActions';
import ProductItem from '@component/ProductItem';
type Props = CompositeBottomTabScreenProps<'Shop'>;
const ITEMS_PER_PAGE = 3;
export default function ProfileScreen({}: Props) {
  const inserts = useSafeAreaInsets();
  const {addProductToCart, getCartItems} = useCart();
  const cartItems = getCartItems();
  const {t} = useTranslation();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery<any, AxiosError, any>(
    ['products-paginated'],
    ({pageParam = 1}) => {
      return getProducts({
        params: {
          limit: ITEMS_PER_PAGE,
          offset: ((pageParam ?? 1) - 1) * ITEMS_PER_PAGE,
        },
      }).then(r => r.data);
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.length === ITEMS_PER_PAGE) {
          return pages.length + 1;
        }
        return;
      },
    },
  );

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    refetch({refetchPage: (page, index) => index === 0}).finally(() => {
      setIsRefreshing(false);
    });
  }, [refetch]);

  const loadMoreData = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const flatListData = useMemo(() => {
    return data?.pages.map(page => page).flat() || [];
  }, [data]);

  const handleAddToCart = useCallback(
    (product: Product) => {
      addProductToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        imageUrl: product.images[0],
        quantity: 1,
      });
    },
    [addProductToCart],
  );
  const renderItem = useCallback(
    ({item, index}: {item: Product; index: number}) => {
      const isInCart = cartItems.some(cartItem => cartItem.id === item.id);
      return (
        <Box paddingHorizontal="md" mt="md">
          <ProductItem
            index={index}
            isInCart={isInCart}
            item={item}
            handleAddToCart={() => handleAddToCart(item)}
          />
        </Box>
      );
    },
    [handleAddToCart, cartItems],
  );
  const renderListFooterComponent = useCallback(() => {
    return (
      <>
        <Box height={inserts.bottom + 100} />
      </>
    );
  }, [inserts.bottom]);
  const renderListEmptyComponent = useCallback(() => {
    if (isLoading) {
      return (
        <Box flex={1} justifyContent="center" marginTop="lg">
          <ActivityIndicator size="small" />
        </Box>
      );
    }
    if (error) {
      return (
        <Box marginTop="lg" alignItems="center">
          <Text>{error.message}</Text>
        </Box>
      );
    }
    return (
      <Box flex={1} justifyContent="center" alignItems="center" marginTop="md">
        <Text>{t('t_app_list_empty')}</Text>
      </Box>
    );
  }, [error, isLoading, t]);
  return (
    <Container flex={1} backgroundColor="background">
      <FlatList
        data={flatListData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListFooterComponent={renderListFooterComponent}
        ListEmptyComponent={renderListEmptyComponent}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </Container>
  );
}
const keyExtractor = (_: any, index: number) => {
  return index.toString();
};
