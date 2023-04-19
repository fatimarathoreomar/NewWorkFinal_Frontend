import React from 'react';
import {  useRef,useState } from 'react';
import { View,Dimensions, Text, StyleSheet, TouchableOpacity,LayoutAnimation,Alert,ImageSourcePropType,TextInput,TextInputProps,  UIManager,} from 'react-native';
import { NativeBaseProvider,Input, Button, Icon, Box, Image, useStyledSystemPropsResolver, Center} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TopNavBar from '../../components/TopNavBar';

const VerifyEmail = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const handleVerifyEmail = async () => {
        
        if (validateEmail()) {
            setErrorMsg('Invalid email address');
            return;
        }
        console.log("inside verify email");
        try {
          const response = await fetch('http://192.168.1.98:3000/verify-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
          const data = await response.json();
          if (data.message=='Verification Code Sent to your Email') {
            Alert.alert('Verification code sent', `A verification code has been sent to your email address.`, [{ text: 'OK' }]);
            var VerificationCode=data.VerificationCode ;
            console.log(VerificationCode);
            navigation.navigate('Verifyconfcode', { email,VerificationCode });
          } else {
              setErrorMsg(data.error);
            Alert.alert('Error', 'Unable to verify email. Please try again.', [{ text: 'OK' }]);
          }
        } catch (error) {
            setErrorMsg(data.error);
          Alert.alert('Error', 'Unable to verify email. Please try again.', [{ text: 'OK' }]);
        }
      };

    const validateEmail = () => {
        // This regex pattern matches most common email formats!fdata.email.match(re)
        var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.match(re)) {
          setErrorMsg('Invalid email address');
        } else {
          setErrorMsg('');
        }
      };
    
      const handleEmailInput = (text) => {
        setErrorMsg(null);
        setEmail(text);
        validateEmail();
      };
    return (
        <KeyboardAwareScrollView>
          <View>
          <TopNavBar/>
          <View style={styles.container}>
      <Text style={styles.cname}>Verify email </Text>
      <TextInput
         style={styles.input}
            placeholder="example@mail.com"
            value={email.toLowerCase()}
            onChangeText={handleEmailInput}
            keyboardType="email-address"
            onPressIn={() => setErrorMsg(null)}
      />
      </View>
      {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
      
          <TouchableOpacity
            style={styles.button}
            onPress={handleVerifyEmail}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

    </View>
          </KeyboardAwareScrollView>
          )
}

export default VerifyEmail;
    

const styles = StyleSheet.create({
    cname: {
        color: '#1779ba',
        fontSize: 55,
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

  });