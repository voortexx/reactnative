import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import Player from "./Player";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { players: [], search: "", isLoading: false };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get(`http://192.168.1.23:3001/players`, {
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

  getPlayerDetail(idPlayer) {
    console.log(idPlayer);
    this.props.navigation.navigate("PlayerDetail", { idPlayer: idPlayer });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.main_container}>
        <TextInput
          style={[styles.textinput, { marginBottom: 10 }]}
          placeholder="Chercher un joueur"
          onChangeText={text => this.searchPlayer(text)}
          onSubmitEditing={() => this.getPlayersBySearch()}
        />
        <FlatList
          data={this.state.players}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Player
              player={item}
              getPlayerDetail={this.getPlayerDetail}
              navigation={navigation}
            />
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
    height: 50,
    borderColor: "#000000",
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

export default Home;
