import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TermsAndConditions({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        By using this app, you agree to our terms and conditions. Make sure to
        follow restaurant policies.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.buttonText}>I Agree</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBE3DA",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
