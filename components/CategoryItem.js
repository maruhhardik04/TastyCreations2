import React from 'react';
import { View, Text,TouchableOpacity,Image,StyleSheet } from 'react-native'



const CategoryItem = ({ item  }) => {
  return (
    <TouchableOpacity underlayColor="rgba(73,182,77,0.9)"  onPress={() => console.log(item.id)}>
      <View style={styles.categoriesItemContainer}>
      <Image  style={styles.categoriesPhoto} source={{uri:'http://10.1.50.13:8000/static/'+item.image}}/>
      <Text style={styles.categoriesName}>{item.name}</Text>
      <Text style={styles.categoriesInfo}>{item.items.length} recipes</Text>
      </View>
    </TouchableOpacity> 
  )
}


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



export default CategoryItem
