import React from "react";
import Logo from "./Logo";
import { StyleSheet, View } from "react-native";

class Home extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Logo />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default Home;
