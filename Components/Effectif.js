import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text
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
          .get(`http://10.0.0.155:3001/search/${this.state.search}`, {
            headers: {
              accept: "application/json"
            }
          })
          .then(res => {
            this.setState({ players: res.data, isLoading: false });
          }))
      : (this.setState({ isLoading: true }),
        axios
          .get(`http://10.0.0.155:3001/players`, {
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
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            title="All"
            color="#841584"
            style={{ margin: 5 }}
            onPress={() => this.changeFilter(null)}
          >
            <Text
              style={[
                this.state.filterValue === null && styles.bold,
                { fontSize: 12 }
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              color="#841584"
              style={{ margin: 5 }}
              onPress={() => this.changeFilter("Goalkeeper")}
            >
              <Text
                style={[
                  this.state.filterValue === "Goalkeeper" && styles.bold,
                  { fontSize: 12 }
                ]}
              >
                Goalkeeper
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              color="#841584"
              style={{ margin: 5 }}
              onPress={() => this.changeFilter("Defender")}
            >
              <Text
                style={[
                  this.state.filterValue === "Defender" && styles.bold,
                  { fontSize: 12 }
                ]}
              >
                Defender
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              color="#841584"
              style={{ margin: 5 }}
              onPress={() => this.changeFilter("Midfielder")}
            >
              <Text
                style={[
                  this.state.filterValue === "Midfielder" && styles.bold,
                  { fontSize: 12 }
                ]}
              >
                Midfielder
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              color="#841584"
              style={{ margin: 5 }}
              onPress={() => this.changeFilter("Forward")}
            >
              <Text
                style={[
                  this.state.filterValue === "Forward" && styles.bold,
                  { fontSize: 12 }
                ]}
              >
                Forward
              </Text>
            </TouchableOpacity>
          </View>
        </View>

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
  main_container: {},
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
  },
  bold: {
    fontWeight: "bold"
  }
});

export default Effectif;
