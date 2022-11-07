import 'react-native-gesture-handler';

import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {  Text,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
import Ionicons from 'react-native-vector-icons/Ionicons';

import  Home  from './screens/Home'
import Category from './screens/Category';  
import Receipes from './screens/Receipes';



const fullScreenWidth = Dimensions.get('window').width;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const  App = () => {
  return (
    <NavigationContainer>
    {/* <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator> */}
       <Tab.Navigator
        
        screenOptions={({ route }) => ({
          headerTitleAlign:'center',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Category') {
              iconName = focused ? 'list-circle' : 'list-circle-outline';
            } else if (route.name === 'Receipes') {
              iconName = focused ? 'fast-food' : 'fast-food-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Category" component={Category} />
        <Tab.Screen name="Receipes" component={Receipes} />
      </Tab.Navigator>
  </NavigationContainer>
  );
}

export default App
