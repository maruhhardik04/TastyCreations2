import 'react-native-gesture-handler';
import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {  Text,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import  Home  from './screens/Home'
import Category from './screens/Category';  
import Receipes from './screens/Receipes';
import Bookmarks from './screens/Bookmark';
import ReceipesDetails from './screens/ReceipesDetails';
import Navigation from './screens/Navigation';
import {AuthProvider} from './components/context';






const  App = () => {
 


  


  return (
    <AuthProvider>
        <Navigation />
    </AuthProvider>
    
  
  );
}

export default App
