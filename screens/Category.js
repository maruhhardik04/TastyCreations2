import React, {useContext,useState,useEffect} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../components/context';


const {width} = Dimensions.get('screen');
const cardWidth = width / 2 - 20;

const Category = ({navigation}) => {
 

  const [isLoading, setLoading] = useState(true);
  const [categories,setCategories] = useState([]);
  const screenHeight = Dimensions.get('window').height
  const screenwith = Dimensions.get('window').width
  const { userInfo,splashLoading,bookMarks,logout} = useContext(AuthContext);  


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
     

 
  const CategoryItem = ({item}) => {
    return (
      <TouchableOpacity
        underlayColor={'white'}
        activeOpacity={0.9}
        onPress={()=>{
          navigation.navigate('CategoryReceipesScreen',{items:item.items});
       }}>
        <View style={style.card}>
          <View style={{alignItems: 'center', top: -40}}>
            <Image source={{uri:'http://10.1.50.13:8000/static/'+item.image}} style={{height: 120, width: 120,borderRadius:60}} />
          </View>
          <View style={{marginHorizontal: 20,flexDirection: 'row',justifyContent: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
          </View>
          <View
            style={{
              marginTop: 10,
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'center'
             
            }}>
            <Text style={{fontSize: 20, fontWeight: 'bold',backgroundColor:'toamto'}}>
              {item.items.length}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff',paddingTop:30,paddingBottom:20}}>
      <View style={style.header}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 28}}>Hello,</Text>
            <Text style={{fontSize: 28, fontWeight: 'bold', marginLeft: 10}}>
              {userInfo.username}
            </Text>
          </View>
          <Text style={{marginTop: 5, fontSize: 22, color: '#908e8c'}}>
            What do you want today
          </Text>
        </View>
        <AntDesign 
                      color={'red'} 
                      name={'logout'} 
                      size={20} 
                      style={{paddingEnd:20}} 
                      onPress={logout}
                      />

      </View>
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
          />
        </View>
      
      </View>
      <FlatList

        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={categories}
        renderItem={CategoryItem}
        keyExtractor={item => item.id}
       >
        </FlatList>
     
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sortBtn: {
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: 'tomato',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 50,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: '#fff',
  },
  addToCartBtn: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Category;
