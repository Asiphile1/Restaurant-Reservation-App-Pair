import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function WelcomePage({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.text}>
        Welcome to ZestyReserve! Follow the steps to book a table at your
        favorite restaurant effortlessly.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Terms")}
      >
        <Text style={styles.buttonText}>Got It!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    color: "#333333",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#E75723",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
