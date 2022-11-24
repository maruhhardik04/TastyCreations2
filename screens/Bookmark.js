import { View, Text,SafeAreaView,FlatList,Dimensions,TouchableOpacity,Image,StyleSheet } from 'react-native';
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

    
  const windowWidth = Dimensions.get('window').width;

  const ReceipeItem = ({ item  }) => {


    return (
      <TouchableOpacity style={{ padding: 10 }}  onPress={()=>{
        navigation.navigate('ReceipesDetails',{id:item.id});
     }}>
     
        <Image style={{width:windowWidth-20,height:150,borderRadius:20}} source={{uri:'http://10.1.50.13:8000/static/'+item.image}}/>
        <Text style={{textAlign:'center',color:'white',bottom:26,fontSize:20,backgroundColor:'rgba(52, 52, 52, 0.8)',borderBottomLeftRadius:20,borderBottomRightRadius:20}}>{item.title}</Text>
       
      </TouchableOpacity> 
    )
  }
  





  return (
   
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      { (bookMarks.length != 0) ? <FlatList
        data={receipes}
        renderItem={ReceipeItem}
        keyExtractor={item => item.id}
        >
        </FlatList>:
          
            <>
            <Text style={styles.headerText}>No BookMarks </Text>
            <Image style={{width:300,height:300,borderRadius:20}}  source={require("../assets/bookmark.png")}/>
            </>
          
      }
   
      
   </SafeAreaView>

    
  )
}

export default Bookmark

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
 fontWeight: 'bold'
  }
});