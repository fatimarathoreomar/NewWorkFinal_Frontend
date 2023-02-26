import React from 'react';
import {  useRef,useState } from 'react';
import { View,Dimensions, Text, StyleSheet,Image, TouchableOpacity,LayoutAnimation,Alert,ImageSourcePropType,TextInput,TextInputProps,  UIManager,} from 'react-native';
import { NativeBaseProvider,Input, Button, Icon, Box, useStyledSystemPropsResolver, Center} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
//import AsyncStorage from 'react-native';
//import { storeData, retrieveData } from "../utils/AsyncStorage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storeData,getData} from '../components/Atoms/MyLocalStore'
type LoginScreenProps = {};

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;
  
  


const Login = () => {
    const navigation = useNavigation();
   
   const [fdata,setFdata] = useState({
    email: '',
    password:'',
   })
  const [errormsg, setErrormsg] = useState(null);
   



    
    //Login button handler
    function LoginButtonHandler(){
       
        console.log("Inside login button handler");
        const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
        if (fdata.password == '' || fdata.email == ''){
            setErrormsg('All fields are required');
            return;

        }
        else if(!fdata.email.match(re)){
            setErrormsg('email syntax not correct');
            return;
        }
        else{
            Sendtobackend();
        }
       

    }

    const Sendtobackend = () => {

        console.log(fdata);
           fetch('http://192.168.1.98:3000/login',{
               method : 'POST',
               headers : {
                   'Content-Type':'application/json'
               },
               body: JSON.stringify(fdata)

           }).then(res => res.json()).then(
            async data => {
                console.log(data);
                if (data.error) {
                    setErrormsg(data.error);
                }
                else if (data.message=='Login Successful'){
                    //dispatchEvent(setUser(fdata));
                    alert('Login Sucessful');
                    console.log(data);
                    storeData('logindata', JSON.stringify(data));
                //     console.log("async user data")
                //     AsyncStorage.getItem('user')
                //     .then((value) => {
                //      const data = JSON.parse(value);
                //    console.log('async user data', data);
                //      })
                //   .catch((error) => {
                //     console.log(error);
                //   });
                   const path="login";
                   if(data.user.type==1){
                       
                       
                       navigation.navigate("FreelancerProfile",{path:path});}
                   else{
                
                      navigation.navigate("RecruiterProfile",{path : path});
                   }
                }
            })
            .catch(err =>{
                alert(err)
            })


    }
    
    function EmailInputHandler(enteredText){
        setEmail(enteredText);
    }
    function PasswordInputHandler(enteredText){
        setPassword(enteredText);
    }

    

    return (
        <KeyboardAwareScrollView>
          <View >
         
         <View style={styles.Middle} >
             <Image   style={styles.img} alt='some value' source={require('../assets/images/logo.png')} />
             <Text style={styles.cname}>WorkNow</Text>
         </View>
        
         <View style={styles.buttonStyle}>
            <View style={styles.emailInput}>
                <Input
                      onChangeText={(text) => setFdata({...fdata,email:text.trim().toLowerCase()})}
                      returnKeyType="next"
                      onPressIn={() => setErrormsg(null)}
                    InputLeftElement={
                        <Icon
                             as={<FontAwesome5 name="user-secret"/>}
                             size="sm"
                             m={2}
                             _light={{
                             color:'black',
                            }}
                             _dark={{
                             color:"gray.300"
                            }}
                        />
                
                    }
                    
                     variant = "outline"
                     placeholder = "Input Email"
                     _light={{
                     placeholderTextColor: "blueGray.400"
                    }}
                     _dark={{
                     placeholderTextColor: "blueGray.50"
                     }}
               />
             </View>
         </View>

         
         <View style={styles.buttonStyleX}>
             <View style={styles.emailInput}>
                 <Input
                    secureTextEntry={true}
                    onChangeText={(text) => setFdata({...fdata,password:text})}
                    returnKeyType="next"
                    onPressIn={() => setErrormsg(null)}
                    InputLeftElement={
                         <Icon
                             as={<FontAwesome5 name="key"/>}
                             size="sm"
                             m={2}
                             _light={{
                                 color:"black"
                            }}
                            _dark={{
                                color:"gray.300"
                            }}
                         />
                     }
                     variant = "outline"
                     placeholder="Input password"
                     _light={{
                         placeholderTextColor:"blueGray.400"
                     }}
                     _dark={{
                                color:"blueGray.50"
                            }}

                 />

             </View>
         </View>

         <View style={styles.forgotpassword}>
          
          <TouchableOpacity onPress={()=> navigation.navigate("VerifyEmail")}>
              <Text style={styles.signupText}> Forgot password?</Text>
          </TouchableOpacity>
        </View> 
          
        <View style={styles.Middle}>
            <TouchableOpacity
             style={styles.LoginButton}
             onPress={LoginButtonHandler}
            
            >
               <Text style={styles.loginHereText}>LOGIN</Text>
             </TouchableOpacity>

         </View> 

         
        
         <View style={styles.text2}>
          <Text>New to WorkNow?</Text>
          <TouchableOpacity onPress={()=> navigation.navigate("Signup")}>
              <Text style={styles.signupText}> Sign up</Text>
          </TouchableOpacity>
        </View> 

        {
            errormsg ? <Text style={styles.error}>{errormsg}</Text>:null
        }
      
     {/* </LinearGradient>  */}
    </View> 
    </KeyboardAwareScrollView>
    )
}

export default ()=> {
    return (
        <NativeBaseProvider>
            <Login/>
        </NativeBaseProvider>
    )

}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    img:{
        marginTop:100,
        borderRadius: Math.round(100 / 2),
    },
    cname: {
        color: '#1779ba',
        fontSize: 55,
        fontWeight:'bold',
        // fontFamily: 'UbuntuLight',
        textAlign: 'center',
      },
      forgotpassword: {
        paddingTop:5,
        //alignItems:'right',
        marginLeft:260,
        marginBottom:5,
        color:"gray",
       
      },
    LoginText:{
        
        marginTop:100,
        fontSize:30,
        fontWeight:'bold',

    },
    Middle:{
        alignItems:'center',
        justifyContent:'center',

    },
    text2:{
        flexDirection:'row',
        justifyContent:'center',
        paddingTop:5,

    },
    signupText:{
        color: '#1779ba',
        fontWeight:'bold',
    },
    emailInput:{
        marginTop:10,
        marginRight:5,

    },
    buttonStyle:{
        marginTop:30,
        marginLeft:15,
        marginRight:15,
        
    },
   
    buttonStyleX:{
        marginTop:12,
        marginLeft:15,
        marginRight:15,
    },
    LoginButton: {
        backgroundColor: '#1779ba',
        marginTop:20,
        marginBottom:20,
        width: 250,
        borderRadius: Math.round(45 / 2),
        height: 45,
    },
    buttonDesign:{
        backgroundColor:'#026efd',
    },
    lineStyle:{
        flexDirection:'row',
        marginTop:30,
        marginLeft:15,
        marginRight:15,
        alignItems:'center',

    },
    loginHereContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      alreadyAccountText: {
        fontSize: 12,
        color: 'white',
      },
      loginHereText: {
        color: '#FFFFFF',
        fontWeight:'bold',
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 10,
      },
    boxStyle:{
        flexDirection:'row',
        marginTop:30,
        marginLeft:15,
        marginRight:15,
        justifyContent:'space-around'


    },
    error:{
      color: "red",
      textAlign: 'center',
      fontSize: 15,
      paddingTop: 15,
      
    },
    

    
})
