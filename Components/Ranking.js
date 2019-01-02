import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  Image
} from "react-native";
import axios from "axios";

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ranking: {}, isLoading: false };
  }
  componentDidMount() {
    this.getRanking();
  }

  getRanking() {
    this.setState({ isLoading: true });
    axios
      .get(`https://api.football-data.org/v2/competitions/2021/standings`, {
        headers: {
          accept: "application/json",
          "X-Auth-Token": "2dcfa7491ad84f4ea493fef5f02de9fb"
        }
      })
      .then(res => {
        console.log(res.data.season.currentMatchday);
        this.setState({ isLoading: false, ranking: res.data });
      });
  }

  render() {
    return (
      <View style={styles.main_container}>
        <ImageBackground
          source={require("../Images/bg_player.png")}
          style={{ width: "100%", height: "100%", flexDirection: "column" }}
        >
          {this.state.ranking.competition && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                margin: 10
              }}
            >
              <Text style={{ fontWeight: "bold", color: "#201F76" }}>
                Matchweek {this.state.ranking.season.currentMatchday}
              </Text>
              <Image
                style={{ height: 50, width: 150 }}
                source={require("../Images/premierleague_logo.png")}
                resizeMode="contain"
              />
            </View>
          )}
          {this.state.isLoading ? (
            <View style={styles.loading_container}>
              <ActivityIndicator size="large" />
            </View>
          ) : null}
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

export default Ranking;
