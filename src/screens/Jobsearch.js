import React from 'react';
import {  useRef,useState } from 'react';
import { View,Dimensions,Image,ScrollView, Text, StyleSheet, TouchableOpacity,LayoutAnimation,Alert,ImageSourcePropType,TextInput,TextInputProps,  UIManager,} from 'react-native';
import { NativeBaseProvider,Input, Button, Icon, Box,  useStyledSystemPropsResolver, Center} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
//import {LinearGradient} from 'expo-linear-gradient';
//import { InputProps } from '@rneui/themed';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BottomNavBar from '../components/BottomNavBar';
import TopNavBar from '../components/TopNavBar';
import RandomJobsPosting from '../components/RandomJobsPosting';

const Jobsearch = () => {
    const navigation = useNavigation();
    return (
        <KeyboardAwareScrollView>
          <View >
               <TopNavBar/>
              
              <ScrollView style={styles.container}>
            
              </ScrollView>
             
              <BottomNavBar/>
          </View>
          </KeyboardAwareScrollView>
          )
}

export default  ()=> {
    return (
        <NativeBaseProvider>
            <Jobsearch/>
        </NativeBaseProvider>
    )}

    const styles= StyleSheet.create({
        container:{
            marginBottom:30,
            marginTop:30,
            
        }
        
    })