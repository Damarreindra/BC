import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Pressable,
  FlatList,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";

const Match = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const glob = useGlobalSearchParams();

  const getMatch = async () => {
    try {
      const response = await fetch(
        `http://192.168.100.5:3000/api/game/${glob.id}`
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

 

  const addScore = async (id) => {
    try {
      const response = await fetch(
        "http://192.168.100.5:3000/api/game/updateScore",
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            matchId: `${glob.id}`,
            playerId: id,
            score: 1,
          }),
        }
      );
      if (response.ok) {
        getMatch();
      } else {
        const errorData = await response.json();
        console.error("Failed to update score:", errorData.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const decrementScore = async (id) => {
    try {
      const response = await fetch(
        "http://192.168.100.5:3000/api/game/updateScore",
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            matchId: `${glob.id}`,
            playerId: id,
            score: -1,
          }),
        }
      );
      if (response.ok) {
        getMatch();
      } else {
        const errorData = await response.json();
        console.error("Failed to update score:", errorData.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  

  useEffect(() => {
    getMatch();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!data || !data.players) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No data available</Text>
      </View>
    );
  }

  const winner = data.players.sort((a,b) => b.score - a.score)





  const getWinner = async () =>{
    try {
        const response = await fetch(
          "http://192.168.100.5:3000/api/game/getWinner",
          {
            method: "PATCH",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              matchId: `${glob.id}`,
              playerId: winner[0].player._id,
            
            }),
          }
        );
        if (response.ok) {
            router.replace(`/home`)

        } else {
          const errorData = await response.json();
          console.error("Failed to update score:", errorData.message);
        }
      } catch (error) {
        console.log(error.message);
      }
  }
  const deleteMatch = async () =>{
    try {
      const response = await fetch(
        "http://192.168.100.5:3000/api/game/",
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            matchId: `${glob.id}`,
           winnerId:data.winner
          }),
        }
      );
      if (response.ok) {
        router.back()
      } else {
        const errorData = await response.json();
        console.error("Failed to update score:", errorData.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handlePress = () => {
    Alert.alert(
      "Confirm Navigation",
      "Are you sure you want to delete this match?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deleteMatch();
          },
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={18} color="#fe6b1d" />
        </Pressable>
        <Pressable onPress={() => handlePress()} style={styles.trashButton}>
          <FontAwesome name="trash" size={24} color="#fe6b1d" />
        </Pressable>
        <Text style={styles.headerTitle}>Match Time</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Players</Text>
        <FlatList
          data={data.players}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.playerList}
          renderItem={({ item }) => (
            <View style={styles.playerCard}>
              <Image
                style={styles.playerImage}
                source={{ uri: item.player.photoUrl }}
              />
              <Text style={styles.playerName}>{item.player.username}</Text>
              <Text style={styles.playerScore}>{item.score} pts</Text>
              <View style={{display:'flex',flexDirection:'row-reverse'}}>
              <Pressable
                style={styles.addButton}
                onPress={() => addScore(item.player._id)}
              >
                <AntDesign name="pluscircleo" size={20} color="#fe6b1d" />
              </Pressable>
              <Pressable
                style={styles.addButton}
                onPress={() => decrementScore(item.player._id)}
              >
                <AntDesign name="minuscircleo" size={20} color="#fe6b1d" />
              </Pressable>
              </View>
            </View>
          )}
        />
      </View>

      <View style={styles.footer}>
      <Pressable style={data.winner ? styles.disabledButton : styles.startButton} 
          onPress={()=>getWinner()} 
          >
            <Text style={styles.startButtonText}>Finish Game</Text>
          </Pressable>
       
      </View>
    </SafeAreaView>
  );
};

export default Match;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    fontSize: 18,
    fontFamily: "Montserrat-Medium",
    color: "#333",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 8,
  },
  trashButton:{
    position:'absolute',
    right: 30
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Montserrat-SemiBold",
    color: "#333",
    marginLeft: 16,
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold",
    color: "#333",
    marginBottom: 12,
  },
  playerList: {
    paddingBottom: 8,
  },
  playerCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: "center",
    width: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerImage: {
    width: 100,
    height: 100,
    borderRadius: 30,
    marginBottom: 8,
  },
  playerName: {
    fontSize: 14,
    fontFamily: "Montserrat-SemiBold",
    color: "#333",
    marginBottom: 4,
    textAlign: "center",
  },
  playerScore: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    color: "#fe6b1d",
  },
  footer: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  startButton: {
    backgroundColor: "#fe6b1d",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  disabledButton:{
    backgroundColor: "#ccc", 
    padding: 10,
    borderRadius: 5,
    opacity: 0.5, 
  },

  startButtonText: {
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
    color: "#fff",
  },
  addButton: {
    padding: 4,
    marginTop: 5,
  },
});
