import { View, Text,SafeAreaView,FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import ReceipeItem from '../components/ReceipeItem';




const Receipes = () => {

  const [isLoading, setLoading] = useState(true);
  const [receipes,setReceipes] = useState([]);

  
  const getReceipes = async () => {
    try {
     const response = await fetch('http://10.1.50.13:8000/item/');
     console.log(response);
     const json = await response.json();
     console.log(json);
     setReceipes(json);
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }

 
 useEffect(()=>{
  getReceipes();
  },[]);
  
  return (
    <SafeAreaView>
     
     <FlatList
        data={receipes}
        renderItem={ReceipeItem}
        keyExtractor={item => item.id}>
        </FlatList>

    </SafeAreaView>
  )
}

export default Receipes