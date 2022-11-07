import React from 'react';
import { View, Text,TouchableOpacity,Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const CategoryItem = ({ imageUrl,title,items  }) => {
  return (
    <TouchableOpacity style={{ padding: 10 }}  onPress={() => }>
      <Image style={{width:150,height:150,borderRadius:10}} source={{uri:imageUrl}}/>
      <Text style={{textAlign:'center'}}>{title}</Text>
    </TouchableOpacity> 
  )
}

export default CategoryItem
