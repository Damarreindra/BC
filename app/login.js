import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import Logo from "../assets/logo.png";
import { Link } from "expo-router";

import { FontAwesome } from "@expo/vector-icons";
import LoginForm from "../components/form/LoginForm";
import LottieView from "lottie-react-native";

import BilliardLottie from "../assets/billiardLottie.json"
import { RotateInDownLeft } from "react-native-reanimated";

export default function Login() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Link href="/" asChild>
      <Pressable style={styles.icon}>
      <FontAwesome
        name="arrow-left"
        size={18}
        color="#25292e"
      />
      </Pressable>
    </Link>
    <View style={styles.welcome}>
      <LottieView style={{flex:1,   transform: [{ rotate: '18deg'}]}} source={require('../assets/billiardLottie.json')} autoPlay loop/>
      </View>
      <Text style={styles.header}>Log in</Text>
      <Text style={styles.text}>Login to start using BilliardChamps</Text>
      <LoginForm/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    fontSize: 42,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    alignSelf: "flex-start",
    marginLeft: 16,
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: "sans-serif",
    alignSelf: "flex-start",
    marginLeft: 16,
    color:"#A9A9A9"

  },
  image: {
    width: 320,
    resizeMode: "contain",
  },
  icon: {
    alignSelf: "flex-start",
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 24
  },
  welcome:{
    height:120,
    aspectRatio:1
, position:'absolute',
right:0,
top:20,

}
});
