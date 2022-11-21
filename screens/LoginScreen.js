import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
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
    else if(password.length < 8 || password.length > 20)
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


  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
        />
         {(emailError)?( <Text style={{color:'red'}}><AntDesign name={'exclamationcircle'} size={15} color={'red'}  />{emailErrorMsg}</Text>):(<></>)}


        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
         {(passwordError)?( <Text style={{color:'red'}}><AntDesign name={'exclamationcircle'} size={15} color={'red'}  />{passwordErrorMsg}</Text>):(<></>)}

         {(apiError)?( <Text style={{color:'red'}}><AntDesign name={'exclamationcircle'} size={15} color={'red'}  />{apiErrorMsg}</Text>):(<></>)}


        <Button
          title="Login"
          onPress={checkTextInput}
        />

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    color: 'blue',
  },
});

export default LoginScreen;
