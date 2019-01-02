import React from "react";
import {
  StyleSheet,
  ScrollView,
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
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: 10
                }}
              >
                <View>
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: "#201F76"
                    }}
                  >
                    Season {this.state.ranking.season.startDate.split("-")[0]} -{" "}
                    {this.state.ranking.season.endDate.split("-")[0]}
                  </Text>
                  <Text style={{ fontWeight: "bold", color: "#201F76" }}>
                    Matchweek {this.state.ranking.season.currentMatchday}
                  </Text>
                </View>
                <Image
                  style={{ height: 50, width: 150 }}
                  source={require("../Images/premierleague_logo.png")}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "stretch",
                    margin: 10,
                    borderBottomWidth: 3,
                    borderBottomColor: "#201F76",
                    paddingBottom: 10,
                    marginBottom: 0
                  }}
                >
                  <Text
                    style={[styles.column, styles.bold, { marginLeft: 5 }]}
                  />
                  <Text
                    numberOfLines={1}
                    style={[styles.column, styles.bold, { flex: 5 }]}
                  />
                  <Text style={[styles.column, styles.bold, styles.center]}>
                    Pts
                  </Text>
                  <Text style={[styles.column, styles.bold, styles.center]}>
                    Pl
                  </Text>
                  <Text style={[styles.column, styles.bold, styles.center]}>
                    W
                  </Text>
                  <Text style={[styles.column, styles.bold, styles.center]}>
                    D
                  </Text>
                  <Text style={[styles.column, styles.bold, styles.center]}>
                    L
                  </Text>
                  <Text style={[styles.column, styles.bold, styles.center]}>
                    GD
                  </Text>
                </View>
                <ScrollView
                  contentContainerStyle={{
                    alignItems: "center",
                    justifyContent: "center",
                    margin: 10,
                    marginTop: 0
                  }}
                >
                  {this.state.ranking.standings &&
                    this.state.ranking.standings[0].table.map((club, index) => (
                      <View
                        key={index}
                        style={[
                          index % 2 == 0 && styles.even,
                          {
                            flexDirection: "row",
                            flex: 1,
                            alignSelf: "stretch",
                            paddingTop: 10,
                            paddingBottom: 10
                          }
                        ]}
                      >
                        <Text
                          style={[
                            styles.column,
                            styles.bold,
                            { marginLeft: 5 }
                          ]}
                        >
                          {club.position}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[styles.column, { flex: 5 }]}
                        >
                          {club.team.name}
                        </Text>
                        <Text
                          style={[styles.column, styles.center, styles.bold]}
                        >
                          {club.points}
                        </Text>
                        <Text style={[styles.column, styles.center]}>
                          {club.playedGames}
                        </Text>
                        <Text style={[styles.column, styles.center]}>
                          {club.won}
                        </Text>
                        <Text style={[styles.column, styles.center]}>
                          {club.draw}
                        </Text>
                        <Text style={[styles.column, styles.center]}>
                          {club.lost}
                        </Text>
                        <Text style={[styles.column, styles.center]}>
                          {club.goalDifference}
                        </Text>
                      </View>
                    ))}
                </ScrollView>
              </View>
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
  },
  column: {
    flex: 1,
    alignSelf: "stretch",
    padding: 5
  },

  bold: {
    fontWeight: "bold"
  },
  center: { textAlign: "center" },
  even: { backgroundColor: "white" }
});

export default Ranking;
