import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
//import RoundedOutlinedContainer from '.../../components/roundedcontainer';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import SkillList from '../../components/SkillList';
//import * as ImagePicker from 'expo-image-picker';
import { Foundation } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarIcon from 'react-native-vector-icons/Ionicons';
import BottomNavBar from '../../components/BottomNavBar';
import { useRoute } from '@react-navigation/native';
import {profilepic} from '../../assets/images/working.jpeg'
//import AsyncStorage from 'react-native';
import { NativeBaseProvider, Image, useStyledSystemPropsResolver, Center} from 'native-base';
import {
  ActivityIndicator,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  DrawerLayoutAndroid,
  Dimensions,
  Pressable,
  
 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button, Input,ImagePicker } from 'react-native-elements';
//import ImagePicker from "react-native-image-picker";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { getData, storeData } from '../../components/Atoms/MyLocalStore';

import AsyncStorage from '@react-native-async-storage/async-storage';
const FreelancerProfile = () => {
  const route = useRoute();
  //const { path } = route.params;
  //console.log(path);
  //const [userdata, setUserdata] = React.useState(null),
  const navigation = useNavigation();
  const [errormsg, setErrormsg] = useState(null);
  //console.log(data);
  // const [userdata, setUserdata] = React.useState(null);
  // const [freelancerdata,setfreelancerdata]=React.useState(null);
  const [skill,setskill]=useState("");
  const [skills,setskills]=useState([]);
  const [hourlyRate,sethourlyrate]=useState("");
  const [bio,setbio]=useState("");
  const [rating,setrating]=useState(0);
  const [first_name,setfname]=useState("");
  const [last_name,setlname]=useState("");
  const [username,setusername]=useState("");
  const [email,setemail]=useState("");
  const [name,setname]=useState("");
  const [iseditingOn,setediting]=useState(false);
  
  
  const updateLocalvalues= () =>{
    AsyncStorage.getItem('Profiledata').then((value) => {
        const data=JSON.parse(value);
        //console.log(data);
        const n=data.user.first_name+" "+data.user.last_name;
        setname(n);
        setfname(data.user.first_name);
        setlname(data.user.last_name);
        setskills(data.freelancer.skills);
        sethourlyrate(data.freelancer.hourlyRate);
        setbio(data.freelancer.bio);
        setrating(data.freelancer.rating);
        setusername(data.user.username);
        setemail(data.user.email);
        console.log("hourly rate is");
        console.log(hourlyRate);
        
    }) 
       
   }
   

     const onDelete = (index) => {
       let skillscopy=[...skills];
       skillscopy.splice(index,1);
       setskills(skillscopy);

     }

     const loaddata = async () => {
      console.log("loading data");
      
      AsyncStorage.getItem('updatedfreelancer').then((value) => {
        const data = JSON.parse(value);
        const user_id = data.freelancer.user_id;
        console.log('async user data', data);
        const fdata = { user_id }; // add user data here
        fetch('http://192.168.1.98:3000/freelancerprofile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fdata)
        }).then((res) => res.json())
          .then(async (data) => {
            console.log(data);
            if (data.error) {
              //setErrormsg(data.error);
              alert("Connection problem or session expired");
              console.log("session expired");
              navigation.navigate("Login");
            } else if (data.message == "Got Profile data") {
              //console.log("got profile data from backend !!")
              storeData('Profiledata', JSON.stringify(data));
              console.log(data);
              updateLocalvalues();
            }
          })
          .catch((err) => {
            alert(err);
          });
      });
    }

  useEffect(() => {
      loaddata();
    }, []);
  
  
 
  
  const AddinLocal = () =>{
    //add a skill
    setskills([...skills,skill]);
    setskill('');

  }
  const deleteItem = id => {
    //deletesill
    console.log("inside delete item")
    setskills(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  
 
  const SaveChanges= () =>{
    console.log('inhere');
    console.log(bio);
    console.log(skills);
    console.log(hourlyRate);
    console.log(first_name);
    console.log(last_name);
   
    const fdata= {_id,user_id,bio,skills,hourlyRate};
    if (hourlyRate<5 && hourlyRate>200){
      setErrormsg( "Hourly rate not possible!needs to be between 5 to 200 ");
    }
    else if(bio==""){
      setErrormsg( "Plesae fill your Bio to attract recruiters ");
    }
    else if(first_name=="" || last_name==""){
      setErrormsg( "name cannot be empty");
    }
    else{
    fetch('http://192.168.1.98:3000/freelancerupdate',{
                 method : 'POST',
                headers : {
                    'Content-Type':'application/json',
                    //'Authorization': 'Bearer ' + JSON.parse(data).token
                },
                body: JSON.stringify(fdata)

            }).then(res => res.json()).then(
             async Sentbackdata => {
                 console.log(data2);
                  if ( Sentbackdata.error) {
                      setErrormsg( Sentbackdata.error);
                  }
                  else if ( Sentbackdata.message=="freelancer updated"){
                     console.log("got profile data from backend !!")
                     setUserdata(Sentbackdata.freelancer);
                     setfreelancerdata(Sentbackdata.freelancer);
                 }
              })
             .catch(err =>{
                 alert(err)
             })
    }

  }

  const EditProfile= () =>{
    setediting(true);
  }

  


  return(
    <KeyboardAwareScrollView>
    <ScrollView>
    <View>
      
      <View style={styles.container}>
      {/* <BottomNavBar navigation={navigation} page={"FeelancerProfile"} ></BottomNavBar> */}
      <View style={styles.header3}>
      <TouchableOpacity
             style={styles.Buttonupimg}
             //onPress={EditProfile}>
             onPress={() => loaddata()}>
            <Text style={styles.ButtonText}>Refresh</Text>
      </TouchableOpacity>

      
    <TouchableOpacity
             style={styles.Buttonsave}
             onPress={SaveChanges}>
            <Text style={styles.ButtonText}>Save Changes</Text>
    </TouchableOpacity>
    </View>
    {
            errormsg ? <Text style={styles.error}>{errormsg}</Text>:null
    }
   
   
    <View>
    <Image   style={styles.avatar} alt='some value' source={{uri:"https://kinsta.com/wp-content/uploads/2018/05/best-tools-for-freelancers-1-1.png"}} />
    </View>
    
    <View style={styles.header}>
     <TextInput style={styles.name}
     value={name}
      onChangeText={(text) => setfname(text.trim())}
      /> 
      </View>
      

     

      
       <View style={styles.header}>
        <FontAwesome name="user" color="#6F6F6F" size={20} />
          <TextInput style={styles.email} 
          onChangeText={(text) => setusername(text.trim())} 
          value={username}>
          </TextInput>
      </View> 
       
       {/* Hourly rate */}
      <View style={styles.header}>
      <FontAwesome5 name="money-bill-wave"color="#6F6F6F" size={20} />
      <TextInput style={styles.email}
       onChangeText={(text) => sethourlyrate(text.trim())}
       value={hourlyRate}/> 
       <Text style={styles.email}>$/hr</Text>
       </View> 


     {/* email */}
      <View style={styles.header}>
        <Icon name="email" color="#6F6F6F" size={20} />
        <TextInput style={styles.email} 
           onChangeText={(text) => setemail(text.trim())} 
           value={email}
          />
      </View> 
     
     {/*  rating */}
       <View style={styles.header}>
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          name={star <= rating ? 'star' : 'ios-star'}
          size={20}
          style={styles.starpadding}
          color="#ffbb33"
        />
      ))}
    </View> 
       
    </View> 

    
    <View style={styles.bio}>
       <Text style={styles.namebio}>Bio</Text>
      
       <TextInput 
            style={styles.textInput}
            onChangeText={(text) => setbio(text.trim())}
            returnKeyType="next"
            
            value={bio}
            placeholder = " Input Bio"
            multiline={true}
            numberOfLines={6}
  
                    
       />
    </View>

   {/* Skills */}
    <View style={styles.bio}>
       <View style={styles.header2}>
       <Text style={styles.namebio}>Skills</Text>
       <TouchableOpacity
        onPress={AddinLocal}
       >
       <MaterialIcons name="add" size={24} color="black" />

        </TouchableOpacity>
        </View>
      
      
       
       <TextInput 
            style={styles.textInputskills}
            value={skill}
            onChangeText={(text) => setskill(text.trim())}
            returnKeyType="next"
            onPressIn={() => setErrormsg(null)}
            //variant = "outline"
            placeholder = "  Input Skills to add"
         />
     
    </View >

    <View style={styles.listContainer}>
   
    {skills.map((item, index) => (
      <View key={index} style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
      <TouchableOpacity>
       
      <FontAwesome name="remove" size={28} color="black"  onPress={() => onDelete(index)} />
    </TouchableOpacity>
    </View>
    ))}
  </View> 
    
    {/* </View>  */}
    

    {/* </View> */}
    
    
    </View>

    
   
    
    </ScrollView>
    <BottomNavBar navigation={navigation} page={"FeelancerProfile"} ></BottomNavBar>
     {/* <Foundation name="refresh" size={30} color="white" style={styles.refresh}
                onPress={() => loaddata()}
            />  */}
    </KeyboardAwareScrollView>
   
  )
}
export default()=> {
    return (
        <NativeBaseProvider>
            <FreelancerProfile/>
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

       listContainer: {
        flex: 1,
        padding: 16,
      },
      itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        padding: 16,
        borderRadius: 4,
        marginBottom: 20,
        width:'100%',

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
}
    })
