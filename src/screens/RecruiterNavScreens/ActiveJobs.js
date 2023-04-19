import React from 'react';
import { View,Dimensions,Image,ScrollView, Text, StyleSheet, TouchableOpacity,LayoutAnimation,Alert,ImageSourcePropType,TextInput,TextInputProps,  UIManager,} from 'react-native';
import { NativeBaseProvider,Input, Button, Icon, Box,  useStyledSystemPropsResolver, Center} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {  useRef,useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BottomNavBar from '../../components/BottomNavBar';
import TopNavBar from '../../components/TopNavBar';
import RandomJobPost from '../../components/RandomJobPost';
import JobcardPayment from '../../components/JobcardPayment';
const ActiveJobs = () => {
    const navigation = useNavigation();
    const [username, setusername] = useState(null);
    const [jobdata, setjobdata] = useState(null);
    const [_id,setid]= useState(null);
    const [errormsg, setErrormsg] = useState(null);
    
     const MakePayment = (job_id, index) => {
         console.log(job_id)
        navigation.navigate("PostPayment", { job_id });
    };
    
    
    const updateLocalvalues = async () => {
        try {
          const value = await AsyncStorage.getItem('RecruiterActiveJobs');
          const d = JSON.parse(value);
          setjobdata(d.jobs);
          console.log(jobdata);
      
          const profileValue = await AsyncStorage.getItem('Profiledata');
          const profileData = JSON.parse(profileValue);
          setusername(profileData.user.username);
          setid(profileData.recruiter._id);
          console.log(username);
        } catch (err) {
          console.error(err);
        }
      };
    const getRecruiterjobData = async () => {
        try {
          const value = await AsyncStorage.getItem('Profiledata');
          if (!value) {
            setErrormsg('Profiledata not found in AsyncStorage');
            return;
          }
          const data = JSON.parse(value);
          const _id = data.recruiter._id;
          const fdata = { _id };
          const res = await fetch('http://192.168.1.98:3000/GetActiveJOBSsRecruiter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(fdata),
          });
          const sentBackData = await res.json();
          console.log('sentBackData:', sentBackData);
          if (sentBackData.error) {
            setErrormsg(sentBackData.error);
          } else if (sentBackData.message === 'Active jobs Found') {
            console.log('got Recruiter Active jobs from backend!!');
            AsyncStorage.setItem('RecruiterActiveJobs', JSON.stringify(sentBackData));
            updateLocalvalues();
          }
        } catch (err) {
          console.error('Error fetching recruiter payments data:', err);
          setErrormsg('Error fetching recruiter payments data');
        }
      
  }
//   useFocusEffect(
//     React.useCallback(() => {
//       getRecruiterjobData();
//     }, [])
//   );
  React.useEffect(() => {
    getRecruiterjobData();
    
  }, []);
    return (
        <KeyboardAwareScrollView>
          <View >
               <TopNavBar/>
              <Text style={styles.cname}>Active Jobs</Text>
              <ScrollView style={styles.container}>
              {   jobdata ? (
                 jobdata.map((item,index) => {
                    return (
                        <JobcardPayment
                            key={item._id} // add a unique key prop
                            index={index}
                            username={username}
                            //profile_image={item.profile_image}
                            _id={item._id}//jobid
                            title={item.title}
                            description={item.description}
                            hourlyrate={item.hourlyrate}
                            skills={item.skills}
                           onMakePayment={() => MakePayment(item._id,index)}
                            
    
                            
                        />
                    )
                 
                }) 
                )  : (
                <Text>No Active Jobs with hired freelancer found </Text>
                )
                
            }
            
              </ScrollView>
              {
            errormsg ? <Text style={styles.error}>{errormsg}</Text>:null
        }   
             
          </View>
          </KeyboardAwareScrollView>
          )
}

export default  ()=> {
    return (
        <NativeBaseProvider>
            <ActiveJobs/>
        </NativeBaseProvider>
    )}

    const styles= StyleSheet.create({
        container:{
            marginBottom:30,
            marginTop:100,
            
        },
        cname: {
            color: '#1779ba',
            fontSize: 45,
            fontWeight:'bold',
            paddingTop:40,
            marginBottom:40,
            textAlign: 'center',
            marginTop:40,
          },
        
    })