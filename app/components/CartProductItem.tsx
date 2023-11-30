import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import Text from '@component/Text';
import {CartItem} from '@api/types';
import ProgressFastImage from '@component/ProgressFastImage';
interface Props {
  index: number;
  item: CartItem;
  handleAddToCart: () => void;
  handleRemoveProductFromCart: () => void;
}
const CartProductItem = ({
  item,
  handleAddToCart,
  handleRemoveProductFromCart,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={handleRemoveProductFromCart}
      style={styles.itemcontainer}
      activeOpacity={0.7}>
      <ProgressFastImage
        source={{uri: item.imageUrl}}
        imageStyle={styles.radiusImage}
        resizeMode="cover"
        style={styles.imageDimensions}
      />
      <View style={styles.content}>
        <Text variant="mediumchat18" color="black">
          {item.title}
        </Text>
        <Text variant="mediumchat14" color="gray" mt="sm">
          ${item.price}
        </Text>
      </View>
      <View style={styles.inputSpiner}>
        <Text variant="mediumchat14" color="gray" mt="sm">
          ${item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CartProductItem);
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
    flex: 2,
  },
  inputSpiner: {
    marginLeft: 20,
    flex: 1,
  },
});
