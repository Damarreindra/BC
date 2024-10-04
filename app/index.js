import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import background from "../assets/bg.png";
import logo from "../assets/logo.png";
import { Link } from "expo-router";
import Button from "@/components/Button";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.image}>
        <View style={styles.buttonContainer}>
          <Image source={logo} style={styles.logo} />
          <View style={{marginTop:75, 
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 3,
         
            elevation: 5,}}>
          <Link  href={"/login"} asChild>
            <Button label={"Let's Start"} theme={"primary"} />
          </Link>
          <Link  href={"/home"} asChild>
            <Button label={"to home"} theme={"primary"} />
          </Link>
          </View>
          
        </View>
        
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
