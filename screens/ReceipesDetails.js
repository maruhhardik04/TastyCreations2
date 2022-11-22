import { ActivityIndicator,StyleSheet, Text, View,SafeAreaView,Dimensions,Image,ScrollView,useWindowDimensions,ImageBackground  } from 'react-native'
import React, { useState,useEffect,useContext } from 'react'
import RenderHtml from 'react-native-render-html'
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import FeedBack from '../components/FeedBack';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { TextInput,Button as MaterialButton, ToggleButton  } from 'react-native-paper';
import {AuthContext} from '../components/context'
import {BASE_URL} from '../src/config';
import AsyncStorage from '@react-native-async-storage/async-storage';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const ReceipesDetails = ({navigation,route}) => {

  const {userInfo,feedback,removeBookMarks,updatedBookMarks} = useContext(AuthContext);
  
    const [isLoading, setLoading] = useState(true);
    const [receipeDetails,setReceipeDetails] = useState({});
    const [receipeFeedbacks,setReceipeFeedbacks] = useState([]);
    const [review, setReview] = useState('');
    const [reviewError, setreviewError] = useState(false);
    const[canReview,setCanReview]=useState(true);
    const [rating,setRating]=useState(2);
    const [status, setStatus] = useState('unchecked');
    

  

    const onButtonToggle = () => {

      
      setStatus(status === 'checked' ? 'unchecked' : 'checked');



      if(status === 'checked')
      {
         updatedBookMarks(receipeDetails);
      } 
      
      if(status === 'unchecked')
      {
        removeBookMarks(receipeDetails.id)
      }

    };


    const getReceipeDetails = async () => {
      try {
       const response = await fetch(`http://10.1.50.13:8000/item/${route.params.id}?u_id=${userInfo.user_id}`);
       const json = await response.json();
    
       setReceipeDetails(json.item_data);
       setReceipeFeedbacks(json.feedbacks);
       setCanReview(json.can_rev);
        // console.log(json.feedbacks);
        // console.log(receipeDetails);
    } catch (error) {
       console.error(error);
     } finally {
       setLoading(false);
     } 
    }
  
    
    
    const checkTextInput = () => {


      //Check for the Email TextInput
     
     
  
      if (!review.trim()) {
        setreviewError(true)
        return;
      }
      else
      { 
        setreviewError(false)
      }
      
   
      
      feedback(route.params.id,userInfo.user_id,review,rating);
      setCanReview(false)
      getReceipeDetails()
    };


   
    useEffect(()=>{
      getReceipeDetails();

    },[]);
    
       
  const { width } = useWindowDimensions();




  // Setting up tab View 
  const FirstRoute = () => (
    <ScrollView>
    <View style={{ padding:10  }} >
      <RenderHtml
              contentWidth={width}
              source={{html:""+receipeDetails.instruction}}
            />
    
      </View>
      </ScrollView>
  );
  
  const SecondRoute = () => (
    <ScrollView>
    <View style={{ padding:10  }} >
      
       <RenderHtml
              contentWidth={width}
              source={{html:""+receipeDetails.ingredients}}
            />
           
    </View>
    </ScrollView>
  );


  const ThirdRoute = () => (
   <ScrollView>
    {(canReview)?
      (<View style={{flex: 1,alignItems: 'center', justifyContent: 'center',}}>
      <View style={{width: '80%',marginTop:'5%'}}>
      
      <AirbnbRating
          defaultRating={1} 	 
          count={5}
          size={30}
          reviewSize={25}
          onFinishRating={(rating)=>setRating(rating)}
          reviewColor={'#000000'}
          selectedColor={'tomato'} 
          isDisabled={false}
      />  
       

         <TextInput
            label="Review"
             mode='outlined'
            style={{marginTop:'10%'}}
            error={reviewError}
            value={review}
            placeholder="Enter Review or Suggestion"
            onChangeText={text => setReview(text)}
            activeOutlineColor='tomato'
            dense={true}
            multiline={true}
           
          />  
           <MaterialButton
            mode="contained"
            style={{marginTop:'5%'}}
            color= {(status)}
            onPress={checkTextInput}
          >
            Submit
          </MaterialButton>
  
      </View>
      </View>):(<></>)
    }
    
   
   <View style={{  flex:1,padding:10  }} >
      
     {receipeFeedbacks.map(feedback => (
     <FeedBack   
     key={feedback.id}  
     username={feedback.username} 
     rating={feedback.rating} 
     description={feedback.description}/>))}
      
    </View>
    </ScrollView> 
  );


  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Instruction' },
    { key: 'second', title: 'Ingredients' },
    { key:'third',  title:'Reviews'}
  ]);


  
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});


  if(isLoading)
  {
    return(
      <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
       

    
    <View style={{width:windowWidth,height:'100%'}} >
      
      <View>

          <ImageBackground style={styles.categoriesPhoto}  source={{uri:'http://10.1.50.13:8000/static/'+receipeDetails.image}}>
          <View style={{flex:1,alignItems:'flex-end',marginTop:'5%',marginEnd:'3%'}}>
          <ToggleButton
            icon="bookmark"
            status={status}
            color={status === 'checked' ? 'tomato' : 'white'}
            onPress={onButtonToggle}
            size={40}
            />
          </View >
           <Text style={{color:'white'}} onPress={()=>{ navigation.goBack();}}>{receipeDetails.title}</Text>
          </ImageBackground>
          
      </View>
    <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: width }}
              renderTabBar={props => <TabBar {...props} style={{backgroundColor: 'tomato'}}/>}
        />
        
      </View>
  )
}



const styles = StyleSheet.create({

  categoriesPhoto: {
    width: windowWidth,
    height: 200,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 3
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
 
});


export default ReceipesDetails

