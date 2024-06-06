import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import LocalDB from "../persistance/localdb";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { Product } from "../model/Product";
import WebServiceParams from '../WebServiceParams';

type HomeScreenProps = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRoute = RouteProp<RootStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenProps;
  route: HomeScreenRoute;
};

const Home: React.FC<HomeProps> = ({ navigation, route }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      LocalDB.init();
      const db = await LocalDB.connect();
      db.transaction(async tx => {
        tx.executeSql(
          'SELECT * FROM productos',
          [],
          (_, res) => {
            let prods: Product[] = [];
            for (let i = 0; i < res.rows.length; i++) {
              prods.push(res.rows.item(i) as Product);
            }
            setProducts(prods);
          },
          error => console.error({ error }),
        );
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchFromAPI = async () => {
    try {
      const response = await fetch(
        `http://${WebServiceParams.host}:${WebServiceParams.port}/productos`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      setProducts(await response.json());
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      fetchFromAPI();
    }, [])
  );

  return (
    <SafeAreaView>
      <FlatList 
        data={products} 
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.productItem} 
            onPress={() => navigation.push("ProductDetails", { product: item })}
          >
            <Text style={styles.itemTitle}>{item.nombre}</Text>
            <Text style={styles.itemDetails}>Precio: ${item.precio.toFixed(2)}</Text>
            <Text style={[styles.itemBadge, item.currentStock < item.minStock ? styles.itemBadgeError : null]}>
              {item.currentStock}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  productItem: {
    padding: 12,
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
  },
  itemBadge: {
    fontSize: 24,
    color: 'green',
    alignSelf: 'flex-end'
  },
  itemBadgeError: {
    color: 'red',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
