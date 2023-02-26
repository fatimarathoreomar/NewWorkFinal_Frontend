//import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorage from 'react-native';
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error storing data: ${error}`);
  }
};

const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error(`Error retrieving data: ${error}`);
  }
};