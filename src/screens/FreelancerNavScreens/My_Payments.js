//this screen will show recruiters posted jobs and will have a button to post job
import React from 'react';
import BottomNavBarF from '../../components/BottomNavBarF';
import TopNavBar from '../../components/TopNavBar';
import { View, Text, StyleSheet ,Image,ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Paymentcard from '../../components/Paymentcard';
import {  useRef,useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const My_Payments = () => {
    const navigation = useNavigation();
    const [paymentdata, setpaymentdata] = useState(null);
    const [_id,setid]= useState(null);
    const [errormsg, setErrormsg] = useState(null);
    const getFreelancerPaymentData = async () => {
        try {
          const value = await AsyncStorage.getItem('Profiledata');
          if (!value) {
            setErrormsg('Profiledata not found in AsyncStorage');
            return;
          }
          const data = JSON.parse(value);
          const username = data.user.username;
          console.log(username);
          const fdata = { _id };
          const res = await fetch(`http://192.168.1.98:3000/${username}/GetfreelancersPayments`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        
          });
          const sentBackData = await res.json();
          console.log('sentBackData:', sentBackData);
          if (sentBackData.error) {
            setErrormsg(sentBackData.error);
          } else if (sentBackData.message === 'Sending Freelancers Payments') {
            console.log('got  payments from backend!!');
             setpaymentdata(sentBackData.payments);
          }
        } catch (err) {
          console.error('Error fetching payments data:', err);
          setErrormsg('Error fetching  payments data');
        }
      
  }


  useEffect(() => {
    const interval = setInterval(() => {
        getFreelancerPaymentData();
    }, 3000); // call every 5 seconds
    return () => clearInterval(interval); // cleanup function
  }, []);
     return(
         <View style={styles.container}>
         <TopNavBar/>
         <Text style={styles.cname}>Payments</Text>
         <ScrollView style={styles.containerscroll}>
       {   paymentdata ? (
                 paymentdata.map((item,index) => {
                    return (
                        <Paymentcard
                            key={item._id} // add a unique key prop
                            index={index}
                            _id={item._id}//paymentid
                            amount={item.amount}
                            usernameR={item.usernameR}
                            usernameF={item.usernameF}
                           
                        />
                    )
                 
                }) 
                ) : (
                <Text style={styles.textstyle}>  No Payments made </Text>
                )
                
            }

        </ScrollView> 
        {
            errormsg ? <Text style={styles.error}>{errormsg}</Text>:null
        } 
         <BottomNavBarF 
             navigation={navigation} />
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
     error:{
            color:"red",
            fontWeight:'bold',
        },
        textstyle:{
           marginTop:100,
           color:"red",
           fontWeight:'bold',
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
 export default My_Payments; 