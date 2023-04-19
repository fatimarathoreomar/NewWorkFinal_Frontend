//this screen will show recruiters posted jobs and will have a button to post job
import React from 'react';
//import {  useRef,useState } from 'react';
import { View,Image,ScrollView, Text, StyleSheet, TouchableOpacity, Modal,Alert,TextInput} from 'react-native';
import { NativeBaseProvider,Input, Button, Icon, Box,  useStyledSystemPropsResolver, Center} from 'native-base';
import PostJob from './PostJob';
import TopNavBar from '../../components/TopNavBar';
import RandomJobPost from '../../components/RandomJobPost';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {  useRef,useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Jobcard from '../../components/Jobcard';
import BottomNavBar from '../../components/BottomNavBar';
const MyJobs = () =>{ 
    const navigation = useNavigation();
    const [username, setusername] = useState(null);
    const [jobdata, setjobdata] = useState(null);
    const [_id,setid]= useState(null);

const acceptBid = (jobId)=> {
    // get bid from async storage
  
    // display confirmation message
    Alert.alert(
      'Confirm Accept Bid',
      `Are you sure you want to accept this bid for job ${jobId}?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Accept',
          onPress:async  () => {
            // perform the accept bid action
            try {
              AsyncStorage.getItem('Bid').then((bid) => {
                const parsedBid = JSON.parse(bid);
                const bidId=parsedBid._id;
                const fdata={jobId,bidId};
                fetch('http://192.168.1.98:3000/acceptBid', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(fdata),
                }).then( async response => {
                    const sentBackData = await response.json();
                  if (sentBackData.message === "Bid accepted sucessfully") {
                    alert(`Contract states :Payment Terms: ${sentBackData.contract.paymentTerms}, Amount in $ per hour: ${sentBackData.contract.amount}, Dispute Resolution: ${sentBackData.contract.disputeResolution}`);

                  } else if(sentBackData.message === 'Job already has a freelancer')
                  {
                    alert('Job already has a freelancer');
                  }
                  else {
                    alert('Error accepting bid from server');
                  }
                }).catch(error => {
                  console.error(error);
                  alert('Error accepting bid from server');
                });
              });
            } catch (error) {
              console.error('Error accepting Bid:', error);
            }
          },
        },
      ],
      { cancelable: false },
    );
  }
  

    const deleteJob = (jobId, index) => {
        // Show a confirmation dialog
        Alert.alert(
          'Confirm Deletion',
          'Are you sure you want to delete this job?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async () => {
                try {
                  // Send a DELETE request to the backend to delete the job with the given jobId
                  console.log(jobId);
                  try {
                    const response = await fetch(`http://192.168.1.98:3000/${_id}/DELETEJOB/${jobId}`, {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json'
                      }
                    });
                    const sentBackData = await response.json();
                    if (response.status === 200) {
                      // Remove the job from the jobs state by filtering out the job with the given index
                      setjobdata(jobdata.filter((_, i) => i !== index));
                      //alert('Job deleted successfully');
                    } else if (sentBackData.error === 'Job cannot be deleted as it is ongoing and has a freelancer') {
                      alert('Job cannot be deleted as it is ongoing and has a freelancer hired');
                    } else {
                      alert('Error deleting job from server');
                    }
                  } catch (error) {
                    console.error(error);
                    alert('Error deleting job from server');
                  }
                  
                       
                } catch (error) {
                  console.error('Error deleting job:', error);
                }
              },
            },
          ],
          { cancelable: false }
        );
      }
   
      
    const onEdit = async (jobId, index) => {
        console.log('inside editing data in myjobs');
        try {
          // Retrieve the job data to be edited from AsyncStorage
          const data = await AsyncStorage.getItem('Editjobdata');
          // Parse the data into a JavaScript object
          const jobData = JSON.parse(data);
          console.log(jobData);
      
          // Create a new variable for jobData info and split the skills string into an array
          const jobDataWithSkillsArray = {
            title:jobData.title,
            description:jobData.description,
            hourlyrate:parseInt(jobData.hourlyrate),
            skills: jobData.skills.split(',')
          }
          console.log(jobDataWithSkillsArray);
      
          // Send a PUT request to the backend to update the job with the given jobId
          const response = await fetch(`http://192.168.1.98:3000/${_id}/EDITJOB/${jobId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jobDataWithSkillsArray),
          });
          if (response.status === 200) {
            // Update the job in the jobs state by replacing the job with the given index with the edited job data
            const newjobData = {
                title:jobData.title,
                description:jobData.description,
                hourlyrate:parseInt(jobData.hourlyrate),
                skills: jobData.skills.split(','),
                bids:jobData.bids,
                _id:jobId,
              }
            setjobdata(jobdata.map((job, i) => (i === index ? newjobData : job)));
            // Log the success message
            alert('Job edited successfully');
            console.log('Job edited successfully');
          } else {
            // Log the error message
            console.error('Error editing job on server');
          }
        } catch (error) {
          console.error('Error editing job:', error);
        }
      };
      
    const updateLocalvalues = async () => {
        try {
          const value = await AsyncStorage.getItem('RecruiterJobs');
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
      
    
useEffect(() => {
    const interval = setInterval(() => {
        getRecruiterJobsData();
    }, 3000); // call every 5 seconds
    return () => clearInterval(interval); // cleanup function
  }, []);

        const getRecruiterJobsData = async () => {
          try {
            const value = await AsyncStorage.getItem('Profiledata');
            if (!value) {
              setErrormsg('Profiledata not found in AsyncStorage');
              return;
            }
            const data = JSON.parse(value);
            const _id = data.recruiter._id;
            const fdata = { _id };
            const res = await fetch('http://192.168.1.98:3000/GETALLJOBSRecruiter', {
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
            } else if (sentBackData.message === 'Sending Recruiter Jobs') {
              console.log('got Recruiter Jobs from backend!!');
              AsyncStorage.setItem('RecruiterJobs', JSON.stringify(sentBackData));
              updateLocalvalues();
            }
          } catch (err) {
            console.error('Error fetching recruiter jobs data:', err);
            setErrormsg('Error fetching recruiter jobs data');
          }
        
    }
//     ; getRecruiterJobsData();
// }, [])
//       );
    
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
       
       <ScrollView style={styles.containerscroll}>
       {   jobdata ? (
                 jobdata.map((item,index) => {
                    return (
                        <Jobcard
                            key={item._id} // add a unique key prop
                            index={index}
                            username={username}
                            _id={item._id}//jobid
                            title={item.title}
                            description={item.description}
                            hourlyrate={item.hourlyrate}
                            bids={item.Bids}
                            skills={item.skills}
                            onEditbackend={() => onEdit(item._id,index)}
                            onDelete={() => deleteJob(item._id,index)}
                            AcceptBid={() => acceptBid(item._id)}
                        />
                    )
                 
                }) 
                ) : (
                <Text>No jobs found or Loading</Text>
                )
                
            }
            <BottomNavBar 
             navigation={navigation} />
            </ScrollView>        
      </View>
    
     
   
 
 )}

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

 })

 export default  ()=> {
    return (
        <NativeBaseProvider>
            <MyJobs/>
        </NativeBaseProvider>
    )}