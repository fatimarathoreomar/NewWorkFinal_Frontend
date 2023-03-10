import { useState, useEffect } from 'react';
import { NativeBaseProvider, Image, useStyledSystemPropsResolver, Center} from 'native-base';
import {
  ActivityIndicator,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import TopNavBar from '../../components/TopNavBar';
import {storeData,getData} from '../../components/Atoms/MyLocalStore'
import AsyncStorage from '@react-native-async-storage/async-storage';
const renderItem = ({ item }) => (
    <TouchableOpacity  onPress={() => AddToMySkills(index,item)} >
    <View  key={index} style={styles.itemContainer}>
    <Text style={styles.itemText}>{item}</Text>
    
  </View>
  </TouchableOpacity>
  );

const AddSkills = () => {
    const route = useRoute();
    //const { data } = route.params;
    const navigation = useNavigation();
    const [myskills,setskill]=useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [skillss,setskills] =useState(["Web Developer","Mobile Developer","Full Stack developer","Backend developer","System Arcitect","Videoographer","Data Entry Specialist","Photographer","logo maker","Homework helper","Editor","Content Creator","Virtual assistant","Writer","UI/UX Designer"]);
    //const [userdata, setUserdata] = React.useState(null),
    const AddToMySkills = (index,item) => {
        let skillscopy=[...myskills];
        skillscopy.splice(skillsList.length, 0, item);
        skillscopy.setskills(skillscopy);
 
}

   
  
    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.SkillButton} onPress={() => addSkill(item)}>
        <Text style={styles.itemText}>{item}</Text>
      </TouchableOpacity>
    );
  
    const addSkill = (skill) => {
      setSelectedSkills([...selectedSkills, skill]);
      setskills(skillss.filter((s) => s !== skill));
    };



    const NextButtonHandler =() =>{
        console.log("Inside next")
        const skills=selectedSkills;
      //user
   AsyncStorage.getItem('Profiledata')
  .then((value) => {
    const data = JSON.parse(value);
    const _id=data.freelancer.user_id;
    console.log('async user data', data);
    const fdata={skills,_id}//add user data here
        fetch('http://192.168.1.98:3000/AddSkillsfreelancer',{
               method : 'POST',
               headers : {
                   'Content-Type':'application/json'
               },
               body: JSON.stringify(fdata)

           }).then(res => res.json()).then(
            async data => {
                console.log(data);
                if (data.error) {
                    //setErrormsg(data.error);
                    console.log("session expired")
                    navigation.navigate("Login");
                }
                else if (data.message=='freelancer skills updated'){
                    //dispatchEvent(setUser(fdata));
                    alert('Sucessful');
                    storeData('Profiledata',JSON.stringify(data));
                   navigation.navigate("HourlyRateandBio",{data});
                   }
                }
            )
            .catch(err =>{
                alert(err)
            })

  })
  .catch((error) => {
    console.log(error);
  });
        
  }
   
    return(
        <View>
        <TopNavBar/>
        <View style={styles.Middle} >
            
             <Text style={styles.cname}>Add Skills</Text>
         </View> 
        <Text style={styles.simpletext}>Select Skills you want to add to your profile</Text>
       <View style={styles.listContainer}> 
      <FlatList
        data={skillss}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={2}
        //contentContainerStyle={styles.listContainerflatlist}
        
      />
      </View>
      
      <View >
        <Text style={styles.simpletext}>Selected Skills:</Text>
        <View style={styles.listContainer}>
        {selectedSkills.map((skill) => (
           <View style={styles.SkillButton} key={skill}> 
          <Text style={styles.itemText} >{skill}</Text>
          </View>
        ))}
        </View>
      </View>
    
    

      <View style={styles.Middle}>
        {selectedSkills.length >= 3 ? (
             <TouchableOpacity
             style={styles.LoginButton}
             onPress={NextButtonHandler}
             >
            <Text style={styles.loginHereText}>Next</Text>
             </TouchableOpacity>
             ) : null}

         </View>   
    </View>     
    
    
    )}


    export default ()=> {
    return (
        <NativeBaseProvider>
            <AddSkills/>
        </NativeBaseProvider>
    )}

    const styles= StyleSheet.create({
        listContainer: {
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          },
        

          itemContainer: {
            alignItems: 'center',
            backgroundColor: '#f7f7f7',
            padding: 16,
            borderRadius: 4,
            marginBottom: 20,
            width:'100%',
            borderRadius: Math.round(45 / 2),
           
          },
          simpletext:{
            fontSize:20,  
            color: '#00BFFF',
            marginLeft:10,
            marginBottom:15,
          },
          itemText: {
            color:"#FFFFFF",
            alignItems:'center',
            justifyContent:'center', 
            fontWeight:'bold',
            fontSize: 20,
            
          },
        loginHereText: {
        color: '#FFFFFF',
        fontWeight:'bold',
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 10,
      },
      LoginButton: {
        backgroundColor: '#1779ba',
        marginTop:20,
        marginBottom:20,
        width: 250,
        borderRadius: Math.round(45 / 2),
        height: 45,
       },
       LoginText:{
        
        marginTop:100,
        fontSize:30,
        fontWeight:'bold',

    },
    SkillButton: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        borderWidth: 5,
        borderColor:'#00BFFF',
        backgroundColor: '#00BFFF',
        marginTop:5,
        marginBottom:5,
        borderRadius: Math.round(45 / 2),
        marginRight:5,
        marginLeft:5,
        
       },
    Middle:{
        alignItems:'center',
        justifyContent:'center',

    },
    cname: {
        color: '#1779ba',
        fontSize: 45,
        fontWeight:'bold',
        // fontFamily: 'UbuntuLight',
        paddingTop:50,
        marginBottom:40,
        textAlign: 'center',
        marginTop:30,
      },

    })
    