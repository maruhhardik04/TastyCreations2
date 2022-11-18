import { ActivityIndicator,StyleSheet, Text, View,SafeAreaView,Dimensions,Image,ScrollView,useWindowDimensions,ImageBackground  } from 'react-native'
import React, { useState,useEffect } from 'react'
import RenderHtml from 'react-native-render-html'
import HTML from 'react-native-render-html'
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import FeedBack from '../components/FeedBack';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const ReceipesDetails = ({navigation,route}) => {

    const [isLoading, setLoading] = useState(true);
    const [receipeDetails,setReceipeDetails] = useState({});
    const [receipeFeedbacks,setReceipeFeedbacks] = useState([]);


    const getReceipeDetails = async () => {
      try {
       const response = await fetch(`http://10.1.50.13:8000/item/${route.params.id}`);
       const json = await response.json();
    
       setReceipeDetails(json.item_data);
       setReceipeFeedbacks(json.feedbacks)
        // console.log(json.feedbacks);
        // console.log(receipeDetails);
    } catch (error) {
       console.error(error);
     } finally {
       setLoading(false);
     } 
    }
  

   
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
       
    
        
    <View style={{width:windowWidth,height:'100%'}}>
      <View>

          <ImageBackground style={styles.categoriesPhoto}  source={{uri:'http://10.1.50.13:8000/static/'+receipeDetails.image}}>
          
          <Text style={{color:'white'}} onPress={()=>{ navigation.goBack();}}>{receipeDetails.title}</Text>
          </ImageBackground>
          {/* <Image style={styles.categoriesPhoto}  source={{uri:'http://10.1.50.13:8000/static/'+receipeDetails.image}}/> */}
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

