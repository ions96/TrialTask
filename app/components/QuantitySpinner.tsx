import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface QuantitySpinnerProps {
  quantity: number;
  handleAddToCart: () => void;
  handleRemoveProductFromCart: () => void;
}

const QuantitySpinner: React.FC<QuantitySpinnerProps> = ({
  quantity,
  handleAddToCart,
  handleRemoveProductFromCart,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleRemoveProductFromCart}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{quantity}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    borderRadius: 5,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  buttonText: {
    color: '#007AFF',
    fontFamily: 'SFProDisplay-Medium',
    fontSize: 14,
  },
});

export default QuantitySpinner;
