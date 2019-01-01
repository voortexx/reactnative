import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  Button
} from "react-native";
import axios from "axios";
import Match from "./Match";

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = { matches: [], isLoading: false, status: "FINISHED" };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get(
        `https://api.football-data.org//v2/teams/57/matches?status=FINISHED`,
        {
          headers: {
            accept: "application/json",
            "X-Auth-Token": "2dcfa7491ad84f4ea493fef5f02de9fb"
          }
        }
      )
      .then(res => {
        this.setState({ isLoading: false, matches: res.data.matches });
      });
  }
  render() {
    return (
      <View style={styles.main_container}>
        <FlatList
          data={this.state.matches}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Match match={item} />}
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
    marginTop: 20,
    flex: 1
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 300,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Matches;
