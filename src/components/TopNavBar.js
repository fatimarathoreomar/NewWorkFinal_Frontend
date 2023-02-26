
import React from 'react';
import { View, Text, StyleSheet ,Image} from 'react-native';
import logo from '../assets/images/WROKNOWLOGO.png'
const TopNavBar = ({navigation,page}) => (

   // return(
        <View style={styles.container}>
         <Image source={logo} style={styles.logo2} />
        </View>
   // )

)
//add serach for a person
const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10,
        position: 'absolute',
        top: 0,
        zIndex: 100,
        backgroundColor:"#1779ba",
       

    },
    logo2:{
        height: 60,
        resizeMode: 'contain',
        // backgroundColor: 'white',
        borderRadius:10,
        width: 60,
        
        paddingLeft:100,
    },

})
export default TopNavBar; 