import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";
import background from "../assets/bg.png";
import logo from "../assets/logo.png";
import { Link } from "expo-router";
import CardMenu from "@/components/CardMenu";

export default function Home() {
  const menuItems = [
    { title: "Let's Play Some", image: require("../assets/billiard.png") },
    { title: "Leaderboard", image: require("../assets/podium.png") },
    { title: "Games History", image: require("../assets/history.png") },
    { title: "Add Player", image: require("../assets/player.png") },
  ];

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.image}>
        <Image source={logo} style={styles.logo} />
        <FlatList
          horizontal
          data={menuItems}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }) => (
            <CardMenu image={item.image} title={item.title} />
          )}
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  logo: {
    resizeMode: "contain",
    width: 330,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  image: {
    flex: 1,
    resizeMode: "cover",

    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
});
