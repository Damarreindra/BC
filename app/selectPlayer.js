import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Pressable,
  FlatList,
  Image,
  Dimensions,
  Text,
  SafeAreaView,
} from "react-native";
import { Link, Redirect, useRouter } from "expo-router";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import CustomButton from "@/components/CustomButton";
import { useFonts } from "expo-font";

const { width } = Dimensions.get("screen");

export default function SelectPlayer() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
  });
  const [data, setData] = useState([]);
  const [players, setPlayers] = useState([]);

  

const getPlayer = async () => {
  try {
    const response = await fetch("http://8.215.1.120:3000/api/players");
    const json = await response.json();
    setData(json);
  } catch (error) {
    console.error(error.message);
  }
};

useEffect(() => {
  getPlayer();
}, []);

const addPlayer = (id) => {
  if (!players.includes(id)) {
    setPlayers((prevPlayers) => [...prevPlayers, id]);
  }
};

const removePlayer = (id) => {
  setPlayers((prevPlayers) => prevPlayers.filter((playerId) => playerId !== id));
};

const startMatch = async () => {
  try {
    if (players.length === 0) return;
    const response = await fetch('http://8.215.1.120:3000/api/game', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ playerIds: players })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
   
      router.replace(`/match/${result.match._id}`)
    
    setPlayers([]);
    // Navigate to game screen or show success message
  } catch (error) {
    console.error('Error starting game:', error.message);
  }
};

if (!fontsLoaded) {
  return null;
}

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={18} color="#fe6b1d" />
        </Pressable>
        <Text style={styles.headerTitle}>Select Players</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Available Players</Text>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.playerCard}>
              <Image style={styles.playerImage} source={{ uri: item.photoUrl }} />
              <Text style={styles.playerName}>{item.username}</Text>
              <Pressable
                style={styles.addButton}
                onPress={() => addPlayer(item._id)}
              >
                <AntDesign name="pluscircleo" size={20} color="#fe6b1d" />
              </Pressable>
            </View>
          )}
        />

        <Text style={styles.sectionTitle}>Selected Players</Text>
        <FlatList
          data={players}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const selectedPlayer = data.find((player) => player._id === item);
            if (!selectedPlayer) return null;

            return (
              <View style={styles.playerCard}>
                <Image style={styles.playerImage} source={{ uri: selectedPlayer.photoUrl }} />
                <Text style={styles.playerName}>{selectedPlayer.username}</Text>
                <Pressable
                  style={styles.removeButton}
                  onPress={() => removePlayer(selectedPlayer._id)}
                >
                  <Feather name="trash-2" size={20} color="#fe6b1d" />
                </Pressable>
              </View>
            );
          }}
        />
      </View>

      <View style={styles.footer}>
        <CustomButton
          title="Start Game"
          onPress={startMatch}
          style={styles.startButton}
          textStyle={styles.startButtonText}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
   
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Montserrat-Medium",
    color: '#333',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Montserrat-Medium",
    color: '#333',
    marginBottom: 12,
  },
  playerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    width: 110,
    height: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  playerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  playerName: {
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  addButton: {
    padding: 4,
  },
  removeButton: {
    padding: 4,
  },
  footer: {
    padding: 20,
  },
  startButton: {
    backgroundColor: '#fe6b1d',
    borderRadius: 8,
    width: 'auto',
    paddingVertical: 12,
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    color: '#fff',
  },
});