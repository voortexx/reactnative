import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import images from "../Helpers/avatars";

class Player extends Component {
  render() {
    console.log(this.props.navigation);
    const { player, getPlayerDetail } = this.props;

    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() => getPlayerDetail(player.id)}
      >
        <Image style={styles.image} source={images[player.photo]} />
        <View style={styles.content_container}>
          <View style={styles.player_identity_container}>
            <Text style={styles.name_text}>{player.name}</Text>
            <Text style={styles.firstname_text}>{player.firstname}</Text>
            <Text style={styles.poste_text}>{player.poste_name}</Text>
          </View>
          <View style={styles.shirt_number_container}>
            <Text style={styles.shirt_number_text}>{player.shirt_number}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 130,
    flexDirection: "row"
  },
  image: {
    width: 120,
    height: 120,
    margin: 5,
    backgroundColor: "gray"
  },
  content_container: {
    flex: 1,
    flexDirection: "row",
    margin: 5
  },
  player_identity_container: {
    flex: 3,
    flexDirection: "column"
  },
  name_text: {
    fontWeight: "bold",
    fontSize: 20,
    flexWrap: "wrap",
    paddingRight: 5
  },
  firstname_text: {
    fontSize: 20,
    flexWrap: "wrap",
    paddingRight: 5
  },

  poste_text: {
    fontSize: 14,
    paddingRight: 5,
    marginTop: 5
  },
  shirt_number_container: {
    flex: 3,
    flexDirection: "column"
  },
  shirt_number_text: {
    fontWeight: "bold",
    fontSize: 50,
    textAlign: "right",
    color: "#666666"
  }
});

export default Player;
