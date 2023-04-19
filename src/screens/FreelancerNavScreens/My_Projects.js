//this screen will show recruiters posted jobs and will have a button to post job
import React from 'react';
import { View, Text, StyleSheet ,Image,TouchableOpacity,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  useRef,useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavBarF from '../../components/BottomNavBarF';
import TopNavBar from '../../components/TopNavBar';
import FreelancerJobcard from '../../components/FreelancerJobcard';
import Jobcard from '../../components/Jobcard';
const My_Projects = () => {
    const navigation = useNavigation();
    const [username, setusername] = useState(null);
    const [jobdata, setjobdata] = useState(null);
    const [_id,setid]= useState(null);
    const [errormsg, setErrormsg] = useState('');
    
      useEffect(() => {
        const interval = setInterval(() => {
            getJobData();
        }, 3000); // call every 5 seconds
        return () => clearInterval(interval); // cleanup function
      }, []);
    
    const onFinish = (jobId, index) => {
        console.log("pressed finish")
        fetch(`http://192.168.1.98:3000/${jobId}/Finishjob`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: 'completed',
            }),
          })
          .then(response => response.json())
          .then(data => {
            // Update the status of the job in the jobdata state variable
            setjobdata(prevJobdata => [
              ...prevJobdata.slice(0, index),
              {
                ...prevJobdata[index],
                status: 'completed',
              },
              ...prevJobdata.slice(index + 1),
            ]);
          })
          .catch(error => {
            console.error('Error updating job status:', error);
            // Set an error message state variable if needed
            setErrormsg('Error updating job status');
          });

    }
    
    const getJobData = async () => {
        try {
          const value = await AsyncStorage.getItem('Profiledata');
          if (!value) {
            setErrormsg('Profiledata not found in AsyncStorage');
            return;
          }
          const data = JSON.parse(value);
          const _id = data.freelancer._id;
          const url = `http://192.168.1.98:3000/GetMyJobs/${_id}`;
          const res = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const sentBackData = await res.json();
          console.log('sentBackData:', sentBackData);
          if (sentBackData.error) {
            setErrormsg(sentBackData.error);
          } else if (sentBackData.message === 'Sending back freelancers Jobs') {
            console.log('got  Jobs from backend!!');
            setjobdata(sentBackData.jobs);
           // console.log('jobdata:',jobdata);
            const profileValue = await AsyncStorage.getItem('Profiledata');
            const profileData = JSON.parse(profileValue);
            setusername(profileData.user.username);
            setid(profileData.freelancer._id);
          }
        } catch (err) {
          console.error('Error fetching job data:', err);
          setErrormsg('Error fetching  job data');
        }
      
  }
     return(
        <View style={styles.container}>
       <TopNavBar/>
        <View style={styles.header3}>
        <Text style={styles.cname}>My Projects</Text>
        </View>
       <ScrollView style={styles.containerscroll}>
       {   jobdata ? (
                 jobdata.map((item,index) => {
                    return (
                        <FreelancerJobcard
                            key={item._id} // add a unique key prop
                            index={index}
                            username={username}
                            _id={item._id}//jobid
                            title={item.title}
                            description={item.description}
                            hourlyrate={item.hourlyrate}
                            status={item.status}
                            skills={item.skills}
                            onEditbackend={() => onFinish(item._id,index)}
    
                            
                        />
                    )
                 
                }) 
                ) : (
                <Text>No jobs found or Loading</Text>
                )
                
            }
            <BottomNavBarF 
             navigation={navigation} />
            </ScrollView>        
      </View>
    
     
   
     )
 
     }

 const styles = StyleSheet.create({
    containerscroll: {
        width: '100%',
        flexDirection: 'column',
    },
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
      cname: {
        color: '#1779ba',
        fontSize: 45,
        fontWeight:'bold',
        //paddingTop:40,
        marginBottom:20,
        textAlign: 'center',
        marginTop:40,
      },

 })
 export default My_Projects; 