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
import { useNavigation } from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TopNavBar from '../../components/TopNavBar';
import { useRoute } from '@react-navigation/native';
import { getData, storeData } from '../../components/Atoms/MyLocalStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

    

      
    
    const Bioandcompany= () => {
        //const route = useRoute();
        //const { data } = route.params;
        const navigation = useNavigation();     
        const [bio,setbio] = useState("");
        const [company,setcompany]=useState("");
        const [errormsg, setErrormsg] = useState(null);




        
    const NextButtonHandler =() =>{
      
       
   AsyncStorage.getItem('signupdata')
  .then((value) => {
    const data = JSON.parse(value);
    const _id=data.recruiter._id;
    console.log('async user data', data);
    const fdata={bio,company,_id}//add user data here
        fetch('http://192.168.1.98:3000/AddBioandcompany',{
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
                else if (data.message=="recruiter updated"){
                    //dispatchEvent(setUser(fdata));
                    //alert('Sucessful');
                    storeData('updatedrecruiter',JSON.stringify(data));
                    alert("Your profile is ready!Login Now")
                   navigation.navigate("Login",{data});
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
        
           
        const handleInputChange = (value) => {
            if(value.lenght<=4) {
              setErrormsg('Please enter a name with lenght greater than 4 to see the next button');
            }
           
            setcompany(value);
          }
          const handleInputChange2 = (value) => {
            if (value.length<20) {
              setErrormsg('Please enter a few more words to bio for button to appear');
            }
            setbio(value);
          }
         
        return(
            <KeyboardAwareScrollView>
            <View style={styles.Middle}>
            <TopNavBar/>
            <View style={styles.Middle} >
                
                 <Text style={styles.cname}>Add Some more Info For Profile</Text>
             </View>
             

           <View  >  
           <View style={styles.bio}>
           {/* <Text style={styles.namebio}>Bio</Text> */}
           <TextInput 
            style={styles.textInput}
            onChangeText={handleInputChange2}
            returnKeyType="next"
            //onPressIn={() => setErrormsg(null)}
            //variant = "outline"
            value={bio}
            placeholder = "    Input Bio here"
            placeholderTextColor='#00BFFF'
            multiline={true}
            numberOfLines={6}
            onPressIn={() => setErrormsg(null)}
                    
            />
            </View>
              
             <TextInput
                style={styles.textInput2}
                onChangeText={handleInputChange}
                onPressIn={() => setErrormsg(null)}
               value={company}
               placeholderTextColor='#00BFFF' 
               returnKeyType="next"
              
               placeholder="   Input company name or None"
              
            />

    
            </View>
      
      
        <View style={styles.Middle}>
        {bio.length >= 20  && company.length >= 4 ? (
             <TouchableOpacity
             style={styles.LoginButton}
             onPress={NextButtonHandler}
           
             >
            <Text style={styles.loginHereText}>Next</Text>
             </TouchableOpacity>
             ) : null}
         

         
         </View>   
         {
            errormsg ? <Text style={styles.error}>{errormsg}</Text>:null
        }     
    </View>
         </KeyboardAwareScrollView>
)}



export default()=> {
    return (
        <NativeBaseProvider>
         <Bioandcompany/>
        </NativeBaseProvider>
     )}
        
    const styles= StyleSheet.create({
        error:{
         color:'red',
         marginTop:20,
         fontWeight:'bold',
        },
        simpletext:{
            fontSize:20,  
            color: '#00BFFF',
            marginLeft:10,
            marginBottom:15,
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
            fontSize: 35,
            fontWeight:'bold',
            // fontFamily: 'UbuntuLight',
            paddingTop:50,
            marginBottom:40,
            textAlign: 'center',
            marginTop:40,
          }, 
          container: {
            flex: 1,
            alignItems: 'center',
            justifyContent:'center',
            //height:'100%',
            paddingTop: 40,
          },
          bio: {
            paddingLeft:30,
            paddingRight:15,
            paddingTop:30,
            paddingBottom:10,
          },
          namebio: {
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 5,
            paddingLeft:15,
        },
        textInput: {

            borderWidth: 5,
            borderColor:'#00BFFF',
            //width: 250,
            borderRadius: Math.round(45 / 2),
            height: 300,
            width:350,
            marginBottom:30,
          },
          textInput2: {

            borderWidth: 5,
            borderColor:'#00BFFF',
            //width: 250,
            borderRadius: Math.round(45 / 3),
            height: 50,
            width:350,
            marginLeft:25,
          },
    })       
