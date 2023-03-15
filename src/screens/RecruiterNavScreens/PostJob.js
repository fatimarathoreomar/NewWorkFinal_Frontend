import { Center } from 'native-base';
import React, { useState } from 'react';
import { View, ScrollView,Text, Modal, TextInput, TouchableOpacity,StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
//hourlyrate,description,skills,title,status,recruiter(id),createdAt
const PostJob= () => {
    const navigation = useNavigation();
  const [errormsg, setErrormsg] = useState(null);
  const [hourlyrate, sethourlyrate] = useState(0);
  const [description, setdescription] = useState('');
  const [title, settitle] = useState('');
  const [skills, setskills] = useState('');
  const [skill,setskill] = useState('');
 
  const handleButtonClick = () => {
    // Do something with inputText
    if(title=="" || hourlyrate==0 || description=="" || skills.length<0){
        setErrormsg("Please fill all fields")
    }
    else{  
    AsyncStorage.getItem('Profiledata').then((value) => {
        const data = JSON.parse(value);
        const user_id = data.recruiter.user_id;
        const _id=data.recruiter._id;
        console.log('async user data', data);
        const fdata = {skills,title,description,hourlyrate,_id,user_id}; // add user data here
        console.log(fdata);
        fetch('http://192.168.1.98:3000/PostJob', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fdata)
        }).then((res) => res.json())
          .then(async (data) => {
            console.log(data);
            if (data.error) {
              //setErrormsg(data.error);
              alert("Connection problem or session expired");
              console.log("session expired");
              navigation.navigate("Login");
            } else if (data.message == "Job Posted Sucessfully") {
              //console.log("got profile data from backend !!")
              //storeData('Profiledata', JSON.stringify(data));
              AsyncStorage.setItem('Profiledata', JSON.stringify(data))
              console.log(data);
              
            }
          })
          .catch((err) => {
            alert(err);
          });
      });
      //setIsModalVisible(false);
      navigation.navigate("MyJobs");
    }
    
  };
  const AddinLocal = () =>{
    //add a skill
    console.log(skill);
    if(skill.length>0){
        const newSkills = [...skills, skill];
        setskills(newSkills);
    }
    setskill('');

  }
  const onDelete = (index) => {
    let skillscopy=[...skills];
    skillscopy.splice(index,1);
    setskills(skillscopy);

  }

  return (
   
   
      <ScrollView>
    <KeyboardAwareScrollView>
    <View style={styles.container}>
        <View>
         <Text style={styles.heading}>Post Job</Text>
          <TextInput onPressIn={() => setErrormsg(null)} style={styles.Inputstyle} placeholder="         Input Job title        " onChangeText={settitle} />
    
          <TextInput style={styles.Inputstyle} onPressIn={() => setErrormsg(null)} keyboardType="numeric" placeholder="       Input hourly rate      " onChangeText={sethourlyrate} />
   
          <TextInput   
            multiline={true}
            numberOfLines={4}
            onPressIn={() => setErrormsg(null)} 
            style={styles.Inputstyle} placeholder="        Input Job description       " onChangeText={setdescription} />
          
          <View style={styles.header}>
          <Text style={styles.textstyle}>Skills </Text>
          <TouchableOpacity style={styles.iconstyle} onPress={AddinLocal}>
          <MaterialIcons name="add" size={24}  color='#1779ba' />
          </TouchableOpacity>
        
          </View>
          
          <TextInput 
            style={styles.Inputstyle}
            value={skill}
            onChangeText={(text) => setskill(text)}
            returnKeyType="next"
            placeholder = "          Input Skills to add          "
         />
         

         <View style={styles.listContainer}>
         {skills.length > 0 ? (
         skills.map((item, index) => (
         <View key={index} style={styles.itemContainer}>
         <Text style={styles.itemText}>{item}</Text>
         <TouchableOpacity onPress={() => onDelete(index)}>
         <FontAwesome name="remove" size={28} color="black" />
        </TouchableOpacity>
      </View>
    ))
          ):null }
</View>
          {
            errormsg ? <Text style={styles.err}>{errormsg}</Text>:null
        }  
        
          <TouchableOpacity style={styles.Submitbut} onPress={handleButtonClick}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>

        </View>
    </KeyboardAwareScrollView>
    </ScrollView>        
    
   
  );
}


export default PostJob;

const styles = StyleSheet.create({
    error:{
        color:"red",
        alignSelf:"center",
        fontWeight:'bold',
        marginTop:15,
        marginBottom:20,
    },
    err:{
        color:"red",
        alignSelf:"center",
    },
    container: {
        //flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        height:'100%',
        width:'100%',
        paddingTop: 30,
      },
      listContainer: {
        flex: 1,
        padding: 16,
      },
      itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf:'center',
        backgroundColor: '#f7f7f7',
        padding: 16,
        borderRadius: 4,
        marginBottom: 20,
        width:'60%',

      },
      itemText: {
        fontSize: 16,
        color:'blue',
      },
      header: {
        flexDirection: 'row',
        alignSelf: 'center',
        //marginLeft:60,
        //marginBottom: 20,
      },
      textstyle:{
        color: '#1779ba',
        fontSize: 25,
        fontWeight:'bold',
        // fontFamily: 'UbuntuLight',
        textAlign: 'center',
        marginBottom:20,
        
      },
      iconstyle:{
          marginTop:5,
      },
      heading:{
        color: '#1779ba',
        fontSize: 35,
        fontWeight:'bold',
        // fontFamily: 'UbuntuLight',
        textAlign: 'center',
        marginBottom:50,
      },
      Inputstyle:{
        borderColor: '#1779ba', 
        borderWidth: 1,
        width:'100%',
        alignSelf:'center',
        marginBottom:20,
      },
      Submitbut:{
        alignSelf:'center',
        backgroundColor: '#1779ba',
        marginTop:20,
        marginBottom:20,
        width: 250,
        borderRadius: Math.round(45 / 2),
        height: 45,
      },
      buttonText:{
           alignSelf:'center',
            color: '#FFFFFF',
            fontWeight:'bold',
            fontSize: 20,
            // textAlign: 'center',
             paddingTop: 8,
      }
    })
    