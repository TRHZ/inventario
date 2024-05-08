/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Platform } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { Product } from '../model/Product';

export type Params = {
  product: Product;
};

export type Props = {
  route: RouteProp<RootStackParamList, 'ProdutDetails'>;
  navigation: StackNavigationProp<RootStackParamList, 'ProdutDetails'>;
};

const ProductDetails: React.FC<Props> = ({ route }): React.ReactElement => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    setProduct(route.params.product);
  }, [route]);

  return (
    <SafeAreaView style={styles.container}>
      {product && (
        <View style={styles.productContainer}>
          <Text style={styles.productName}>{product.nombre}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Stock:</Text>
            <Text style={styles.value}>{product.currentStock}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>{product.precio}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0, // Ajuste para dispositivos Android
  },
  productContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    fontSize: 18,
  },
});

export default ProductDetails;