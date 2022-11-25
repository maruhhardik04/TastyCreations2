import { StyleSheet,Button } from 'react-native'
import React, {useContext} from 'react';

//Navigation components

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';


//import screens


import Home from './Home';
import Category from './Category';  
import Receipes from './Receipes';
import Bookmark from './Bookmark';
import ReceipesDetails from './ReceipesDetails';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import SplashScreen from './SplashScreen';
import Demo from './BackUp/Demo'
import {AuthContext} from '../components/context';

import {  Text,Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
    >
       <Stack.Screen name="BookmarksScreen" component={Bookmark} />
      <Stack.Screen name="ReceipesDetails" component={ReceipesDetails} />
    </Stack.Navigator>
)}

const SplashStackScreen = () => {
  return(
    <Stack.Navigator>
    <Stack.Screen
    name="Splash Screen"
    component={SplashScreen}
    options={{headerShown: false}}
  />
    </Stack.Navigator>
)
}

const AuthStack = () => {
  return(
  <Stack.Navigator>
    <Stack.Screen
     name="Login"
      component={LoginScreen}
      options={{headerShown: false}}
  />
  <Stack.Screen
    name="Register"
    component={RegisterScreen}
    options={{headerShown: false}}
  />
  </Stack.Navigator>
  )
}



const Tab = createBottomTabNavigator();



const Navigation = ({navigation, route}) => {
  
  const { userInfo,splashLoading,bookMarks,logout} = useContext(AuthContext);  

  return(

        <NavigationContainer>
          
        {
          splashLoading ? (<SplashStackScreen /> ) 
          :  
          userInfo.access_token ? (
            <Tab.Navigator
          
            screenOptions={({ route }) => ({
    
              headerTitleAlign:'center',
              tabBarShowLabel:false,
              tabBarStyle:[{
                
               display:"flex",
               postion:'absolute',
               bottom:25,
               left:20,
               right:20,
               elevation:0,
               backgroundColor:'#ffffff',
               borderRadius:15,
               height:60,
               width:(fullScreenWidth-40),
       
               ...styles.shadow
              }],
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
              tabBarLabelPosition:'below-icon'
              
            })}
          >
            {/* <Tab.Screen name="Home" component={Demo} /> */}
            <Tab.Screen name="Home" component={CategoryStackScreen} 
               
                options={{
                  headerShown: false, 
                }}
            
            />
            <Tab.Screen name="Receipes" component={ReceipesStackScreen} 
             
            options={{
              headerShown: false, 
            }}
          
            
            />
            <Tab.Screen name="Bookmarks" component={BookmarksStackScreen}   
            
            options={{ 
              
              headerShown: false,
              tabBarBadge: bookMarks.length
               }}/>
            
          </Tab.Navigator>
          ):(
            <>
            <AuthStack />
            </>
          )
        }


       

    
   </NavigationContainer>
    )
}

export default Navigation


const styles = StyleSheet.create({
  shadow:{
    shadowColor:'#7F5DF0',
    shadowOffset:{
        width:0,
        height:10
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5,
  }
})