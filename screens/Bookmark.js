import { View, Text,SafeAreaView,FlatList,Dimensions,TouchableOpacity,Image } from 'react-native';
import React, { useState,useEffect,useContext } from 'react'
import {AuthContext} from '../components/context'


const Bookmark = ({navigation,route}) => {

  const [receipes,setReceipes] = useState([]);
  const {bookMarks,findBookMarks} = useContext(AuthContext);

  
  const getReceipes =  () => {
    
      findBookMarks();
     
    if(bookMarks.length != 0 || bookMarks != null)
    {
          setReceipes(bookMarks);
    }
    
  }
   
  
 useEffect(()=>{
  getReceipes();
  },[findBookMarks]);

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
  
  
  const windowWidth = Dimensions.get('window').width;




  return (
   
    <SafeAreaView>
      { (bookMarks != null) ? <FlatList
        data={receipes}
        renderItem={ReceipeItem}
        keyExtractor={item => item.id}
        >
        </FlatList>:
          <>
            <Text>No Book Marks</Text>
          </>
      }
   
      
   </SafeAreaView>

    
  )
}

export default Bookmark