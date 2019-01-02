import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  Button,
  ImageBackground
} from "react-native";
import axios from "axios";
import Match from "./Match";

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = { matches: [], isLoading: false, status: "FINISHED" };
  }
  componentDidMount() {
    this.getMatches(this.state.status);
  }

  getMatches(status) {
    this.setState({ isLoading: true });
    axios
      .get(
        `https://api.football-data.org//v2/teams/57/matches?status=${status}`,
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

  switchStatus(status) {
    this.setState({ status: status }, this.getMatches(status));
  }
  render() {
    return (
      <View style={styles.main_container}>
        <ImageBackground
          source={require("../Images/bg_player.png")}
          style={{ width: "100%", height: "100%", flexDirection: "column" }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20
            }}
          >
            <Button
              color={this.state.status === "FINISHED" ? "#FF0000" : "#dcdcdc"}
              title="Results"
              onPress={() => this.switchStatus("FINISHED")}
            />
            <Button
              color={this.state.status === "SCHEDULED" ? "#FF0000" : "#dcdcdc"}
              title="Fixtures"
              onPress={() => this.switchStatus("SCHEDULED")}
            />
          </View>
          {this.state.isLoading ? (
            <View style={styles.loading_container}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <View>
              <FlatList
                data={this.state.matches}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Match match={item} />}
              />
            </View>
          )}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#eaeaea"
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 50,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Matches;
