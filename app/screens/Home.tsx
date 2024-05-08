import { RouterProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Product } from '../model/Product';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParamList } from '../../App';
import localDB from '../persistance/localdb';

type HomeScreenProps = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRoute = RouterProp<RootStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenProps;
  route: HomeScreenRoute;
};

function Home({ navigation }: HomeProps): React.JSX.Element {

  const [products, setProducts] = React.useState<Product[]>([]);
  const productItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.push('ProdutDetails', { product: item })}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column', flexGrow: 9 }}>
          <Text style={styles.itemTitle}>{item.nombre}
          </Text>
        </View>
        <Text style={styles.itemDetails}>Precio: ${item.precio.toFixed(2)}</Text>
      </View>
      <Text
        style={[styles.itemBadge, item.currentStock < item.minStock ? styles.itemBadgeError : null
        ]}>
        {item.currentStock}
      </Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    localDB.init();
    navigation.addListener('focus', async () => {
      const db = await localDB.connect();
      db.transaction(async tx => {
        tx.executeSql(
          'SELECT * FROM productos',
          [],
          ( _, res) => {
            let prods = [];
            for (let i = 0; i < res.rows.length; i++) {
              prods.push(res.rows.item(i));
            }
            setProducts(prods);
          },
          error => console.error({ error }),
        );
      });
    });
  }, []);

  return (
    <SafeAreaView>
      <FlatList data={products} renderItem={productItem} keyExtractor={(item) => item.id.toString()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemBadge: {
    fontSize: 24,
    color: 'black',
    alignSelf: 'flex-end',
  },
  itemBadgeError: {
    fontSize: 24,
    color: 'red',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  productItem: {
    padding: 12,
    borderBlockColor: '#c0c0c0',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  itemTitle: {
    fontSize: 24,
    color: '#000',
    textTransform: 'uppercase',
  },
  itemDetails: {
    fontSize: 14,
    opacity: 0.7,
    color: '#000',
  }
});
export default Home;