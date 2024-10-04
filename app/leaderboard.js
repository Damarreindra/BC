import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View} from 'react-native';
import hof from "../assets/hof.png"
import logo from "../assets/logo.png"
import CardLeaderboard from '@/components/CardLeaderboard';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
        const response = await fetch('http://192.168.100.5:3000/api/players/getChamps');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);


  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
        <View style={styles.textBox}>
       
          <Image style={styles.image} source={hof}/>
        </View>
        <FlatList
          style={{marginTop:8}}
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item, index}) => (
            <View style={{marginTop:10}}>
           <CardLeaderboard username={item.username} pos={index+1} image={item.photoUrl}/>
           </View>
          )}
        />
        </>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop:50
  },
  textBox: {
    height: 100,
    width: '100%', // Full width of the screen
    backgroundColor: '#181C14',
    justifyContent: 'center', // Centers the content vertically
    alignItems: 'center', // Centers the content horizontally
  },
  image: {

    resizeMode: 'contain', // Ensures the image maintains aspect ratio
    width: '90%', // Makes the image 90% of the width of the box
    height: '100%', // Ensures the image takes up the full height of the box
  },
  content:{
  
  }
});


export default App;