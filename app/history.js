import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Dimensions, // Import the ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import HistoryCard from "@/components/HistoryCard";
import { useRouter } from "expo-router";
const {height} = Dimensions.get('screen')

const History = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  const getMatches = async () => {
    try {
      const response = await fetch("http://8.215.1.120:3000/api/game");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMatches();
  }, []);




  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={18} color="#fe6b1d" />
        </Pressable>
        <Text style={styles.headerTitle}>History</Text>
      </View>

      <View style={{height:height, paddingBottom:150 }}>
        {loading ? ( // Show the loading spinner when data is still being fetched
          <ActivityIndicator size="large" color="#fe6b1d" style={styles.loadingIndicator} />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <HistoryCard item={item} />
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:height,
    
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "white",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Montserrat-Medium",
    color: "#333",
    marginLeft: 16,
  },
  loadingIndicator: {
    marginTop: 20, // Center the loading spinner
  },
});
