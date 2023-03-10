import React from 'react';
import { View, Text,ScrollView, StyleSheet,TouchableOpacity,Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {  useRef,useState } from 'react';
const Jobcard = (
{
    profile_image,
    title,
    description,
    username,
    skills,
    bids,
    hourlyrate,
}
) => {
   
    
    const [showbids, setShowbids] = useState(false);
    
    return (
        <View style={styles.container}>
        <View style={styles.c1}>
            <Image source={{ uri: profile_image }} style={styles.profilepic} />
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.username}>{title}</Text>
        </View>
    
            <Text style={styles.textstyling}>hourlyrate $/hr:{hourlyrate}</Text>
            <Text style={styles.textstyling}>description : {description}</Text>   
            <Text style={styles.textstyling}>skills : {skills.join(",")}</Text>
            <View style={styles.s2}>
            <TouchableOpacity
            onPress={
                    () => {
                        setShowbids(!showbids)
                    }
                }>
                <FontAwesome name="comment" size={24} color="white" style={styles.icons1} 
                 />
            </TouchableOpacity>    
            </View>
        </View>

  
        //  {showbids == true &&
        //     <View style={styles.s3}>
        //          {
        //              bids.map((item, index) => {
        //                 return (
        //                      <View style={styles.s31} key={item.id}>
        //                         <Text style={styles.biduser}>{item.username}</Text>
        //                          <Text style={styles.bidrate}>{item.hourlyrate}</Text>
        //                          <Text style={styles.bidtext}>{item.comment}</Text>
                                
        //                      </View>
        //                 )
        //             })
        //         }
        //      </View>
        // }
 

    
)
}



const styles = StyleSheet.create({
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
    },
    s21: {
        // width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    notliked: {
        color: 'grey',
        marginLeft: 5,
        fontSize: 25,
    },
    liked: {
        color: '#DC143C',
        marginLeft: 5,
        fontSize: 25,
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
        backgroundColor: '#111111',
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

export default Jobcard;   