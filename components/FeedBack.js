import { Text, View,StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Card, Title, Paragraph } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FeedBack = ({username,rating,description}) => {


    return (

      <View>



      <Card style={{marginTop:10}}>
         <Card.Content>
      <View style={{flex:1,flexDirection:'column',padding:10,alignItems:'center'}}>
      
        
        <View style={{flex:1,flexDirection:'row',padding:10,paddingBottom:0}}>
            <FontAwesome name={'user-circle'} size={20} color={'grey'} />
            <Text style={{marginStart:5,}}>{username}</Text>
        </View>
        <View style={{flex:1,flexDirection:'row',padding:10,paddingTop:0}}>
        <AirbnbRating 
        count={5}
        defaultRating={rating}
        isDisabled={true}
        size={20}
        reviewColor={'#000000'}
        selectedColor={'tomato'}
        />
        </View>
        <View style={{flex:1,flexDirection:'row',padding:10}}>
            <Text>{description}</Text>
        </View>
      </View>
      </Card.Content>
      </Card>
      </View>
      
      
      
    )
  
}

export default FeedBack;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#ecf0f1',
  },
 
});
