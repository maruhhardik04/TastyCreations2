import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import { TextInput,Button as MaterialButton } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../components/context';

import AntDesign from 'react-native-vector-icons/AntDesign';



const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setnameError] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [nameErrorMsg,setNameErrorMsg]=useState('');
  const [emailErrorMsg,setEmailErrorMsg]=useState('');
  const [passwordErrorMsg,setPasswordErrorMsg]=useState('');



  const {isLoading, register,userInfo} = useContext(AuthContext);


  const checkTextInput = () => {

   

    //Check for the Name TextInput
    if (!name.trim()) {
       setnameError(true)
       setNameErrorMsg('Username can not be empty');
      return;
    }
    else if(name.length < 5 || name.length > 20)
    {
      setnameError(true)
      setNameErrorMsg('Username must have minimum:5 and maximum:20 characters');
      return; 
    }
    else
    { 
      setnameError(false)
    }




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
    register(name, email, password)
    if(userInfo.id != null)
    {
      navigation.navigate('Login')
    }
  };


  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
   

        <TextInput
          label="Username"
          mode='outlined'
          error={nameError}
          style={{marginTop:'5%'}}
          value={name}
          placeholder="Enter Username"
          onChangeText={text => setName(text)}
          activeOutlineColor='tomato'
          dense={true}
        />
        {(nameError)?( <Text style={{color:'red'}}><AntDesign name={'exclamationcircle'} size={15} color={'red'}  />{nameErrorMsg}</Text>):(<></>)}
        
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
        <MaterialButton
          mode="contained"
          style={{marginTop:'5%'}}
          color='tomato'
          onPress={checkTextInput}
        >Register</MaterialButton>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Already have an accoutn? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
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
    color: 'tomato',
  },
});

export default RegisterScreen;
