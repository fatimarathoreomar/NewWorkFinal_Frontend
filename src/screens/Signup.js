import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,LayoutAnimation } from 'react-native';
import {Input, NativeBaseProvider, Button, Icon, Box, Image, useStyledSystemPropsResolver, Center, KeyboardAvoidingView,keyboard} from 'native-base';
import { FontAwesome5 ,MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {  useRef,useState } from 'react';
import RadioButtonRN from 'radio-buttons-react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { getData, storeData } from '../components/Atoms/MyLocalStore';

import AsyncStorage from '@react-native-async-storage/async-storage';
const Signup = () => {
    const navigation = useNavigation();
    
  const handleUpdateUser = (fieldName, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [fieldName]: value,
    }));
  };

  // Update the freelancer atom
  const handleUpdateFreelancer = (fieldName, value) => {
    setFreelancer((prevFreelancer) => ({
      ...prevFreelancer,
      [fieldName]: value,
    }));
  };
  
    const data = [
        {
          label: 'Freelancer'
         },
         {
          label: 'Recruiter'
         }
        ];

    const [name,setName] = useState('');
    const [type,setType] = useState('');
    const [fdata,setFdata] = useState({
        username:'',
        first_name:'',
        last_name:'',
        email: '',
        password:'',
        confirmpassword:'',
        type:0,

       })
      
    const [errormsg, setErrormsg] = useState(null);
    
    const handleSignUp = () =>{
        
        console.log(name);
        var fname = name.split(' ').slice(0, -1).join(' ');
        var lname = name.split(' ').slice(-1).join(' ');
    
        fdata.first_name=fname;
        fdata.last_name=lname;
        console.log(type);
        if(type.label=="Recruiter"){
           fdata.type=2;
            
        }
        else if(type.label=="Freelancer"){
            fdata.type=1;
        }
        console.log(fdata);
        //if(fdata.type!=0){
            if( fdata.type==0||fdata.last_name=="" || fdata.password=="" || fdata.username=="" || fdata.email=="" || fdata.confirmpassword=="" ){
                   setErrormsg('All fields are required');
                   return;
            }
        //}
        var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(fdata.password.length<8){
            setErrormsg('password needs to be longer');
            return;
        }
        else if(fdata.password!=fdata.confirmpassword){
            setErrormsg('passwords do not match');
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
           fetch('http://192.168.1.98:3000/signup',{
            //fetch('http://10.0.0.21:3000/signup',{   
               method : 'POST',
               headers : {
                   'Content-Type':'application/json'
               },
               body: JSON.stringify(fdata)

           })
           .then(res => res.json()).then(
               data => {
                   //console.log(data);
                   if (data.error) {
                       setErrormsg(data.error);
                   }
                   else{
                       alert('Signup Sucessful,Now login ');
                       AsyncStorage.setItem('Profiledata', JSON.stringify(data))
                        if(fdata.type==1){
                           // navigation.navigate("FreelancerProfile",{data});}
                           console.log(data);
                       
                          
                          
                           navigation.navigate("AddSkills",{data});
                        }
                        else{
                            console.log(data);
                            navigation.navigate('Bioandcompany',{data});
                            //ADD Bio
                            //Add company
                        }



                   }
               }
           )


    }
    
    return (
      <KeyboardAwareScrollView>
        <View >


        <View style={styles.Middle} >
                {/*     <Image   style={styles.img} alt='some value' source={require('../assets/images/logo.png')} />*/}
             <Text style={styles.cname}>WorkNow</Text>
         </View>    

          
          <View style={styles.buttonStyle}>
            <View style={styles.emailInput}>
                <Input
                      onChangeText={(text) => setFdata({...fdata,username:text.trim()})}
                      //value={user.username}
                      //onChangeText={(event) => handleUpdateUser('username', event.target.value)}
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
                     placeholder = "Input UserName"
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
                      onChangeText={(text) => setName(text.trim())}
                      //value={user.username}
                      //onChange={(event) => handleUpdateUser('username', event.target.value)}
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
                     placeholder = "Input Name"
                     _light={{
                     placeholderTextColor: "blueGray.400"
                    }}
                     _dark={{
                     placeholderTextColor: "blueGray.50"
                     }}
               />
             </View>
         </View>

        {/* email */}
         <View style={styles.buttonStyleX}>
            <View style={styles.emailInput}>
                <Input
                      onChangeText={(text) => setFdata({...fdata,email:text.trim().toLowerCase()})}
                      returnKeyType="next"
                      onPressIn={() => setErrormsg(null)}
                      InputLeftElement={
                        <Icon
                            as= {<MaterialCommunityIcons name="email" />}
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
                     placeholder = "Input email"
                     _light={{
                     placeholderTextColor: "blueGray.400"
                    }}
                     _dark={{
                     placeholderTextColor: "blueGray.50"
                     }}
               />
             </View>
         </View>

         {/* password */}
         <View style={styles.buttonStyleX}>
             <View style={styles.emailInput}>
                 <Input
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
                     secureTextEntry={true}
                     placeholder="Input password"
                     _light={{
                         placeholderTextColor:"blueGray.400"
                     }}
                     _dark={{
                        placeholderTextColor:"blueGray.50"
                            }}

                 />

             </View>
         </View>


         {/* Repeat password */}
         <View style={styles.buttonStyleX}>
             <View style={styles.emailInput}>
                 <Input
                       onChangeText={(text) => setFdata({...fdata,confirmpassword:text})}
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
                     secureTextEntry={true}
                     placeholder="Confirm password"
                     _light={{
                         placeholderTextColor:"blueGray.400"
                     }}
                     _dark={{
                        placeholderTextColor:"blueGray.50"
                            }}

                 />

             </View>
         </View>

        <View style={styles.Middle}>
        <Text style={styles.RadiobuttonText} >Which type of user are you?</Text>
        <RadioButtonRN
          style={styles.Radioboxstyle}
          data={data}
          //selectedBtn={() => setErrormsg(null)}
          
          selectedBtn={(e) => setType(e)}
          circleSize={10}
          boxDeactiveBgColor='#e2e2e2'
          textStyle={{ fontsize: "20" ,alignItems: 'center',}}
          boxActiveBgColor='#e1f5fe33'
          //deactiveColor="#767676"
          
        />

        </View>  


         {/* button */}
         <View style={styles.Middle}>
            
         <TouchableOpacity
             style={styles.RegisterButton}
             onPress={handleSignUp}
            
            >
            <Text style={styles.SignupHereText}>Signup</Text>
            </TouchableOpacity>
             

         </View>

         <View style={styles.text2}>
               <Text>Already have an account?</Text>
                <TouchableOpacity onPress={()=> navigation.navigate("Login")}>
               <Text style={styles.LoginText}> Login</Text>
               </TouchableOpacity> 
          </View>

     


        {
            errormsg ? <Text style={styles.error}>{errormsg}</Text>:null
        }
      
          
        </View>
        </KeyboardAwareScrollView>
    )
}

export default ()=> {
  return (
      <NativeBaseProvider>
          <Signup/>
      </NativeBaseProvider>
  )

}

const styles= StyleSheet.create({
  container: {
      flex: 1,
      //alignItems: 'center',
     // justifyContent: 'center',
    },
    Radioboxstyle:{
        
        // flex: 1,
         width :140,
        // flexDirection: 'row',
        //justifyContent: 'space-between
        
    },
    Radioboxcontent:{
       color: "#767676"
    },
  
  LoginTexttop:{
      
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
  LoginText:{
      color: '#1779ba',
      fontWeight:'bold',
  },
  emailInput:{
      marginTop:10,
      marginRight:5,

  },
  RadiobuttonText:{
    marginTop:15,

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
  RegisterButton: {
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
 
    alreadyAccountText: {
      // fontFamily: 'UbuntuLightItalic',
      fontSize: 12,
      color: 'white',
    },
    SignupHereText: {
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
    paddingTop:25,
  },
error:{
    color: "red",
    textAlign: 'center',
    fontSize: 15,
    paddingTop: 15,
    
  },
    
})
