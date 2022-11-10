import React from 'react';
import { View, Text,TouchableOpacity,Image,Dimensions  } from 'react-native'

const windowWidth = Dimensions.get('window').width;

const ReceipeItem = ({ item  }) => {
  return (
    <TouchableOpacity style={{ padding: 10 }}  onPress={() => console.log(item.id)}>
      <Image style={{width:windowWidth-20,height:150,borderRadius:20}} source={{uri:'http://10.1.50.13:8000/static/'+item.image}}/>
      <Text style={{textAlign:'center',color:'black'}}>{item.title}</Text>
    </TouchableOpacity> 
  )
}

export default ReceipeItem
