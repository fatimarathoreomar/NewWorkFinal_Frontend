import React from 'react';
import {  useRef,useState } from 'react';
import { View,Dimensions,Image,ScrollView, Text, StyleSheet, TouchableOpacity,LayoutAnimation,Alert,ImageSourcePropType,TextInput,TextInputProps,  UIManager,} from 'react-native';
import { NativeBaseProvider,Input, Button, Icon, Box,  useStyledSystemPropsResolver, Center} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from "@react-navigation/native";
import { getData, storeData } from '../../components/Atoms/MyLocalStore';
    
    const GetfreelancerCardDetails = () => {
        const [cardNumber, setCardNumber] = useState('');
        const [expirationdate, setExpiryDate] = useState('');
        const [cvv, setCvv] = useState('');
        const [errormsg, setErrorMsg] = useState('');

        const isValidExpiryDate = (expiryDate) => {
            const datePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
            const match = expiryDate.match(datePattern);
            if (!match || match[1] > '12') {
              setErrorMsg('Please enter a valid expiry date in the format MM/YY.');
              return false;
            } else {
              const [month, year] = expiryDate.split('/');
              if(month=="" || year==""){
                setErrorMsg('Please enter both month and year');
                return false;
              }
                
              const currentYear = new Date().getFullYear().toString().substr(-2);
              if (year < parseInt(currentYear, 10)) {
                  console.log(year);
                setErrorMsg('Please enter a valid expiry year in the format MM/YY.');
                return false;
              } else if (year === parseInt(currentYear, 10) && parseInt(month, 10) < new Date().getMonth() + 1) {
                setErrorMsg('Please enter a valid expiry month in the format MM/YY.');
                return false;
              }
              setErrorMsg("");
              return true;
            }
          };

        const handleSubmit =() =>{
           if(!isValidExpiryDate){
               return;
           }
           if(cvv.length!==3){
            setErrorMsg('Please enter a valid 3-digit cvv number.');
            return;
           }
           if(cardNumber.length!==16){
            setErrorMsg('Please enter a valid 16-digit card number.');
           }
       
            AsyncStorage.getItem('Profiledata')
           .then((value) => {
             const data = JSON.parse(value);
             const _id=data.freelancer._id;
             console.log('async user data', data);
             const fdata={_id,cardNumber,expirationdate,cvv}//add user data here
                 fetch('http://192.168.1.98:3000/UpdateFreelancerCardDetails',{
                        method : 'POST',
                        headers : {
                            'Content-Type':'application/json'
                        },
                        body: JSON.stringify(fdata)
         
                    }).then(res => res.json()).then(
                     async data => {
                         console.log(data);
                         if (data.error) {
                             //setErrormsg(data.error);
                             console.log("some error with database")
                             navigation.navigate("Login");
                         }
                         else if (data.message=="freelancer updated"){
                             storeData('Profiledata',JSON.stringify(data));
                             alert("Your profile is ready!Login Now")
                            navigation.navigate("Login",{data});
                            }
                         }
                     )
                     .catch(err =>{
                         alert(err)
                     })
         
           })
           .catch((error) => {
             console.log(error);
           });
                 
           }
             
        const navigation = useNavigation();
        return(
            <KeyboardAwareScrollView>
            <View style={styles.container}>
            <Text style={styles.cname}>Add Payment Details</Text>
            {
            errormsg ? <Text style={styles.error}>{errormsg}</Text>:null
            }  
            <Box p={4}>
            <Text style={styles.label}>Card Number</Text>
                    <Input
                      value={cardNumber}
                      onChangeText={(text) => {
                       // Validate card number field input
                      if (text && (text.length !== 16 || isNaN(text) )) {
                       setErrorMsg('Please enter a valid 16-digit card number.');
                      } else {
                      setErrorMsg('');
                       }
                      setCardNumber(text);
                     }}
                      keyboardType="numeric"
                      placeholder="Enter card number"
                    />
          
                    <Text style={styles.label}>Expiry Date</Text>
                    <Input
                      value={expirationdate}
                      onChangeText={(text) => {
                   // Validate expiry date field input
  
                     isValidExpiryDate(text);
                     setExpiryDate(text);
                      }}

                      placeholder="Enter expiry date (MM/YY)"
                    />
          
                    <Text style={styles.label}>CVV</Text>
                    <Input
                      value={cvv}
                      onChangeText={setCvv}
                      onChangeText={(text) => {
                       // Validate card number field input
                      if (text && (text.length!= 3 || isNaN(text))) {
                       setErrorMsg('Please enter a valid 3-digit cvv number.');
                      } else {
                      setErrorMsg('');
                       }
                      setCvv(text);
                     }}
                      keyboardType="numeric"
                      placeholder="Enter CVV"
                    />
                  </Box>
            
            
            <View style={styles.Middle}>
            
           
          <Button style={styles.Btn} onPress={handleSubmit} mt={4}>
                    Submit Payment
                  </Button>

         
         
           
        </View> 
        </View>
         </KeyboardAwareScrollView>
        )


    }

    export default  ()=> {
        return (
            <NativeBaseProvider>
                <GetfreelancerCardDetails/>
            </NativeBaseProvider>
        )}
    
        const styles= StyleSheet.create({
            error:{
                fontweight: 'bold',
                color:"red",
                alignSelf:"center",
            },
            Btn:{
                marginTop:40,
            },
            container:{
                marginBottom:30,
                marginTop:150,
                
            },
            label: {
                fontSize: 18,
                fontweight: 'bold',
                marginBottom: 10,
              },
              Middle:{
                alignItems:'center',
                justifyContent:'center',
        
            },
              
              paymentButton :{
                width: '50%',
                height: '50%',
                marginRight: 10,
                borderRadius: 25,
                justifycontent: 'center',
                alignitems: 'center',
              },
              
              activePaymentButton :{
                backgroundcolor: 'blue',
              },
              
              paymentButton : {
                color: 'black',
              },
              loginHereText: {
                color: '#FFFFFF',
                fontWeight:'bold',
                fontSize: 20,
                textAlign: 'center',
                paddingTop: 10,
              },
              LoginButton: {
                backgroundColor: '#1779ba',
                marginTop:20,
                marginBottom:20,
                width: 250,
                borderRadius: Math.round(45 / 2),
                height: 45,
               },
               LoginText:{
                
                marginTop:100,
                fontSize:30,
                fontWeight:'bold',
        
            },
            cname: {
                color: '#1779ba',
                fontSize: 45,
                fontWeight:'bold',
                paddingTop:40,
                marginBottom:40,
                textAlign: 'center',
                marginTop:30,
              },
        
            
        })