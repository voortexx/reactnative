import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  Button
} from "react-native";
import axios from "axios";
import Player from "./Player";

class Effectif extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      search: "",
      isLoading: false,
      filterValue: null,
      filter: []
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get(`http://10.0.0.155:3001/players`, {
        headers: {
          accept: "application/json"
        }
      })
      .then(res => {
        this.setState({ players: res.data, isLoading: false });
      });
  }

  searchPlayer(text) {
    this.setState({ search: text }, this.getPlayersBySearch);
  }

  getPlayersBySearch() {
    this.state.search.length > 0
      ? (this.setState({ isLoading: true }),
        axios
          .get(`http://192.168.1.23:3001/search/${this.state.search}`, {
            headers: {
              accept: "application/json"
            }
          })
          .then(res => {
            this.setState({ players: res.data, isLoading: false });
          }))
      : (this.setState({ isLoading: true }),
        axios
          .get(`http://192.168.1.23:3001/players`, {
            headers: {
              accept: "application/json"
            }
          })
          .then(res => {
            this.setState({ players: res.data, isLoading: false });
          }));
  }

  changeFilter(filter) {
    this.setState({
      filterValue: filter,
      filter: this.state.players.filter(player => player.poste_name === filter)
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.main_container}>
        <TextInput
          style={[styles.textinput, { marginBottom: 10 }]}
          placeholder="Search a player"
          onChangeText={text => this.searchPlayer(text)}
          onSubmitEditing={() => this.getPlayersBySearch()}
        />
        <Button
          title="Forward"
          color="#841584"
          onPress={() => this.changeFilter("Forward")}
        />
        <Button
          title="Defense"
          color="#841584"
          onPress={() => this.changeFilter("Defense")}
        />
        <Button
          title="Goalkeeper"
          color="#841584"
          onPress={() => this.changeFilter("Goalkeeper")}
        />
        <Button
          title="Midfielder"
          color="#841584"
          onPress={() => this.changeFilter("Midfielder")}
        />
        <Button
          title="All"
          color="#841584"
          onPress={() => this.changeFilter(null)}
        />
        <FlatList
          data={
            this.state.filter.length > 0
              ? this.state.filter
              : this.state.players
          }
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Player player={item} navigation={navigation} />
          )}
        />
        {this.state.isLoading ? (
          <View style={styles.loading_container}>
            <ActivityIndicator size="large" />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
    height: 50,
    borderColor: "#c4c4c4",
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Effectif;
