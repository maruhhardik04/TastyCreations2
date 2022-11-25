import React,{useState,useEffect,useContext} from 'react';
import {SafeAreaView, StyleSheet, View, Text, 
    Image,
    ScrollView,
    Dimensions,
    useWindowDimensions,ImageBackground,
    ActivityIndicator
}
     from 'react-native';
import RenderHtml from 'react-native-render-html'
import {AuthContext} from '../components/context'
import Icon from 'react-native-vector-icons/MaterialIcons';
import FeedBack from '../components/FeedBack';
import { TextInput,Button as MaterialButton, ToggleButton  } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Ionicons from 'react-native-vector-icons/Ionicons';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ReceipesDetails = ({navigation, route}) => {

    const {userInfo,feedback,removeBookMarks,updatedBookMarks,bookMarks} = useContext(AuthContext);
    const [status, setStatus] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [receipeDetails,setReceipeDetails] = useState({});
    const [receipeFeedbacks,setReceipeFeedbacks] = useState([]);
    const [review, setReview] = useState('');
    const [reviewError, setreviewError] = useState(false);
    const[canReview,setCanReview]=useState(true);
    const [rating,setRating]=useState(2);
 


    
    const onButtonToggle = () => {
     
        if(status === 'checked')
        {
          removeBookMarks(receipeDetails.id)
          setStatus('unchecked')
        } 
        else
        {    
          updatedBookMarks(receipeDetails);
          setStatus('checked')
        }
      };
  
     
  
  
      const getReceipeDetails = async () => {
        try {
         const response = await fetch(`http://10.1.50.13:8000/item/${route.params.id}?u_id=${userInfo.user_id}`);
         const json = await response.json();
        
         setReceipeDetails(json.item_data);
         setReceipeFeedbacks(json.feedbacks);
         setCanReview(json.can_rev);
       
         const isStatus =  bookMarks.some(item => item.id === json.item_data.id); 
          // console.log(isStatus);
         if(isStatus){
          setStatus('checked')
          } 
         else
        {
        setStatus('unchecked')
        } 
  
      } catch (error) {
         console.error(error);
       } finally {
         setLoading(false);
       } 
      }
    
   
      
      const checkTextInput = () => {
  
        if (!review.trim()) {
          setreviewError(true)
          return;
        }
        else
        { 
          setreviewError(false)
        }
        
          
        feedback(route.params.id,userInfo.user_id,review,rating);
        getReceipeDetails();
        setCanReview(false)
      };
  
      
      
      
      useEffect(()=>{
        getReceipeDetails();
     
      },[review]);
      
   
   
  
         
    const { width } = useWindowDimensions();

    if(isLoading)
    {
      return(
        <View style={[style.container, style.horizontal]}>
        <ActivityIndicator size="large" color={'tomato'}/>
        </View>
      )
    }

  return (
    <SafeAreaView style={{backgroundColor: '#FFF',paddingTop:50,paddingBottom:20}} >
    
    <ScrollView showsVerticalScrollIndicator={false}>
    <Icon name="arrow-back" size={28}  style={{marginStart:20}}  onPress={()=>{ navigation.goBack();}}/>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 280,
        }}>
     
        <Image source={{uri:'http://10.1.50.13:8000/static/'+receipeDetails.image}} style={{height: 220, width: 220,borderRadius:105}} />
       </View>
      <View style={style.details}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{fontSize: 25, fontWeight: 'bold', color: '#fff'}}>
            Dosa
          </Text>
          <View style={style.iconContainer}>
          <ToggleButton
            icon="bookmark"
            status={status}
            color={ (status === 'checked') ? 'black' : 'white'}
            onPress={onButtonToggle}
            size={40}
            />
          </View>
        </View>
        <Text
            style={{fontSize: 25, fontWeight: 'bold', color: '#fff'}}>
            Instruction
          </Text>
        <RenderHtml
              contentWidth={width}
              source={{html:""+receipeDetails.instruction}}
        />
         <Text
            style={{fontSize: 25, fontWeight: 'bold', color: '#fff'}}>
            Ingredients
          </Text>
          <RenderHtml
              contentWidth={width}
              source={{html:""+receipeDetails.ingredients}}
        />
      </View>
      <View style={style.feedback}>
      <Text
            style={{marginStart:20,fontSize: 25, fontWeight: 'bold', color: 'tomato'}}>
            Feedback
          </Text>
      {(canReview)?
      (
        
      <View style={{flex: 1,alignItems: 'center', justifyContent: 'center',}} >


               
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
            onChangeText={text => setReview(text)}
            placeholder="Enter Review or Suggestion"
            activeOutlineColor='tomato'
            dense={true}
          
           
          />  
           <MaterialButton
            mode="contained"
            style={{marginTop:'5%'}}
            color= {'tomato'}
            onPress={checkTextInput}
          >
            Submit
          </MaterialButton>
    
        </View> 
      </View>
):(<></>)
    }
    
   
   <View style={{  flex:1,padding:10  }} >
      
     {receipeFeedbacks.map(feedback => (
     <FeedBack   
     key={feedback.id}  
     username={feedback.username} 
     rating={feedback.rating} 
     description={feedback.description}/>))}
    </View>
    </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default ReceipesDetails



const style = StyleSheet.create({
    header: {
      paddingVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
    },
    details: {
      paddingHorizontal: 20,
      paddingTop: 40,
      paddingBottom: 60,
      backgroundColor: 'tomato',
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
    },
    feedback:{
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 60,
        bottom:45,
        backgroundColor: 'white',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
          
    },
    iconContainer: {
      height: 50,
      width: 50,
      borderRadius:25,
      overflow:'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
    },
    detailsText: {
      marginTop: 10,
      lineHeight: 22,
      fontSize: 16,
      color: 'fff',
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