import { RouterProp } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Button, SafeAreaView, StyleSheet, Text, Touchable, View } from "react-native";
import { Product } from '../../model/Product';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

type RootStackParamList = {
  Home: undefined;
};
type HomeScreenProps = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRoute = RouterProp<RootStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenProps;
  route: HomeScreenRoute;
};

function Home({ navigation }: HomeProps): React.JSX.Element {

  const [products, setProducts] = React.useState<Product[]>([]);
  const productItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productItem}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column', flexGrow: 9 }}>
          <Text style={styles.itemTitle} >{item.nombre}</Text>
          <Text style={styles.itemDetails}>
            Precio: ${item.precio.toFixed(2)}</Text>
        </View>
        <Text 
        style={[
          styles.itemBadge,
          item.currentStock < item.minStock ? styles.itemBadgeError : null,
        ]}>
          {item.currentStock}
        </Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    setProducts([
      { id: 1, nombre: 'Martillo', precio: 80, minStock: 5, currentStock: 2, maxStock: 20 },
      { id: 2, nombre: 'Manguera', precio: 15, minStock: 50, currentStock: 200, maxStock: 1000 },
    ])
  }, []);
  return (
    <SafeAreaView>
      <FlatList data={products} renderItem={productItem} keyExtractor={(item) => item.id.toString()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  productItem: {
    padding: 12,
    borderBottomColor: '#c0c0c0',
    borderBottomWidth: 1,
    backgroundColor: 'white'
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'uppercase'
  },
  itemDetails: {
    fontSize: 14,
    opacity: 0.8,
    color: 'black'
  },
  itemBadge: {
    fontSize: 24,
    color: '#204000',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  itemBadgeError: {
    color: 'red'
  },
});

export default Home;