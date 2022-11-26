import React, { useState,useEffect,useContext } from 'react'
import {SafeAreaView, StyleSheet, View, Text, Image,TouchableOpacity,TextInput} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Receipes = ({navigation,route}) => {

  const [isLoading, setLoading] = useState(true);
  const [receipes,setReceipes] = useState([]);
  const [filterData,setFilterData]= useState([]);
  const [search,setSearch]=useState('');
  
  const getReceipes = async () => {
    try {
     const response = await fetch('http://10.1.50.13:8000/item/');
     console.log(response);
     const json = await response.json();
   
     if(route.params?.items == undefined)
     {
       setReceipes(json);
       setFilterData(json);
     }
     else{
      setReceipes(route.params?.items);
      setFilterData(route.params?.items);
     }
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }

 const searchFilter = (text) => {
  if(text)
  {
    const newData= receipes.filter((item)=>{

      const itemData = item.title 
                      ?item.title.toUpperCase()
                      : ''.toUpperCase();
                      
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;                 
    });
    setFilterData(newData);
    setSearch(text);
  }
  else
  {
      setFilterData(receipes);
      setSearch(text);
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
    
    <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          paddingHorizontal: 20,
        }}>
        <View style={style.inputContainer}>
          <Icon name="search" size={28} />
          <TextInput
            style={{flex: 1, fontSize: 18}}
            placeholder="Search for food"
            value={search}
            onChangeText={(text) => searchFilter(text)}
          />
        </View>
      
      </View>
    
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
        data={filterData}
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
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    paddingHorizontal: 20,
  }
});

export default Receipes;

