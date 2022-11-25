import React,{useEffect} from 'react';
import {ActivityIndicator, View,Image} from 'react-native';

const SplashScreen = () => {

  useEffect(()=>{
    const timer = setTimeout(() => {
      setCount('Timeout called!');
    }, 5000);
    return () => clearTimeout(timer);
  },[]);

  return (
    <View
      style={{flex: 1, justifyContent: 'center',alignItems:'center', backgroundColor: '#fff'}}>
      {/* <ActivityIndicator size="large" color="#ffffff" /> */}
      <Image style={{width:300,height:300,borderRadius:20}} source={require("../assets/image.png")}/>     
    </View>
  );
};

export default SplashScreen;
