import React, { useState,useEffect,useContext } from 'react'
import {SafeAreaView, StyleSheet, View, Text, Image,TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Receipes = ({navigation,route}) => {

  const [isLoading, setLoading] = useState(true);
  const [receipes,setReceipes] = useState([]);

  
  const getReceipes = async () => {
    try {
     const response = await fetch('http://10.1.50.13:8000/item/');
     console.log(response);
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
  


  const CartCard = ({item}) => {
    return (
      <TouchableOpacity  
      underlayColor={'white'}
      activeOpacity={0.9}
      style={style.cartCard}
      onPress={()=>{
        navigation.navigate('ReceipesDetails',{id:item.id});
     }}
      
      >
        <Image source={{uri:'http://10.1.50.13:8000/static/'+item.image}} style={{height: 80, width: 80,borderRadius:40}} />
        <View
          style={{
            paddingTop:30,
            height: 100,
            marginLeft: 10,
            paddingVertical: 20,
            flex: 1,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1,paddingTop:50,paddingBottom:20}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={receipes}
        renderItem={({item}) => <CartCard item={item} />}
      />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionBtn: {
    width: 80,
    height: 30,
    backgroundColor: 'tomato',
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default Receipes;
