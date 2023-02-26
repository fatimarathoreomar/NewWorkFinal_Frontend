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
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
       <Stack.Screen name="Login" component={Login}/>
       <Stack.Screen name="Signup" component={Signup}/>  
        <Stack.Screen name="FreelancerProfile" component={FreelancerProfile}/>
        <Stack.Screen name="RecruiterProfile" component={RecruiterProfile}/>
        <Stack.Screen name="NewPassword" component={NewPassword}/>  
        <Stack.Screen name="VerifyEmail" component={VerifyEmail}/> 
        <Stack.Screen name="Jobsearch" component={Jobsearch}/>
        <Stack.Screen name="AddSkills" component={AddSkills}/> 
        <Stack.Screen name="HourlyRateandBio" component={HourlyRateandBio}/>
         <Stack.Screen name="Bioandcompany" component={Bioandcompany}/> 
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



