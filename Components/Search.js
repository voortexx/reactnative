import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";

class Search extends Component {
  render() {
    return (
      <View>
        <TextInput placeholder="Titre du film" />
        <Button title="Rechercher" onPress={() => {}} />
      </View>
    );
  }
}

export default Search;