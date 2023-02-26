import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


const onDelete= ({items,id}) =>{
 const index= items.findIndex(item => item.id ===id);
 console.log({item})
  items.splice(index,1);

 }



const SkillList = ({ items,onDelete }) => (
  <View style={styles.listContainer}>
    {items.map((item, index) => (
      <View key={index} style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
      <TouchableOpacity>
       
      <FontAwesome name="remove" size={28} color="black"  onPress={() => onDelete(items,index)} />
    </TouchableOpacity>
    </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 16,
    borderRadius: 4,
    marginBottom: 20,
    width:'100%',

  },
  itemText: {
    fontSize: 16,
  },
  remove:{
    right:0,
    marginLeft:10,
    
  }
});

export default SkillList;