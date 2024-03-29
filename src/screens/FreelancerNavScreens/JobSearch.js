//this screen will show recruiters posted jobs and will have a button to post job
import React from 'react';
import { View, TextInput,Text, StyleSheet ,Image,ScrollView} from 'react-native';
import BottomNavBarF from '../../components/BottomNavBarF';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleJobcard from '../../components/SimpleJobcard';
import {  useRef,useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import TopNavBar from '../../components/TopNavBar';
import BidJobcard from '../../components/BidJobcard';
const JobSearch = () => {
    const navigation = useNavigation();
    const [jobdata, setjobdata] = useState(null);
    const [errormsg, setErrormsg] = useState(null);
    const [searchFilter, setSearchFilter] = useState('');
    const [filteredJobData, setFilteredJobData] = useState([]);
    const[freelancer,setfreelancerid]=useState("");
    const PostBid = (jobId) => {
        console.log(freelancer)
       navigation.navigate("AddBid", { jobId,freelancer});
   };
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
        //get all jobs without a freelancer 
        try {
          const value = await AsyncStorage.getItem('Profiledata');
          if (!value) {
            setErrormsg('Profiledata not found in AsyncStorage');
            return;
          }
          const data = JSON.parse(value);
          console.log("profiledata in job serach")
          console.log(data);
          const _id = data.freelancer._id;
          console.log(_id);
          const freelancerId = _id ;
          setfreelancerid(_id);
          
           //get all jobs without a freelancer
          const res = await fetch(`http://192.168.1.98:3000/GetJobs`, {
            method: 'GET',
          });
          //console.log(res);
          const sentBackData = await res.json();
          console.log('sentBackData:', sentBackData);
          if (sentBackData.error) {
            setErrormsg(sentBackData.error);
          } else if (sentBackData.message === "Sending back All available Jobs") {
            console.log('got  Jobs from backend!!');
            
            setjobdata(sentBackData.jobs);
            if(sentBackData.jobs==null){
                setErrormsg('No jobs available');
            }
            //console.log(jobdata);
            
        }
        } catch (err) {
          console.error('Error fetching  jobs :', err);
          setErrormsg('Error fetching jobs');
        }
      
  }
    useEffect(() => {
        const interval = setInterval(() => {
            getAllJobsData();//get jobs that do not have a freelancer
        }, 3000); // call every 5 seconds
        return () => clearInterval(interval); // cleanup function
      }, []);
      //use useFocusEffect to fetch data every time the screen gains focus
    //   useFocusEffect(
    //     React.useCallback(() => {
    //         getAllJobsData();
    //     }, [])
    //   );
    
     return(
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
            return (
              <BidJobcard
                key={item._id}
                index={index}
                username={item.recruiter.username}
                _id={item._id}
                title={item.title}
                description={item.description}
                hourlyrate={item.hourlyrate}
                bids={item.Bids}
                skills={item.skills}
                onMakeBid={ () => PostBid(item._id)}
              />
            );
          })
        ) : jobdata ? (
          jobdata.map((item, index) => {
            //const username = usernames[index];
            return (
              <BidJobcard
                key={item._id}
                index={index}
                username={item.recruiter.username}
                _id={item._id}
                title={item.title}
                description={item.description}
                hourlyrate={item.hourlyrate}
                bids={item.Bids}
                skills={item.skills}
                onMakeBid={ () => PostBid(item._id)}
              />
            );
          })
        ) : (
          <Text>No jobs found or Loading</Text>
        )}
        
            </View>
     
            
             
          
          </View>
          <BottomNavBarF 
           navigation={navigation} />
          </ScrollView>
        
          </View>
          
        
     )
 
     }

 const styles = StyleSheet.create({
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
 export default JobSearch; 