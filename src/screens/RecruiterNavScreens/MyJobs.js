//this screen will show recruiters posted jobs and will have a button to post job
import React from 'react';
import {  useRef,useState } from 'react';
import { View,Image,ScrollView, Text, StyleSheet, TouchableOpacity, Modal,Alert,TextInput} from 'react-native';
import { NativeBaseProvider,Input, Button, Icon, Box,  useStyledSystemPropsResolver, Center} from 'native-base';
import PostJob from './PostJob';
import TopNavBar from '../../components/TopNavBar';
import RandomJobPost from '../../components/RandomJobPost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
const MyJobs = () =>{ 
    const navigation = useNavigation();
    //const [isPostJobVisible, setIsPostJobVisible] = useState(false);
    const AddJobButtonHandler = () =>{
        console.log("Inside Add job Button handler");
        //setIsPostJobVisible(true);
        navigation.navigate("PostJob");
    }
    const loadMyJobs = ()=>{
        console.log("Inside Add load my jobs");
    }
    return (

 
        <View style={styles.container}>
        {/* <BottomNavBar navigation={navigation} page={"FeelancerProfile"} ></BottomNavBar> */}
       <TopNavBar/>
        <View style={styles.header3}>
        
  
       
      <TouchableOpacity
               style={styles.Buttonupimg}
               onPress={AddJobButtonHandler}>
              <Text style={styles.ButtonText}>Add Job </Text>
      </TouchableOpacity>
      </View>
       {/* {isPostJobVisible && (
        <PostJob onClose={() => setIsPostJobVisible(false)} />
      )}   */}

       <RandomJobPost/> 
      </View>
   
 
 )}

 const styles = StyleSheet.create({
 container: {
             flex: 1,
             alignItems: 'center',
             //justifyContent:'center',
             height:'100%',
             paddingTop: 50,
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
    ButtonText:{
        paddingTop:5,
        color: '#ffffff',
        fontWeight:'bold',
        textAlign: "center",
        fontSize:20,
    },
    header3: {
        //flexDirection: 'row',
        //justifyContent: 'flex-end',
        alignSelf:"center",
        alignItems: 'center',
        width: '90%',
        marginTop:60,
        marginBottom:40,
      }, 
    Buttonupimg:{
        backgroundColor: '#1779ba',
        borderRadius: Math.round(30 / 2),
        height: 35,
        width:150,
      },  

 })

 export default  ()=> {
    return (
        <NativeBaseProvider>
            <MyJobs/>
        </NativeBaseProvider>
    )}