import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import Billiard from "../assets/billiard.png";
import { useFonts } from "expo-font";
import { Link } from "expo-router";

export default function CardMenu({ image, title, href }) {
  const [fontsLoaded] = useFonts({
    "Montserrat-ExtraBold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
  });

  return (
    <>
      <Link href={href} style={styles.container}>
        <View style={styles.CardContainer}>
          <Image style={styles.image} source={image} />
          <Text style={styles.text}>{title}</Text>
        </View>
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center", 

  },
  CardContainer: {
    width: 320,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 10,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  text: {
    fontSize: 24,
    fontFamily: "Montserrat-ExtraBold",
    fontWeight: "bold",
    marginLeft: 15,
  },
});
