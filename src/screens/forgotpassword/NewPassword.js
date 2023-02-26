import React from 'react';
import {  useRef,useState } from 'react';
import { View,Dimensions, Text, StyleSheet, TouchableOpacity,LayoutAnimation,Alert,ImageSourcePropType,TextInput,TextInputProps,  UIManager,} from 'react-native';
import { NativeBaseProvider,Input, Button, Icon, Box, Image, useStyledSystemPropsResolver, Center} from 'native-base';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


const NewPassword = () => {
    const navigation = useNavigation();

    return (
        <KeyboardAwareScrollView>
          <View >
              <Text>forgot password page</Text>
          </View>
          </KeyboardAwareScrollView>
          )
}

export default
 ()=> {
    return (
        // <NativeBaseProvider>
            <NewPassword/>
        // </NativeBaseProvider>
    )}

    const styles= StyleSheet.create({
        
    })