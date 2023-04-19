import React from 'react';
import {  useRef,useState } from 'react';
import { View,Dimensions, Text, StyleSheet, TouchableOpacity,LayoutAnimation,Alert,ImageSourcePropType,TextInput,TextInputProps,  UIManager,} from 'react-native';
import { NativeBaseProvider,Input, Button, Icon, Box, Image, useStyledSystemPropsResolver, Center} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from "@react-navigation/native";
import TopNavBar from '../../components/TopNavBar';


const Verifyconfcode = () => {
  const [verificationInput, setVerificationInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const { email, VerificationCode } = route.params;
  const handleVerification = () => {
      console.log(verificationInput);
      console.log(VerificationCode);
    if (parseInt(verificationInput) === VerificationCode ) {
        navigation.navigate('NewPassword', { email });
    } else {
      setErrorMsg('Verification code is incorrect');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter Verification Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Verification code"
        onChangeText={(text) => setVerificationInput(text)}
        value={verificationInput}
        keyboardType="number-pad"
        maxLength={6}
        onPressIn={() => setErrorMsg(null)}
      />
      {errorMsg !== '' && <Text style={styles.error}>{errorMsg}</Text>}
      <TouchableOpacity style={styles.button} onPress={handleVerification}>
        <Text style={styles.buttonText}>Verify Code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Verifyconfcode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginBottom: 20,
    width: '80%',
    fontSize: 16,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
