import React from 'react';
import {  useRef,useState } from 'react';
import { View,Dimensions, Text, StyleSheet, TouchableOpacity,LayoutAnimation,Alert,ImageSourcePropType,TextInput,TextInputProps,  UIManager,} from 'react-native';
import { NativeBaseProvider,Input, Button, Icon, Box, Image, useStyledSystemPropsResolver, Center} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
//import {LinearGradient} from 'expo-linear-gradient';
//import { InputProps } from '@rneui/themed';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


const VerifyEmail = () => {
    const navigation = useNavigation();

    return (
        <KeyboardAwareScrollView>
          <View >
              <Text>Verify email page</Text>
          </View>
          </KeyboardAwareScrollView>
          )
}

export default VerifyEmail;
 ()=> {
    return (
        <NativeBaseProvider>
            <VerifyEmail/>
        </NativeBaseProvider>
    )}

    const styles= StyleSheet.create({
        
    })