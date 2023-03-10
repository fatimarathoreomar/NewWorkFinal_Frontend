{/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

});*/}

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup'
import FreelancerProfile from './src/screens/Profiles/FreelancerProfile'
import RecruiterProfile from './src/screens/Profiles/RecruiterProfile'
import NewPassword from './src/screens/forgotpassword/NewPassword';
import VerifyEmail from './src/screens/forgotpassword/VerifyEmail';
import Jobsearch from './src/screens/Jobsearch';
import AddSkills from './src/screens/Profiles/AddSkills'
import Bioandcompany from './src/screens/Profiles/Bioandcompany'
import HourlyRateandBio from './src/screens/Profiles/HourlyRateandBio';

//Recruiter nav Bar screens
import MyJobs from './src/screens/RecruiterNavScreens/MyJobs'
import MyProjects from './src/screens/RecruiterNavScreens/MyProjects'
import MyPayments from './src/screens/RecruiterNavScreens/MyPayments'
//Freelancer nav Bar screens
import JobSearch from './src/screens/FreelancerNavScreens/JobSearch'
import My_Projects from './src/screens/FreelancerNavScreens/My_Projects'
import My_Payments from './src/screens/FreelancerNavScreens/My_Payments'
import My_jobs from './src/screens/FreelancerNavScreens/My_jobs'


import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
/* ... */
// Wrap your app with the new GestureHandler
 <GestureHandlerRootView style={{ flex: 1 }}>
</GestureHandlerRootView> 
const Stack = createStackNavigator(); 

 function App() {
  return (
    
     <Stack.Navigator screenOptions={{
       headerShown: false,
       }} >
       {/* <Stack.Screen name="Login" component={Login}/>
       <Stack.Screen name="Signup" component={Signup}/>  
        <Stack.Screen name="FreelancerProfile" component={FreelancerProfile}/>
        <Stack.Screen name="RecruiterProfile" component={RecruiterProfile}/>
        <Stack.Screen name="NewPassword" component={NewPassword}/>  
        <Stack.Screen name="VerifyEmail" component={VerifyEmail}/> 
        <Stack.Screen name="Jobsearch" component={Jobsearch}/>
        <Stack.Screen name="AddSkills" component={AddSkills}/> 
        <Stack.Screen name="HourlyRateandBio" component={HourlyRateandBio}/>
         <Stack.Screen name="Bioandcompany" component={Bioandcompany}/>  */}
        
         <Stack.Screen name="MyJobs" component={MyJobs}/> 
         <Stack.Screen name="MyProjects" component={MyProjects}/> 
         <Stack.Screen name="MyPayments" component={MyPayments}/> 

         <Stack.Screen name="My_jobs" component={My_jobs}/> 
         <Stack.Screen name="My_Projects" component={My_Projects}/> 
         <Stack.Screen name="My_Payments" component={My_Payments}/> 
         <Stack.Screen name="JobSearch" component={JobSearch}/> 

     </Stack.Navigator> 
   
   
  );
}

export default () =>{
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}



