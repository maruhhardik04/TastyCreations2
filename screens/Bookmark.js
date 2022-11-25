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
   
    <SafeAreaView style={{ flex: 1,paddingTop:50,paddingBottom:20}}>
      { (bookMarks.length != 0) ? 
      <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 80}}
      data={receipes}
      renderItem={({item}) => <CartCard item={item} />}
    />
    :
          
            <>
            <Text style={styles.headerText}>No BookMarks </Text>
            <Image style={{width:300,height:300,borderRadius:20}}  source={require("../assets/bookmark.png")}/>
            </>
          
      }
   
      
   </SafeAreaView>

    
  )
}

export default Bookmark

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   headerText: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//  fontWeight: 'bold'
//   }
// });

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
