import React, { Component } from "react";
import { Text, View } from "react-native";
import formatDate from "../Helpers/formatDate";

class Match extends Component {
  render() {
    const match = this.props.match;

    return (
      <View style={{ flex: 1, flexDirection: "column", margin: 10 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text style={{ fontWeight: "bold" }}>
            {formatDate(match.utcDate)}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            borderColor: "#dcdcdc",
            borderTopWidth: 1,
            borderBottomWidth: 1
          }}
        >
          <View style={{ flex: 6, textAlign: "right", margin: 5 }}>
            <Text numberOfLines={1} style={{ textAlign: "right" }}>
              {match.homeTeam.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: 3,
              justifyContent: "center",
              backgroundColor: "#201f76",
              margin: 5
            }}
          >
            <Text style={{ color: "#fff" }}>
              {match.score.fullTime.homeTeam}
            </Text>
            <Text style={{ color: "#fff" }}> - </Text>
            <Text style={{ color: "#fff" }}>
              {" "}
              {match.score.fullTime.awayTeam}
            </Text>
          </View>
          <View style={{ flex: 6, margin: 5 }}>
            <Text numberOfLines={1}>{match.awayTeam.name}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Match;
