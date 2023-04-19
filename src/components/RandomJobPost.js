import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {  useRef,useState,useEffect } from 'react';
import React from 'react'
import Jobcard from './Jobcard'
import { storeData } from './Atoms/MyLocalStore'
import AsyncStorage from '@react-native-async-storage/async-storage';
const RandomJobPost = ({jobdata,username,onEdit,onDelete}) => {
    const [errmsg,setErrormsg] = useState(null);
    const editJob = (jobId,index) => {
        const job = jobs[index];
        AsyncStorage.setItem('EditJob', JSON.stringify(job));
        // Navigate to the job editing screen, passing the job data and jobId as parameters
        navigation.navigate('EditJob');
      
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
                  await fetch(`http://192.168.1.98:3000/DELETEJOB/${jobId}`, {
                    method: 'DELETE',
                  });
      
                  // Remove the job from the jobs state by filtering out the job with the given index
                  setJobs(jobs.filter((_, i) => i !== index));
                } catch (error) {
                  console.error('Error deleting job:', error);
                }
              },
            },
          ],
          { cancelable: false }
        );
      }



    return (
        <ScrollView style={styles.container}>
            {   jobdata ? (
                 jobdata.map((item,index) => {
                    return (
                        <Jobcard
                            key={item._id} // add a unique key prop
                            index={index}
                            username={username}
                            profile_image={item.profile_image}
                            _id={item._id}//jobid
                            title={item.title}
                            description={item.description}
                            hourlyrate={item.hourlyrate}
                            bids={item.bids}
                            skills={item.skills}
                            onEdit={() => onEdit(jobdata._id,index)}
                            onDelete={() => onDelete(jobdata._id,index)}
                            
                        />
                    )
                 
                }) 
                ) : (
                <Text>No jobs found</Text>
                )
                
            }
        </ScrollView>
    )
}


export default RandomJobPost

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
    }
})