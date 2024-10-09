import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import background from "../assets/bg.png";
import logo from "../assets/logo.png";
import CardMenu from "@/components/CardMenu";
import { useEffect, useState } from "react";
import SliderItem from "@/components/SliderItem";
import Button from "@/components/Button";
import { Link, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
const { height } = Dimensions.get("screen");

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const router = useRouter()

  const getPlayer = async () => {
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
    getPlayer();
  }, []);

  const menuItems = [
    {
      title: "Let's Play Some",
      image: require("../assets/billiard.png"),
      href: "/selectPlayer",
    },
    {
      title: "Games History",
      image: require("../assets/history.png"),
      href: "/history",
    },
    {
      title: "Add Player",
      image: require("../assets/player.png"),
      href: "/addPlayer",
    },
  ];

  return (
    <View style={styles.container}>
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
 <View>
    </View>
        <FlatList
          data={menuItems}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }) => (
            <CardMenu image={item.image} title={item.title} href={item.href} />
          )}
          showsVerticalScrollIndicator={false}
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
    paddingVertical: 20,
    gap: 20,
    paddingBottom: 100, 

  },
  logo: {
    resizeMode: "contain",
    width: 300,
    height: 100,
    marginTop: 50,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    height:height
  },
  menuScroll: {
    justifyContent: "center",
    alignItems: "center",
  },
});
