import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, Alert } from 'react-native';
import localDB from '../persistance/localdb'; // Importa el módulo para acceder a la base de datos

const ProductAdd: React.FC = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [minStock, setMinStock] = useState('');
    const [maxStock, setMaxStock] = useState('');

    const guardarProducto = async () => {
        if (!nombre || !precio || !minStock || !maxStock) {
            Alert.alert('Error', 'Por favor complete todos los campos');
            return;
        }

        try {
            const db = await localDB.connect();
            await db.executeSql(
                'INSERT INTO productos (nombre, precio, minStock, currentStock, maxStock) VALUES (?, ?, ?, 0, ?)',
                [nombre, parseFloat(precio), parseInt(minStock), parseInt(maxStock)]
            );
            Alert.alert('Éxito', 'Producto guardado exitosamente');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un error al guardar el producto');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre del producto"
                value={nombre}
                onChangeText={setNombre}
                placeholderTextColor="rgba(0, 0, 0, 0.5)" // Color negro con opacidad reducida
            />
            <TextInput
                style={styles.input}
                placeholder="Precio"
                value={precio}
                onChangeText={setPrecio}
                keyboardType="numeric"
                placeholderTextColor="rgba(0, 0, 0, 0.5)" // Color negro con opacidad reducida
            />
            <TextInput
                style={styles.input}
                placeholder="Stock mínimo"
                value={minStock}
                onChangeText={setMinStock}
                keyboardType="numeric"
                placeholderTextColor="rgba(0, 0, 0, 0.5)" // Color negro con opacidad reducida
            />
            <TextInput
                style={styles.input}
                placeholder="Stock máximo"
                value={maxStock}
                onChangeText={setMaxStock}
                keyboardType="numeric"
                placeholderTextColor="rgba(0, 0, 0, 0.5)" // Color negro con opacidad reducida
            />
            <Button title="Guardar" onPress={guardarProducto} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: 'black', // Establece el color del texto en negro
    },
});

export default ProductAdd;
