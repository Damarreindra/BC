import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { format } from "date-fns";
import medal from "../assets/medal.png";
import { Link } from "expo-router";

const HistoryCard = ({ item }) => {
  if (!item.players) {
    return null; 
  }

  const players = item.players.filter((p) => p.player && (!item.winner || p.player._id !== item.winner._id));
  const winner = item.winner 
    ? item.players.find((p) => p.player._id === item.winner._id) 
    : null;

  const date = new Date(item.date);
  const formattedDate = format(date, "yyyy-MM-dd H:mma");

  return (
    <Link href={`/match/${item._id}`}>
      <View style={styles.box}>
        <Text style={styles.date}>{formattedDate}</Text>

        {item.winner && (
          <View style={styles.winnerContainer}>
            {item.winner.photoUrl && (
              <Image
                style={styles.winnerImage}
                source={{ uri: item.winner.photoUrl }}
              />
            )}
            <Image source={medal} style={styles.medal} />
            <Text style={styles.winnerUsername}>{item.winner.username}</Text>
            <Text style={styles.winnerScore}>{winner?.score || 0} Pts</Text>
          </View>
        )}

        <View style={styles.playersContainer}>
          {players.map((p) => (
            <View key={p.player._id} style={styles.playerItem}>
              {p.player.photoUrl && (
                <Image
                  style={styles.playerImage}
                  source={{ uri: p.player.photoUrl }}
                />
              )}
              <Text style={styles.playerUsername}>{p.player.username}</Text>
              <Text style={styles.playerScore}>{p.score} Pts</Text>
            </View>
          ))}
        </View>
      </View>
    </Link>
  );
};

export default HistoryCard;

const styles = StyleSheet.create({
  box: {
    width: 320,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 10,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  date: {
    position: "absolute",
    top: 5,
    right: 10,
    color: "#a5a5a5",
    fontSize: 10,
  },
  winnerContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  winnerImage: {
    width: 100,
    height: 100,
  },
  winnerUsername: {
    fontSize: 16,
    fontWeight: "bold",
  },
  winnerScore: {
    fontSize: 12,
    color: "#fe6b1d",
  },
  medal: {
    width: 50,
    height: 50,
    position: "absolute",
    left: 100,
    top: 65,
  },
  playersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    flexWrap: "wrap",
  },
  playerItem: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  playerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  playerUsername: {
    fontSize: 14,
    marginTop: 5,
  },
  playerScore: {
    fontSize: 12,
    color: "#fe6b1d",
  },
});
