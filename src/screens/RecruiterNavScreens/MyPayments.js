//this screen will show recruiters posted jobs and will have a button to post job
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View,Image,ScrollView, Text, StyleSheet, TouchableOpacity, Modal,Alert,TextInput} from 'react-native';
import {  useRef,useState,useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostPayment from './PostPayment';
import ActiveJobs from './ActiveJobs';
//import { View, Text, StyleSheet ,Image} from 'react-native';
import TopNavBar from '../../components/TopNavBar';
import BottomNavBar from '../../components/BottomNavBar';
import Paymentcard from '../../components/Paymentcard';
const MyPayments = () => {
    const navigation = useNavigation();
    const [username, setusername] = useState(null);
    const [paymentdata, setpaymentdata] = useState(null);
    const [_id,setid]= useState(null);
    const [errormsg, setErrormsg] = useState(null);
    const PaymentButtonHandler = () =>{
        console.log("Inside Add job Button handler");
        //setIsPostJobVisible(true);
        navigation.navigate("ActiveJobs");
    }
   
    const getRecruiterPaymentData = async () => {
        try {
          const value = await AsyncStorage.getItem('Profiledata');
          if (!value) {
            setErrormsg('Profiledata not found in AsyncStorage');
            return;
          }
          const data = JSON.parse(value);
          const _id = data.recruiter._id;
          const fdata = { _id };
          const res = await fetch('http://192.168.1.98:3000/GETALLpaymentsRecruiter', {
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
          } else if (sentBackData.message === 'Sending Recruiter Payments') {
            console.log('got Recruiter payments from backend!!');
            AsyncStorage.setItem('RecruiterPayments', JSON.stringify(sentBackData));
            setpaymentdata(sentBackData.payments);
            console.log("bhjhjjbhbhbh");
            console.log(sentBackData.payments);
            //updateLocalvalues();
          }
        } catch (err) {
          console.error('Error fetching recruiter payments data:', err);
          setErrormsg('Error fetching recruiter payments data');
        }
      
  }


  useEffect(() => {
    const interval = setInterval(() => {
      getRecruiterPaymentData();
    }, 3000); // call every 5 seconds
    return () => clearInterval(interval); // cleanup function
  }, []);

  return(

        <View style={styles.container}>
         <TopNavBar/>
        <View style={styles.header3}>
         <TouchableOpacity
         style={styles.Buttonupimg}
         onPress={PaymentButtonHandler}>
              <Text style={styles.ButtonText}>Make Payment </Text>
         </TouchableOpacity>
         </View>
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
                            onClick={() => ShowpaymentandJobdetails(item._id)}
                
                            
                        />
                    )
                 
                }) 
                ) : (
                <Text>  No Payments made </Text>
                )
                
            }

        </ScrollView> 
        {
            errormsg ? <Text style={styles.error}>{errormsg}</Text>:null
        }   
        <BottomNavBar 
        navigation={navigation} />
         </View>
   
 
 )}

 const styles = StyleSheet.create({
     error:{
         color:"red",
         fontWeight:'bold',
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


 })
 export default MyPayments; 