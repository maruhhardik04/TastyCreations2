import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView
} from 'react-native';

import { TextInput,Button as MaterialButton } from 'react-native-paper';

import Spinner from 'react-native-loading-spinner-overlay';
// import {AuthContext} from '../context/AuthContext';
import {AuthContext} from '../components/context'

import AntDesign from 'react-native-vector-icons/AntDesign';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setemailError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [emailErrorMsg,setEmailErrorMsg]=useState('');
  const [passwordErrorMsg,setPasswordErrorMsg]=useState('');


  const {isLoading, login,apiError,apiErrorMsg} = useContext(AuthContext);


  const checkTextInput = () => {


    //Check for the Email TextInput

    let reg = /\S+@\S+\.\S+/;

    if (!email.trim()) {
      setemailError(true)
      setEmailErrorMsg('Email can not be empty');
      return;
    }
    else if(reg.test(email) === false)
    {
      setemailError(true)
      setEmailErrorMsg('Email is not correct');
      return;
    }
    else
    { 
      setemailError(false)
    }


    if (!password.trim()) {
      setpasswordError(true)
      setPasswordErrorMsg('Password can not be empty')
      return;
    }
    else if(password.length < 3 || password.length > 20)
    {
      setpasswordError(true)
      setPasswordErrorMsg('Password  must have minimum:8 and maximum:20 characters')
      return;
    }
    else
    {
      setpasswordError(false)
    }

    //Checked Successfully
    //Do whatever you want
    login(email, password)
   
  };

  const windowWidth = Dimensions.get('window').width;


  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={isLoading} />
    
    <Text style={styles.headerText}>Login</Text>
    <Image style={{width:windowWidth-20,height:300,borderRadius:20,resizeMode:'contain'}}  source={require("../assets/bookmark.png")}/>
     
      <View style={styles.wrapper}>
        <TextInput
          label="Email"
          mode='outlined'
          style={{marginTop:'5%'}}
          error={emailError}
          value={email}
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
          activeOutlineColor='tomato'
          dense={true}
        />
         {(emailError)?( <Text style={{color:'red'}}><AntDesign name={'exclamationcircle'} size={15} color={'red'}  />{emailErrorMsg}</Text>):(<></>)}


        <TextInput
          label="Password"
          mode='outlined'
          style={{marginTop:'5%'}}
          error={passwordError}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
          activeOutlineColor='tomato'
          dense={true}
        />
         {(passwordError)?( <Text style={{color:'red'}}><AntDesign name={'exclamationcircle'} size={15} color={'red'}  />{passwordErrorMsg}</Text>):(<></>)}

         {(apiError)?( <Text style={{color:'red'}}><AntDesign name={'exclamationcircle'} size={15} color={'red'}  />{apiErrorMsg}</Text>):(<></>)}


        <MaterialButton
          mode="contained"
          style={{marginTop:'5%'}}
          color='tomato'
          onPress={checkTextInput}
        >
          Login
        </MaterialButton>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'tomato',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
   fontWeight: 'bold',
   color: 'tomato'
  }
});

export default LoginScreen;
