import React from 'react';
import { View, Text,ScrollView, StyleSheet,TouchableOpacity,Image, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {  useRef,useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FreelancerJobcard = (
{
    //profile_image,
    _id,
    title,
    description,
    username,
    skills,
    hourlyrate,
    index,
    status,
    onEditbackend,
}
) => {
    const [editdata,setFdata] = useState({
      
        job_id:_id,
        index:index,
        description:description,
        hourlyrate:hourlyrate.toString(),
        title:title,
        skills:skills.join(","),
        status:status,
       
       })

   

    
  
    const  onFinish =({_id,index}) =>{
        console.log(editdata);
        var text="completed";
        setFdata(prevState => ({ ...prevState, status: text }));
        onEditbackend(_id,index);
    }
    const  HandelCancel =() =>{
        setEditingOn(!isEditing);
    }
    var profile_image='data:image/png;base64,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';
    
    return (
        <View  key={index} style={styles.container}>
         
          
             <View>
        <View style={styles.c1}>
            <Image source={{ uri: profile_image }} style={styles.profilepic} />
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.username}>{title}</Text>
        </View>
    
            <Text style={styles.textstyling}>hourlyrate $/hr:{hourlyrate}</Text>
            <Text style={styles.textstyling}>description : {description}</Text>   
            <Text style={styles.textstyling}>skills : {skills.join(",")}</Text>
            <Text style={styles.textstyling}>status : {status}</Text>
            <View style={styles.s2}> 
            <TouchableOpacity
            onPress={
                    () => {
                        onFinish(_id,index)
                    }
                }>
                <Text color="white" style={styles.icons1}>Finish</Text> 
            </TouchableOpacity>   
            </View>
            </View>

       </View>

)}



const styles = StyleSheet.create({
    err:{
        color:"red",
        fontWeight: 'bold',
    },

    Oneline:{
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    bidicon:{
        alignItems: "flex-end",
        color: 'white',
        fontSize: 25,
        alignContent:"space-between"
    },
    container: {
        backgroundColor: 'white',
        width: '100%',
        // height: 350,
        borderRadius: 10,
        marginVertical: 10,
        overflow: 'hidden',
        borderColor: 'white',
        borderWidth: 1,
    },
    icons1: {
        
        color: 'white',
        fontSize: 25,
        alignSelf:"flex-end",
        paddingRight:10,
        
    },
    buttonstyle:{
        color: 'white',
        fontSize: 20,
        alignSelf:"flex-end",
        paddingRight:10,
       
        
    },
    c1: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#1779ba',
    },
    profilepic: {
        width: 30,
        height: 30,
        borderRadius: 30,
        borderColor: 'white',
        borderWidth: 1,
    },
    username: {
        color: 'white',
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 'bold',
    },
    textstyling:{
        color: '#1779ba',
        marginLeft: 10,
        fontSize: 17,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    s2: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#1779ba',
        padding: 10,
        alignItems: 'center',
        justifyContent:"space-evenly"
    },
    s21: {
        // width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bidtext: {
        color: 'white',
        marginRight: 5,
        fontSize: 12,
    },
    biduser: {
        color: 'white',
        marginRight: 5,
        fontSize: 12,
        fontWeight:"bold",
    },
    iconliked: {
        color: '#DC143C',
        fontSize: 30,
    },
    s22: {
        marginLeft: 20,
    },
    s3: {
        width: '100%',
        backgroundColor: '#dde1f0',
        padding: 10,
    },
    commentuser: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,

    },
    commenttext: {
        color: 'grey',
        fontSize: 17,
        marginLeft: 5,
    },
    s31: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
    }
})

export default FreelancerJobcard;   