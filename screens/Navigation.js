import * as React from 'react';

//Navigation components

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';


//import screens


import Home from './Home';
import Category from './Category';  
import Receipes from './Receipes';
import Bookmarks from './Bookmark';
import ReceipesDetails from './ReceipesDetails';

import {  Text,Dimensions } from 'react-native';

const fullScreenWidth = Dimensions.get('window').width;
const Stack = createNativeStackNavigator();


const HomeStackScreen = () => {
    return(
     <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
     </Stack.Navigator>
)
}


const CategoryStackScreen = () => {
    return(
        <Stack.Navigator  screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="CategoryScreen" component={Category} />
        <Stack.Screen name="CategoryReceipesScreen" component={Receipes} />
       <Stack.Screen name="ReceipesDetails" component={ReceipesDetails} />
        </Stack.Navigator>
    )
}

const ReceipesStackScreen = () => {
    return(
    <Stack.Navigator   
    screenOptions={{
      headerShown: false
    }}
    >
       <Stack.Screen name="ReceipesScreen" component={Receipes} />
       <Stack.Screen name="ReceipesDetails" component={ReceipesDetails} />
    </Stack.Navigator>
    )
}

const BookmarksStackScreen = () => {
    return(
    <Stack.Navigator>
       <Stack.Screen name="Bookmarks" component={Bookmarks} />
    </Stack.Navigator>
)}


const Tab = createBottomTabNavigator();

const Navigation = ({navigation, route}) => {
    return(

        <NavigationContainer>
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
             else if (route.name === 'Bookmarks') {
               iconName = focused ? 'bookmark' : 'bookmark-outline';
               
             }
 
             // You can return any component that you like here!
             return <Ionicons name={iconName} size={size} color={color} />;
           },
           tabBarActiveTintColor: 'tomato',
           tabBarInactiveTintColor: 'gray',
           
         })}
       >
         <Tab.Screen name="Home" component={Home} />
         <Tab.Screen name="Category" component={CategoryStackScreen} />
         <Tab.Screen name="Receipes" component={ReceipesStackScreen} />
         <Tab.Screen name="Bookmarks" component={Bookmarks} />
         
       </Tab.Navigator>

    
   </NavigationContainer>
    )
}

export default Navigation