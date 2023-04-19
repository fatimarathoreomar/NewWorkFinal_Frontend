import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Alert } from 'react-native';
import TopNavBar from '../../components/TopNavBar';
import { useNavigation } from '@react-navigation/native';
import Jobsearch from '../RecruiterNavScreens/Jobsearch';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddBid = () => {
    const route = useRoute();
    const { jobId,freelancer } = route.params;
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [errormsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();
  const handleAmountChange = (text) => {
    if ( amount<5 || amount>150) {
        setErrorMsg('Please enter a valid bid amount');
        //return;
      }
      else{
        setErrorMsg("");
      }
    setAmount(text);
  };

  const handleMessageChange = (text) => {
    if ( message.length < 10 || message.length > 100) {
        setErrorMsg('Please enter a bid message between 10 and 100 characters');
      }
      else{
        setErrorMsg("");
      }
    setMessage(text);
  };

  const handleCancelPress = () => {
    // Navigate back to previous screen
    navigation.navigate("JobSearch");
  };

  const handleSubmitPress = async () => {
    // Check if bid amount is valid
    if (!amount || isNaN(amount) || amount<5 || amount>150) {
      setErrorMsg('Please enter a valid bid amount');
      return;
    }
  
    // Check if bid message is valid
    if (!message || message.length <= 10 || message.length > 100) {
      setErrorMsg('Please enter a bid message between 10 and 100 characters');
      return;
    }
    try {
        console.log("inside post bid")
        console.log(freelancer);
        console.log(jobId);
     // Post bid to backend using jobId and freelancerId
     const response = await fetch('http://192.168.1.98:3000/PostBid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          message,
          freelancer: freelancer,
          job : jobId,
        }),
      });
      const sentBackData = await response.json();
        // Show success message and navigate back to previous screen
      
        if(sentBackData.message=="Posted Bid sucessfully"){
                Alert.alert('Success', 'Your bid has been submitted successfully!', [{ text: 'OK' }]);
               
            }
        else{
            Alert.alert('Error', 'Your bid was not posted.check your connection please', [{ text: 'OK' }]);
            
        }    
        navigation.navigate("JobSearch");
        // TODO: Add code to navigate back to previous screen
      } catch (error) {
        console.error('Error submitting bid:', error);
        setErrorMsg('Error submitting bid');
      }
    // Submit bid and navigate back to previous screen
  };

  return (
    <View style={styles.container}>
      <TopNavBar title="Add Bid" />
      <Text style={styles.cname}>Post Bid</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={handleAmountChange}
        />
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Enter message"
          multiline={true}
          numberOfLines={4}
          value={message}
          onChangeText={handleMessageChange}
        />
         {
        errormsg ? <Text style={styles.error}>{errormsg}</Text>:null
         }  
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancelPress}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmitPress}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  error:{
    marginTop:20,   
    color:'red',
    marginBottom:20,
    fontWeight:'bold',
    textAlign: 'center',
  },
   cname: {
    color: '#1779ba',
    fontSize: 55,
    fontWeight:'bold',
    // fontFamily: 'UbuntuLight',
    textAlign: 'center',
    marginTop:100,
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginTop:70,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: '#999',
  },
  submitButton: {
    backgroundColor: '#4a90e2',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddBid;
