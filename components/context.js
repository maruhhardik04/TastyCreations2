import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../src/config';



 const AuthContext = createContext();

 const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [apiError,setApiError]=useState(false);
  const [apiErrorMsg,setApiErrorMsg]=useState('');
  const [bookMarks,setbookMarks]=useState([])

    const findBookMarks  = async() => {
      const result = await AsyncStorage.getItem('bookMarks');
      if (result !== null) setNotes(JSON.parse(result)); 
    }

    const removeBookMarks = async(id) =>
    {
        const result = await AsyncStorage.getItem('bookMarks');
        if(result !== null) 
        {
            
        }
    }

  const register = (name, email, password) => {
    setIsLoading(true);

   
    
    const form = new FormData();
    form.append("username",name);
    form.append("email",email);
    form.append("password",password)




  fetch(`${BASE_URL}/create-user`, {
    method: 'POST',
    body: form
  }).then((response) => response.json())
  .then((result) => {
   
    let userInfo = result;
    setUserInfo(userInfo);
    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    setIsLoading(false);
    console.log(userInfo);
    
  })
  .catch((e) => {
    console.log(`register error ${e}`);
    setIsLoading(false);
  });

  };

  const login = (email, password) => {
    setIsLoading(true);

    const form = new FormData();
    form.append("username",email);
    form.append("password",password)

      
    fetch(`${BASE_URL}/login`, {
      method: 'POST',
      body: form
    }).then((response) => response.json())
    .then((result) => {

        if(result.detail != undefined)
        {
          setApiError(true);
          setApiErrorMsg(result.detail)
        }
        else
        {
          setApiError(false);
        }
    
     

      let userInfo = result;
      console.log(userInfo);
      setUserInfo(userInfo);
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
      setIsLoading(false)
    })
    .catch((e) => {
      console.log(`login error ${e}`);
  
      setIsLoading(false);
    });
  };


  const feedback = (r_id,u_id,review,rating) => {
    setIsLoading(true);

    
    const form = new FormData();
    form.append("r_id",r_id);
    form.append("u_id",u_id)
    form.append("description",review)
    form.append("rating",rating)
    

    
    fetch(`${BASE_URL}/create-feedback`, {
      method: 'POST',
      headers:{
        'Authorization':`Bearer ${userInfo.access_token}`
      },
      body: form
    })
    .then((response) => response.json())
    .then((result) => {
      setIsLoading(false)
      console.log(result);})
      .catch((e) =>{console.log(`register error ${e}`);
      setIsLoading(false)
    });
   


  }

  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {Authorization: `Bearer ${userInfo.access_token}`},
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };




  useEffect(() => {
    isLoggedIn();
    findBookMarks();
  }, []);

 

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
        feedback,
        apiError,
        apiErrorMsg,
        bookMarks,
        setbookMarks,
        findBookMarks,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext,AuthProvider};


