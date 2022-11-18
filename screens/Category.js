import { View, Text,SafeAreaView,ScrollView,FlatList,StyleSheet,Image,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
// import CategoryItem from '../components/CategoryItem';




const Category = ({navigation,route}) => {

  const [isLoading, setLoading] = useState(true);
  const [categories,setCategories] = useState([]);
  
  const getCategories = async () => {
    try {
     const response = await fetch('http://10.1.50.13:8000/category/');
     const json = await response.json();

     setCategories(json);

   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
  
 }


  useEffect(()=>{
    getCategories();
    },[]);
     

    
const CategoryItem = ({ item  }) => {
  return (
    <TouchableOpacity underlayColor="rgba(73,182,77,0.9)"  onPress={()=>{
      navigation.navigate('CategoryReceipesScreen',{items:item.items});
   }}>
      <View style={styles.categoriesItemContainer}>
      <Image  style={styles.categoriesPhoto} source={{uri:'http://10.1.50.13:8000/static/'+item.image}}/>
      <Text style={styles.categoriesName}>{item.name}</Text>
      <Text style={styles.categoriesInfo}>{item.items.length} recipes</Text>
      </View>
    </TouchableOpacity> 
  )
}


  return (
    <SafeAreaView >
        <FlatList
        data={categories}
        renderItem={CategoryItem}
        keyExtractor={item => item.id}
        >
        </FlatList>
    
    


    </SafeAreaView>
  )
}

export default Category


const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 215,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  categoriesPhoto: {
    width: '100%',
    height: 155,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3
  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 8,
  },
  categoriesInfo: {
    marginTop: 3,
    marginBottom: 5
  },
 
});
