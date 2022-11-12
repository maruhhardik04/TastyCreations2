import { View, Text,SafeAreaView,ScrollView,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryItem from '../components/CategoryItem';




const Category = () => {

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
     


  return (
    <SafeAreaView >
     
     
    
        {/* {categories.map((category)=>(
          
              <CategoryItem
              key={category.id} 
              category={category}
              />
        ))} */}

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