import React from "react";
import Logo from "./Logo";
import { StyleSheet, View, Linking, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

class Home extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{ flex: 6, alignItems: "center", justifyContent: "center" }}
        >
          <Logo height={250} width={250} />
        </View>

        <View
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ marginTop: 20, color: "#201F76" }}>
            Made by <Text style={{ fontWeight: "bold" }}>Raymond</Text>
          </Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text
              style={{ margin: 5 }}
              onPress={() =>
                Linking.openURL(
                  "http://https://www.facebook.com/fabien.raymond.98.fr"
                ).catch(err => console.error("An error occurred", err))
              }
            >
              <Ionicons
                name="logo-facebook"
                style={{ fontSize: 30, color: "#201F76" }}
              />
            </Text>
            <Text
              style={{ margin: 5 }}
              onPress={() =>
                Linking.openURL(
                  "https://www.linkedin.com/in/fabien-raymond-41227114b/"
                ).catch(err => console.error("An error occurred", err))
              }
            >
              <Ionicons
                name="logo-linkedin"
                style={{ fontSize: 30, color: "#201F76" }}
              />
            </Text>
            <Text
              style={{ margin: 5 }}
              onPress={() =>
                Linking.openURL("http://fabienraymond.fr").catch(err =>
                  console.error("An error occurred", err)
                )
              }
            >
              <Ionicons
                name="md-globe"
                style={{ fontSize: 30, color: "#201F76" }}
              />
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Home;
