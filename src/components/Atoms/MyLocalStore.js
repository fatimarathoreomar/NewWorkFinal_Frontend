
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store a value
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("Async value not stored ")
  }
};
// Usage
//storeData('myKey', 'myValue');
// Retrieve a value
export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // value previously stored
        return value;
      }
    } catch (e) {
      console.log("Async value is null ")
    }
  };
  
  // Usage
  //getData('myKey');
 

