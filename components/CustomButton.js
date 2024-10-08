import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const CustomButton = ({ title, onPress, style, textStyle }) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6200ee", 
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    width:50
  },
  text: {
    color: "#fff", 
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomButton;
