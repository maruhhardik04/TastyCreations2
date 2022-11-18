import { View, Text,SafeAreaView,FlatList,Dimensions,TouchableOpacity,Image } from 'react-native';
import React, { useEffect, useState } from 'react';





const Receipes = ({navigation,route}) => {

  const [isLoading, setLoading] = useState(true);
  const [receipes,setReceipes] = useState([]);

  
  const getReceipes = async () => {
    try {
      
     const response = await fetch('http://10.1.50.13:8000/item/');
    //  console.log(response);
     const json = await response.json();
     console.log(route);
     if(route.params?.items == undefined)
     {
       setReceipes(json);
     } 
     else{
      setReceipes(route.params?.items);
     }
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }

 
 useEffect(()=>{
  getReceipes();

  },[]);
  

  

const windowWidth = Dimensions.get('window').width;

const ReceipeItem = ({ item  }) => {


  return (
    <TouchableOpacity style={{ padding: 10 }}  onPress={()=>{
      navigation.navigate('ReceipesDetails',{id:item.id});
   }}>
      <Image style={{width:windowWidth-20,height:150,borderRadius:20}} source={{uri:'http://10.1.50.13:8000/static/'+item.image}}/>
      <Text style={{textAlign:'center',color:'black'}}>{item.title}</Text>
    </TouchableOpacity> 
  )
}


  return (
    <SafeAreaView>
     
     <FlatList
        data={receipes}
        renderItem={ReceipeItem}
        keyExtractor={item => item.id}
        >
        </FlatList>

    </SafeAreaView>
  )
}

export default Receipes