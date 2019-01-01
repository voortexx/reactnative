import React, { Component } from "react";
import { Text, View } from "react-native";

class Match extends Component {
  render() {
    const match = this.props.match;

    return (
      <View>
        <Text>{match.competition.name}</Text>
        <Text>{match.utcDate}</Text>
        <Text>{match.homeTeam.name}</Text>
        <Text>{match.score.fullTime.homeTeam}</Text>
        <Text>{match.awayTeam.name}</Text>
        <Text>{match.score.fullTime.awayTeam}</Text>
      </View>
    );
  }
}

export default Match;
