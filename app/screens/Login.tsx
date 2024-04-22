import { StackNavigationProp } from "@react-navigation/stack";
import React from "react"
import {
    SafeAreaView,
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert
} from "react-native";

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        backgroundColor: '#543343',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c0c0c040',
        width: '100%',
        padding: 16,
    },
    textInput: {
        color: 'black',
        borderBottomWidth: 1,
        borderRadius: 8,
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 12,
        width: '80%',
        margin: 8,
    },
});

type RootStackParamList = {
    Home: undefined;
    Login: undefined;
}

type LogInProps = {
    navigation: StackNavigationProp <RootStackParamList, 'Home'>;
};

function Login({navigation}: LogInProps): React.JSX.Element {
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');

    const btnIngresaronPress = function () {
        if (user && password) {
            Alert.alert('Entraste', 'Iniciando sesión...');
            navigation.navigate('Home');
            return
        }
        Alert.alert('Fallido', 'Datos incorrectos');
    };
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.container}>
                <Text>Ingrese su usuario</Text>
                <TextInput style={styles.textInput}
                    placeholder="Usuario"
                    placeholderTextColor={'#828894'}
                    onChangeText={u => setUser(u)}
                />
                <TextInput style={styles.textInput}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    placeholderTextColor={'#828894'}
                    onChangeText={p => setPassword(p)}
                />
                <Button title="Ingresar" onPress={btnIngresaronPress} />
            </View>
        </SafeAreaView>
    );
}
export default Login;