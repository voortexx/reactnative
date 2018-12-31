import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  FlatList
} from "react-native";
import axios from "axios";
import Player from "./Player";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { players: [], search: "" };
  }
  componentDidMount() {
    axios
      .get(`http://192.168.1.23:3001/players`, {
        headers: {
          accept: "application/json"
        }
      })
      .then(res => {
        this.setState({ players: res.data });
      });
  }

  searchPlayer(text) {
    this.setState({ search: text }, this.getPlayersBySearch);
  }

  getPlayersBySearch() {
    this.state.search.length > 0
      ? axios
          .get(`http://192.168.1.23:3001/search/${this.state.search}`, {
            headers: {
              accept: "application/json"
            }
          })
          .then(res => {
            this.setState({ players: res.data });
          })
      : axios
          .get(`http://192.168.1.23:3001/players`, {
            headers: {
              accept: "application/json"
            }
          })
          .then(res => {
            this.setState({ players: res.data });
          });
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          style={[styles.textinput, { marginBottom: 10 }]}
          placeholder="Chercher un joueur"
          onChangeText={text => this.searchPlayer(text)}
        />
        <Button
          style={{ height: 50 }}
          title="Rechercher"
          onPress={() => this._loadFilms()}
        />
        <FlatList
          data={this.state.players}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Player player={item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 30
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5
  }
});

export default Search;
