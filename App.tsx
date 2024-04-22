import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, } from '@react-navigation/stack';
import React from 'react';
import Home from './app/screens/Home';
import Login from './app/screens/Login';

const Stack = createStackNavigator();

function App(): React.JSX.Element {

  return <NavigationContainer>
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false, headerStyle: { backgroundColor: '#ff0040' },
        }}
      />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </NavigationContainer>;
}


export default App;
