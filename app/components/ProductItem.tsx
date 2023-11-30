import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '@component/Text';
import {Product} from '@api/types';
import {useTranslation} from 'react-i18next';
import ProgressFastImage from '@component/ProgressFastImage';
import PrimaryButton from './PrimaryButton';
interface Props {
  index: number;
  item: Product;
  isInCart: boolean;
  handleAddToCart: () => void;
}
const ProductItem = ({item, handleAddToCart, isInCart}: Props) => {
  const {t} = useTranslation();
  return (
    <View style={styles.itemcontainer}>
      <ProgressFastImage
        source={{uri: item.images[0]}}
        imageStyle={styles.radiusImage}
        resizeMode="cover"
        style={styles.imageDimensions}
      />
      <View style={styles.content}>
        <Text variant="mediumchat18" color="black">
          {item.title}
        </Text>
        <Text variant="mediumchat12" color="gray" mt="sm">
          {item.description}
        </Text>
        <View style={styles.addCart}>
          <Text variant="mediumchat14" color="black" mt="sm">
            ${item.price}
          </Text>
          <PrimaryButton
            onPress={handleAddToCart}
            style={isInCart ? styles.inactiveb : null}
            title={isInCart ? t('t_app_addedToCart') : t('t_app_addToCart')}
            disabled={isInCart}
          />
        </View>
      </View>
    </View>
  );
};

export default React.memo(ProductItem);
const styles = StyleSheet.create({
  itemcontainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.10)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageDimensions: {
    width: 100,
    height: 100,
  },
  radiusImage: {
    borderRadius: 10,
  },
  content: {
    marginLeft: 20,
    flex: 1,
  },
  addCart: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  inactiveb: {
    opacity: 0.5,
  },
});
