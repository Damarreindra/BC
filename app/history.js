import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  FlatList,
  SafeAreaView
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import HistoryCard from "@/components/HistoryCard";
import { useRouter } from "expo-router";

const history = () => {
  const [data, setData] = useState([]);
  const router = useRouter()
  const getMatches = async () => {
    try {
      const response = await fetch("http://192.168.100.5:3000/api/game");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error.message);
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

      <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => {
            return (
                <View>
                    <HistoryCard item={item}/>
                </View>
            )
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default history;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
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
});
