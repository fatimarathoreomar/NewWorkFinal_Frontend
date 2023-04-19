import React from 'react';
import {  useRef,useState } from 'react';
import { View,Dimensions, Text, StyleSheet, TouchableOpacity,LayoutAnimation,Alert,ImageSourcePropType,TextInput,TextInputProps,  UIManager,} from 'react-native';
import { NativeBaseProvider,Input, Button, Icon, Box, Image, useStyledSystemPropsResolver, Center} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from "@react-navigation/native";
import TopNavBar from '../../components/TopNavBar';

const NewPassword = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const email =  route.params.email;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const handleNewPasswordChange = (text) => {
        setErrorMsg(null);
      setNewPassword(text);
    }
  
    const handleConfirmPasswordChange = (text) => {
        setErrorMsg(null);
        setConfirmPassword(text);
        console.log(newPassword);
        console.log(confirmPassword);
        if(newPassword!=confirmPassword){
            setErrorMsg("passwords do not match");
        }
      
    }
    const handleSavePassword = async () => {
        console.log(newPassword);
        console.log(confirmPassword);
        if (newPassword != confirmPassword) {
          Alert.alert('Error', 'Passwords do not match', [{ text: 'OK' }]);
          return;
        }
      
        // TODO: Add code to update password in the backend
        try {
         
          const fdata = { email,newPassword };
          const res = await fetch('http://192.168.1.98:3000/setNewPassword', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(fdata),
          });
          const sentBackData = await res.json();
          console.log('sentBackData:', sentBackData)
          if(sentBackData.message=="Password updated successfully"){
              Alert.alert('Success', 'Your password has been updated successfully!', [{ text: 'OK' }]);
            }
           else{
            Alert.alert('Error', sentBackData.error, [{ text: 'OK' }]);
 
           } 
        } catch (err) {
          
          Alert.alert('Error', 'An error occured please check connection', [{ text: 'OK' }]);
        }
        navigation.navigate('Login');
      }
      

    return (
        <KeyboardAwareScrollView>
        <View p={5}>
        <TopNavBar/>
        <View style={styles.container}>
         <Text style={styles.cname}>Reset Password</Text>
          <Input mb={5} placeholder="New Password" type="password" value={newPassword} onChangeText={handleNewPasswordChange} />
          <Input mb={5} placeholder="Confirm Password" type="password" value={confirmPassword} onChangeText={handleConfirmPasswordChange} onPressIn={setErrorMsg(null)} />
          {errorMsg !== '' && <Text style={styles.errorMsg}>{errorMsg}</Text>}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSavePassword}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
          )
}

export default()=> {
    return (
        <NativeBaseProvider>
            <NewPassword/>
        </NativeBaseProvider>
    )}

    const styles= StyleSheet.create({
        cname: {
            color: '#1779ba',
            fontSize: 50,
            fontWeight:'bold',
            // fontFamily: 'UbuntuLight',
            textAlign: 'center',
            marginTop:100,
            marginBottom: 50,
          },
        label: {
          fontSize: 16,
          marginBottom: 8,
        },
        input: {
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 4,
          padding: 8,
          marginBottom: 16,
          fontSize: 16,
          width:"80%",
          marginBottom:50,
        },
        errorMsg: {
          color: 'red',
          fontSize: 18,
          alignSelf:"center",
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width:"100%",
            marginTop:200,
          },
          button:{ 
          backgroundColor: '#1779ba',
          marginTop:20,
          marginBottom:20,
          width: 250,
          borderRadius: Math.round(45 / 2),
          height: 45,
          alignSelf:"center",
        },
          buttonText:{
            color: '#FFFFFF',
            fontWeight:'bold',
            fontSize: 20,
            textAlign: 'center',
            paddingTop: 10,
    
          },
    })