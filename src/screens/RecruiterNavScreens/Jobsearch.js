import React from 'react';
import {  useRef,useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View,Dimensions,Image,ScrollView, Text, StyleSheet, TouchableOpacity,LayoutAnimation,Alert,ImageSourcePropType,TextInput,TextInputProps,  UIManager,} from 'react-native';
import { NativeBaseProvider,Input, Button, Icon, Box,  useStyledSystemPropsResolver, Center} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BottomNavBar from '../../components/BottomNavBar';
import TopNavBar from '../../components/TopNavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleJobcard from '../../components/SimpleJobcard';

const Jobsearch = () => {
    const navigation = useNavigation();
   
    //const [username, setusername] = useState(null);
    const [jobdata, setjobdata] = useState(null);
    const [usernames,setusernames]= useState(null);
    const [errormsg, setErrormsg] = useState(null);
    const [searchFilter, setSearchFilter] = useState('');
    const [filteredJobData, setFilteredJobData] = useState([]);

    const handleSearchFilter = (text) => {
        setSearchFilter(text);
        if(text===""){
            setFilteredJobData([]);
        }
        else{
            const filteredJobs = jobdata.filter(job => {
            const jobTitle = job.title.toLowerCase();
            const jobDescription = job.description.toLowerCase();
            const jobSkills = job.skills.map(skill => skill.toLowerCase());
            const searchTerm = searchFilter.toLowerCase();
          
            return (
              jobTitle.includes(searchTerm) ||
              jobDescription.includes(searchTerm) ||
              jobSkills.includes(searchTerm)
            );
          });
          
          setFilteredJobData(filteredJobs);
        }
    };

    

    const getAllJobsData = async () => {
        //get all jobs without a freelancer also get usernames of recruiter in an array corresponding to each job
        try {
          const value = await AsyncStorage.getItem('Profiledata');
          if (!value) {
            setErrormsg('Profiledata not found in AsyncStorage');
            return;
          }
          const data = JSON.parse(value);
          const _id = data.recruiter._id;
          const fdata = { _id };
           //get all jobs without a freelancer
          const res = await fetch('http://192.168.1.98:3000/GETALLJOBS', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            
          });
          const sentBackData = await res.json();
          console.log('sentBackData:', sentBackData);
          if (sentBackData.error) {
            setErrormsg(sentBackData.error);
          } else if (sentBackData.message === 'Sending Jobs') {
            console.log('got  Jobs from backend!!');
            setusernames(sentBackData.usernames);
            setjobdata(sentBackData.jobs);
            
             console.log(jobdata);

            console.log("hjdsbhcfdvdfvdfgbvdfg");
            console.log(usernames);
        }
        } catch (err) {
          console.error('Error fetching recruiter jobs data:', err);
          setErrormsg('Error fetching recruiter jobs data');
        }
      
  }
    useEffect(() => {
        const interval = setInterval(() => {
            getAllJobsData();//get jobs that do not have a freelancer
        }, 3000); // call every 5 seconds
        return () => clearInterval(interval); // cleanup function
      }, []);
      // use useFocusEffect to fetch data every time the screen gains focus
      useFocusEffect(
        React.useCallback(() => {
            getAllJobsData();
        }, [])
      );
    return (
        <View >
        <ScrollView>
          <View >
               <TopNavBar/>
               <View style={styles.container}>
               <TextInput
              style={styles.searchBar}
              placeholder="Search jobs"
              onChangeText={handleSearchFilter}
              value={searchFilter}
              />
               {
            errormsg ? <Text style={styles.error}>{errormsg}</Text>:null
            }  
               
            {filteredJobData.length > 0 ? (
          filteredJobData.map((item, index) => {
            const username = usernames[index];
            return (
              <SimpleJobcard
                key={item._id}
                index={index}
                username={username}
                _id={item._id}
                title={item.title}
                description={item.description}
                hourlyrate={item.hourlyrate}
                bids={item.Bids}
                skills={item.skills}
              />
            );
          })
        ) : jobdata ? (
          jobdata.map((item, index) => {
            const username = usernames[index];
            return (
              <SimpleJobcard
                key={item._id}
                index={index}
                username={username}
                _id={item._id}
                title={item.title}
                description={item.description}
                hourlyrate={item.hourlyrate}
                bids={item.Bids}
                skills={item.skills}
              />
            );
          })
        ) : (
          <Text>No jobs found or Loading</Text>
        )}
        
            </View>
     
            
             
          
          </View>
          <BottomNavBar 
           navigation={navigation} />
          </ScrollView>
        
          </View>
          
          )
}

export default  ()=> {
    return (
        <NativeBaseProvider>
            <Jobsearch/>
        </NativeBaseProvider>
    )}

    const styles= StyleSheet.create({
        btnvr:{
            marginTop:150,
        },

        container: {
            flex: 1,
             alignItems: 'center',
             //justifyContent:'center',
             height:'100%',
             marginTop: 100,
           },
        error:{
            marginTop:20,   
            color:'red',
            marginTop:20,
            fontWeight:'bold',
        },
        searchBar: {
            width:"70%",
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            marginBottom: 10,
            marginHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        
    })