
import React from 'react';
import {  useRef,useState,useEffect } from 'react';
import { View,Dimensions, Text, StyleSheet, TouchableOpacity,LayoutAnimation,Alert,ImageSourcePropType,TextInput,TextInputProps,  UIManager,} from 'react-native';
import { NativeBaseProvider,Input, Button, Box, Image, useStyledSystemPropsResolver, Center} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import BottomNavBar from '../../components/BottomNavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { getData, storeData } from '../components/Atoms/MyLocalStore';


const RecruiterProfile = () => {
    const route = useRoute();
    //const { data } = route.params;
    const navigation = useNavigation();
    //const { path } = route.params;
    //console.log(path);
    

    const [errormsg, setErrormsg] = useState(null);
    //console.log(data);
    const [userdata, setUserdata] = React.useState(null);
    const [recruiterdata,setrecruiterdata]=React.useState(null);
   
    const [bio,setbio]=useState("");
    const [company,setcompany]=useState("");
    const [first_name,setfname]=useState("");
    const [last_name,setlname]=useState("");
    const [username,setusername]=useState("");
    const [email,setemail]=useState("");
    const [iseditingOn,setediting]=useState(false);
    const[name,setname]=useState("");
    const [_id,setid]=useState("");
  const [user_id,setuserid]=useState("");
  

   const updateLocalvalues= () =>{
    AsyncStorage.getItem('Profiledata').then((value) => {
        const data=JSON.parse(value);
        //console.log(data);
        const n=data.user.first_name+" "+data.user.last_name;
        setname(n);
        setfname(data.user.first_name);
        setlname(data.user.last_name);
       setusername(data.user.username);
       setbio(data.recruiter.bio);
       setemail(data.user.email);
       setuserid(data.recruiter.user_id);
       setid(data.recruiter._id);
       setcompany(data.recruiter.company);
        
    }) 
       
   }


   const loaddata= () =>{
    AsyncStorage.getItem('Profiledata').then((value) => {
         const data = JSON.parse(value);
        const _id = data.recruiter._id;
        const user_id=data.recruiter.user_id;
        const fdata= {_id,user_id};
fetch('http://192.168.1.98:3000/GetrecruiterProfileData',{
             method : 'POST',
            headers : {
                'Content-Type':'application/json',
                //'Authorization': 'Bearer ' + JSON.parse(data).token
            },
            body: JSON.stringify(fdata)

        }).then(res => res.json()).then(
         async Sentbackdata => {
            
              if ( Sentbackdata.error) {
                  setErrormsg( Sentbackdata.error);
              }
              else if ( Sentbackdata.message=="Sending Profile data"){
                 console.log("got profile data from backend !!")
                 AsyncStorage.setItem('Profiledata', JSON.stringify(Sentbackdata))
                 updateLocalvalues();
             }
          })
         .catch(err =>{
             alert(err)
         })
       })

}

   useEffect(() => {
    const GetProfileData= () =>{
        AsyncStorage.getItem('Profiledata').then((value) => {
             const data = JSON.parse(value);
            const _id = data.recruiter._id;
            const user_id=data.recruiter.user_id;
            const fdata= {_id,user_id};
    fetch('http://192.168.1.98:3000/GetrecruiterProfileData',{
                 method : 'POST',
                headers : {
                    'Content-Type':'application/json',
                    //'Authorization': 'Bearer ' + JSON.parse(data).token
                },
                body: JSON.stringify(fdata)

            }).then(res => res.json()).then(
             async Sentbackdata => {
                
                  if ( Sentbackdata.error) {
                      setErrormsg( Sentbackdata.error);
                  }
                  else if ( Sentbackdata.message=="Sending Profile data"){
                     console.log("got profile data from backend !!")
                     AsyncStorage.setItem('Profiledata', JSON.stringify(Sentbackdata))
                     updateLocalvalues();
                 }
              })
             .catch(err =>{
                 alert(err)
             })
           })

    }; GetProfileData();
}, []);
    
    
    

      const SaveChanges= () =>{
        console.log('inhere');
        console.log(bio);
       
     
        //const fdata= {_id,bio,company};
        if (company.length<4){
          setErrormsg( "add the full company name");
        }
        else if(bio==""){
          setErrormsg( "Plesae fill your Bio ");
        }
        else if(username=="" || email=="" || name==""){
            setErrormsg( "Plesae fill all fields ");
        }
        else{
            //logindata  AsyncStorage.setItem('Profiledata', JSON.stringify(data))
           // AsyncStorage.getItem('Profiledata').then((value) => {
               // const data = JSON.parse(value);
               setbio(bio.trim());
               setcompany(company.trim());
               setname(name.trim());
                //const user_id=data.recruiter.user_id;
                const fdata= {_id,user_id,bio,company,name};
        fetch('http://192.168.1.98:3000/recruiterupdate',{
                     method : 'POST',
                    headers : {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify(fdata)
    
                }).then(res => res.json()).then(
                 async Sentbackdata => {
                    
                      if ( Sentbackdata.error) {
                          setErrormsg( Sentbackdata.error);
                      }
                      else if ( Sentbackdata.message=="recruiter updated"){
                         console.log("got profile data from backend !!")
                         AsyncStorage.setItem('Profiledata', JSON.stringify(Sentbackdata))
                         
                     }
                  })
                 .catch(err =>{
                     alert(err)
                 })
               // })
        }
    
      }  
    
    return (
        <KeyboardAwareScrollView>

          
      
      <View style={styles.container}>
      {/* <BottomNavBar navigation={navigation} page={"FeelancerProfile"} ></BottomNavBar> */}
      <View style={styles.header3}>
      <TouchableOpacity
             style={styles.Buttonupimg}
             onPress={() => loaddata()}>
            <Text style={styles.ButtonText}>Refresh</Text>
      </TouchableOpacity>

      
    <TouchableOpacity
             style={styles.Buttonsave}
             onPress={SaveChanges}>
            <Text style={styles.ButtonText}>Save </Text>
    </TouchableOpacity>
    </View>
    {
            errormsg ? <Text style={styles.error}>{errormsg}</Text>:null
    }
   
     <Image   style={styles.avatar} alt='some value' source={{uri:"https://kinsta.com/wp-content/uploads/2018/05/best-tools-for-freelancers-1-1.png"}} />
     

      <View style={styles.header}>
     <TextInput style={styles.name}
      value={name}
      onChangeText={(text) => setname(text)}
      /> 
      </View> 
      
    {/* username */}
       <View style={styles.header}>
        <FontAwesome name="user" color="#6F6F6F" size={20} />

          <Text style={styles.email} >
         {username}</Text>
      
      </View>

      <View style={styles.header}>
         <Icon name="email" color="#6F6F6F" size={20} /> 
        <Text style={styles.email} >
         {email}
        </Text>
       
      </View>

      <View style={styles.header}>
      <MaterialIcons name="work"  color="#6F6F6F" size={20} /> 
        <TextInput style={styles.email}
        value= {company}
        onChangeText={(text) => setcompany(text)} />
        
      
      </View>

     

    
    
    {/* </View> */}
    
    <View style={styles.bio}>
       <Text style={styles.namebio}>Bio</Text>
       {/* BIO */}
       <TextInput
            style={styles.textInput}
            multiline={true}
            numberOfLines={8}
            value={bio}
            onChangeText={(text) => setbio(text)} 
            
        />
           
  
    </View>
    </View>
    <View style={styles.bnavbar}>
    <BottomNavBar 
     navigation={navigation} />
    </View>
    </KeyboardAwareScrollView>
          )
}

export default  ()=> {
    return (
        <NativeBaseProvider>
            <RecruiterProfile/>
        </NativeBaseProvider>
    )}

    const styles= StyleSheet.create({
        email: {
            fontSize: 18,
             color: '#6F6F6F',
             marginLeft: 10,
            },
          editButton: {
             marginTop: 20,
             backgroundColor: '#00BFFF',
           },
    
          itemText: {
            fontSize: 16,
          },
           containerimg:{
            flexDirection: 'row',
           },
           container: {
             flex: 1,
             alignItems: 'center',
             justifyContent:'center',
             height:'100%',
             paddingTop: 40,
           },
           container2: {
            flex: 1,
            alignItems: 'center',
            paddingTop: 10,
          },
           bio: {
             paddingLeft:30,
             paddingRight:15,
             paddingTop:30,
             paddingBottom:10,
           },
           avatar: {
            width: 100,
            height: 100,
            borderRadius: 50,
            marginTop: 30,
            //marginBottom: 20,
           },
           name: {
               fontSize: 22,
               fontWeight: 'bold',
               //marginBottom: 5,
           },
           lname: {
             
            fontSize: 22,
            fontWeight: 'bold',
            //marginBottom: 5,
        },
           namebio: {
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 5,
            paddingLeft:15,
        },
      title: {
        fontSize: 18,
        color: '#6F6F6F',
        marginBottom: 5,
      },
      navbar:{
        top:0,
        right:150,
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        //marginBottom: 20,
      },
      header3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
      },
      header2: {
        flexDirection: 'row',
        alignItems: 'center',
        //marginLeft:60,
        //marginBottom: 20,
      },
      Button: {
        backgroundColor: '#1779ba',
        marginTop:20,
        //marginBottom:20,
        width: 250,
        borderRadius: Math.round(45 / 2),
        height: 45,
    },
    ButtonText:{
        paddingTop:5,
        color: '#ffffff',
        fontWeight:'bold',
        textAlign: "center",
        fontSize:20,
    },
    textInput: {
    
      borderWidth: 1,
      borderColor: 'gray',
      //width: 250,
      borderRadius: Math.round(45 / 2),
      height: 140,
      width:350,
    },
    textInputskills: {
    
      borderWidth: 1,
      borderColor: 'gray',
      //width: 250,
      borderRadius: Math.round(30 / 2),
      height: 50,
      width:350,
    },
    Buttonsave: {
      backgroundColor: '#1779ba',
      borderRadius: Math.round(30 / 2),
      height: 35,
      width:60,
      //position: 'absolute',
      //left: 150,
      //top: 0,
     
    },
    Buttonupimg:{
      backgroundColor: '#1779ba',
      borderRadius: Math.round(30 / 2),
      height: 35,
      width:150,
    },
    editIcon: {
      
      position: 'absolute',
      bottom: 0,
      left: -6,
    },
    starpadding:{
     paddingTop:5,
    },
    
     headerContainer: {
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f7f7f7',
    },
    error:{
      color:"red",
    },
    bnavbar:{
        marginTop:120,
    }
    })

  


    