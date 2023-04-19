import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assets/images/WROKNOWLOGO.png';

const TopNavBar = ({ page }) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    // Clear the profile data from async storage
    await AsyncStorage.removeItem('profileData');
    // Navigate to the Login page
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo2} />
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    backgroundColor: '#1779ba',
  },
  logo2: {
    height: 60,
    resizeMode: 'contain',
    borderRadius: 10,
    width: 60,
    paddingLeft: 100,
  },
  logoutButton: {
    marginRight: 10,
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TopNavBar;
