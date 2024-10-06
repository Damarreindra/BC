import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Dimensions
} from "react-native";
import background from "../assets/bg.png";
import logo from "../assets/logo.png";
import CardMenu from "@/components/CardMenu";
import { useEffect, useState } from "react";
import SliderItem from "@/components/SliderItem";
const {height} = Dimensions.get('screen')

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch("http://192.168.100.5:3000/api/players");
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

  const menuItems = [
    { title: "Let's Play Some", image: require("../assets/billiard.png") },
    { title: "Leaderboard", image: require("../assets/podium.png") },
    { title: "Games History", image: require("../assets/history.png") },
    { title: "Add Player", image: require("../assets/player.png") },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={background} style={styles.image}>
        <Image source={logo} style={styles.logo} />
        <FlatList
          data={data}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          renderItem={({ item, index }) => (
            <SliderItem item={item} index={index} />
          )}
          horizontal
        />

        <FlatList
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
    flexDirection: "column",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  logo: {
    resizeMode: "contain",
    width: 300,
    height:100,
    marginTop:50
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
