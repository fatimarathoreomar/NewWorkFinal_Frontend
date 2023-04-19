import React from 'react';
import {  useRef,useState } from 'react';
import { View,Dimensions,Image,ScrollView, Text, StyleSheet, TouchableOpacity,LayoutAnimation,Alert,ImageSourcePropType,TextInput,TextInputProps,  UIManager,} from 'react-native';
import { NativeBaseProvider,Input, Button, Icon, Box,  useStyledSystemPropsResolver, Center} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
//import {LinearGradient} from 'expo-linear-gradient';
//import { InputProps } from '@rneui/themed';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BottomNavBar from '../../components/BottomNavBar';
import TopNavBar from '../../components/TopNavBar';
import ActiveJobs from './ActiveJobs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from "@react-navigation/native";
    const PostPayment = () => {
        const navigation = useNavigation();
        const route = useRoute();
        const job_id = route.params.job_id;
        const [amount, setAmount] = useState('');
        const [cardNumber, setCardNumber] = useState('');
        const [expiryDate, setExpiryDate] = useState('');
        const [cvv, setCvv] = useState('');
        const [paymentMethod, setPaymentMethod] = useState('Credit Card');
        const [errormsg, setErrorMsg] = useState('');
        const handleSubmit = async () => {
            console.log(job_id);
            if (!amount || !cardNumber || !expiryDate || !cvv) {
                setErrorMsg('Error', 'Please fill all the fields');
                return;
              }
              if (!cardNumber || cardNumber.length !== 16 || isNaN(cardNumber)) {
                setErrorMsg('Please enter a valid 16-digit card number.');
                return;
              }
          
              const datePattern = /^([0-9]{2})\/([0-9]{2})$/;
              const expiryDateArray = expiryDate.split('/');
              const expiryMonth = parseInt(expiryDateArray[0], 10);
              const expiryYear = parseInt(expiryDateArray[1], 10);
       
              if (!expiryDate || !datePattern.test(expiryDate)) {
                setErrorMsg('Please enter a valid expiry date in the format MM/YY.');
                return;
              }
              const currentDate = new Date();
              const currentYear = currentDate.getFullYear();
              const currentMonth = currentDate.getMonth() + 1;
              if (expiryMonth < 1 || expiryMonth > 12) {
                setErrorMsg('Please enter a valid month (between 1 and 12).');
                return;
              }
              let expiryYearFull = parseInt(expiryYear, 10);
              if (expiryYearFull < 100) {
                // add the first two digits of the current year to the expiry year
                expiryYearFull += Math.floor(currentYear / 100) * 100;
              }
              
              if (expiryYearFull < currentYear || (expiryYearFull === currentYear && expiryMonth <= currentMonth)) {
                setErrorMsg('Expiry date should be in the future.');
                return;
              }
            // if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth <= currentMonth)) {
                console.log(expiryYearFull);
                 console.log(expiryMonth);
                 console.log(currentMonth);
                 console.log(expiryYear);
                 console.log(currentYear);
                //  setErrorMsg('Expiry date should be in the future.');
                //  return;
                // }

            

            if (expiryYearFull < currentYear || expiryYearFull > currentYear + 10) {
                setErrorMsg('Please enter a valid year (between ' + currentYear + ' and ' + (currentYear + 10) + ').');
                return;
               }
          
              if (!cvv || cvv.length !== 3 || isNaN(cvv)) {
                setErrorMsg('Please enter a valid 3-digit CVV.');
                return;
              }
              setErrorMsg('');
          try {
            // send payment details to server to create payment//fetch('http://192.168.1.98:3000/PostJob', {
            const response = await fetch('http://192.168.1.98:3000/PostPayment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                job_id: job_id,
                amount: amount,
                cardNumber: cardNumber,
                expiryDate: expiryDate,
                cvv: cvv,
                paymentMethod: paymentMethod,
              }),
            });
            const data = await response.json();
            console.log(data);
            // handle success response
            if (data.success) {
              Alert.alert('Success', 'Payment created successfully');
              
              navigation.navigate('MyPayments');
            } else {
              Alert.alert('Error', 'Failed to create payment');
            }
          } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to create payment');
          }
        };
      
        return (
            <KeyboardAwareScrollView>
              <View>
                <TopNavBar />
                <ScrollView style={styles.container}>
                {
                errormsg ? <Text style={styles.err}>{errormsg}</Text>:null
                  } 
                  <Box p={4}>
          
                    <Text style={styles.label}>Amount</Text>
                    <Input
                      value={amount}
                      onChangeText={(text) => {
                      // Validate amount field input
                      if (text && isNaN(text) || !(/^\d+(\.\d{1,2})?$/.test(text))) {
                         setErrorMsg('Please enter a valid amount.');
                      } else if(text<10){
                        setErrorMsg('Please enter an amount greater than 10');
                      }
                      else {
                      setErrorMsg('');
                
                      }
                 
                          setAmount(text);
                        
                    }}
                      keyboardType="numeric"
                      placeholder="Enter payment amount"
                    />
          
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
                      value={expiryDate}
                      onChangeText={(text) => {
                    // Validate expiry date field input
                    const datePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
                    const match = text.match(datePattern);
                    if (text && (!match || match[1] > 12)) {
                        setErrorMsg('Please enter a valid expiry date in the format MM/YY.');
                    } else {
                     const [month, year] = text.split('/');
                    const currentYear = new Date().getFullYear().toString().substr(-2);
                    console.log(currentYear);
                    const currentMonth = new Date().getMonth() + 1;
                      if (year < parseInt(currentYear, 10)) {
                          setErrorMsg('Please enter a valid expiry year in the format MM/YY.');
                    } else if (year === parseInt(currentYear, 10) && parseInt(month,10) < currentMonth) {
                           setErrorMsg('Please enter a valid expiry month in the format MM/YY.');
                    } else {
                            setErrorMsg('');
                    }

  }
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
                  <Text style={styles.label}> Select a Payment Method</Text>
                  <Box flexDirection="row" alignItems="center" justifyContent="space-evenly">
                    <TouchableOpacity
                      style={[
                        styles.paymentButton,
                        paymentMethod === 'Credit Card' && styles.activePaymentButton,
                      ]}
                      onPress={() => setPaymentMethod('Credit Card')}>
                      <FontAwesome5
                        name="credit-card"
                        size={24}
                        color={paymentMethod === 'Credit Card' ? 'white' : 'black'}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.paymentButton,
                        paymentMethod === 'PayPal' && styles.activePaymentButton,
                      ]}
                      onPress={() => setPaymentMethod('PayPal')}>
                      <FontAwesome5
                        name="paypal"
                        size={24}
                        color={paymentMethod === 'PayPal' ? 'white' : 'black'}
                      />
                    </TouchableOpacity>
                  </Box>
          
                  <Button style={styles.Btn} onPress={handleSubmit} mt={4}>
                    Submit Payment
                  </Button>
                 
                </ScrollView>
              </View>
            </KeyboardAwareScrollView>
          );
          
}

export default  ()=> {
    return (
        <NativeBaseProvider>
            <PostPayment/>
        </NativeBaseProvider>
    )}

    const styles= StyleSheet.create({
        err:{
            fontweight: 'bold',
            color:"red",
            alignSelf:"center",
            marginTop:10,
            marginBottom:15,
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
        
    })