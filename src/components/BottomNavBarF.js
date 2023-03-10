
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
//import { NativeBaseProvider, Image, useStyledSystemPropsResolver, Center} from 'native-base';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  DrawerLayoutAndroid,
  Dimensions,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BottomNavBarF = () => (
 <View style={styles.container}>  
    <View style={styles.navigationContainer}>
          <View style={styles.NavBar}>
          <Pressable
          onPress={() => navigation.navigate('FreelancerProfile')}
          android_ripple={{borderless:true, radius:50}}>
         <MaterialCommunityIcons 
           name="face-man-profile"
           size={35}
           style={styles.Icon}
           //height={iconHeight}
           //width={iconWidth}
           color="#ffffff"
         />
          </Pressable>

          <Pressable 
          onPress={() => navigation.navigate('My_Projects')}
          android_ripple={{borderless:true, radius:50}}>
         <MaterialIcons 
           name="work"
           style={styles.Icon}
           size={35}
           //height={iconHeight}
           //width={iconWidth}
           color="#ffffff"
         />
          </Pressable>

          <Pressable 
          onPress={() => navigation.navigate('My_jobs')}
          android_ripple={{borderless:true, radius:50}}>
         <FontAwesome
         
          name="search" 
          style={styles.Icon}
           size={32}
           //height={iconHeight}
           //width={iconWidth}
           color="#ffffff"
         />
          </Pressable>

          <Pressable 
          onPress={() => navigation.navigate('My_Payments')}
          android_ripple={{borderless:true, radius:50}}>
          <MaterialCommunityIcons 
          name="account-cash"
           size={35}
           style={styles.Icon}
           //height={iconHeight}
           //width={iconWidth}
           color="#ffffff"
         />
          </Pressable>

          </View>
       

    </View>
    </View> 
    );


    const styles = StyleSheet.create({
        container:{
            flex:1,
            alignItems:"center",
            justifyContent:"center",
            marginTop:100,
            bottom : 0,

        },
        container2: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            backgroundColor:"#1779ba",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            position: 'absolute',
            bottom: 0,
            width: '100%',
            zIndex: 100,
            paddingVertical: 10,
            alignItems: 'center',
        },
        navigationContainer: {

            position: 'absolute',
            bottom : 0,
            height: 50,
            //backgroundColor: '#333',
            alignItems: 'center',
            //justifyContent: 'center',
            
            
          },
          NavBar:{
            //position: 'absolute',
            borderRadius:40,  
            flexDirection:"row",
            backgroundColor:"#1779ba",
            width:"95%",
            height:"100%",
            justifyContent:"space-evenly",
            
          },
          navigationText: {
            fontSize: 18,
            fontWeight: 'bold',
            color:"#ffffff"
          }, 
          Icon:{
              paddingTop:7,
          }
    })   


export default BottomNavBarF;    
    