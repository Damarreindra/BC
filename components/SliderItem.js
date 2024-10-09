import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';

const {width} = Dimensions.get('screen')

const SliderItem = ({ item, index }) => {
  const [fontsLoaded] = useFonts({
 
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  
  });
  return (
    <View style={styles.container}>
        <View style={styles.card}> 
      <Image source={{ uri: item.photoUrl }} style={styles.image} />
      <View>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.text}>{item.wins} Wins</Text>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent:'center',
    gap:20,
    width:width,
   padding:16,

},card:{
    width:'100%',
    height:150,
    backgroundColor: '#fe6b1d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#a5a5a5',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    borderColor: 'black', // Border to give definition
    elevation: 10,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    borderWidth: 2,
    
},text:{
  fontSize:16
},

  image: {
    width: 200, 
    height: 150,
    resizeMode:'contain', 
    marginBottom:2
   
  },
  username: {
    fontSize:24,
    fontFamily: 'Montserrat-Bold',
    fontWeight:'bold'
  },
});

export default SliderItem;