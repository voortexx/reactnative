import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import images from "../Helpers/avatars";

class Player extends Component {
  render() {
    const player = this.props.player;

    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={() =>
          this.props.navigation.navigate("PlayerDetail", {
            playerId: player.id
          })
        }
      >
        <ImageBackground
          source={require("../Images/bg_player.png")}
          style={{ width: "100%", height: "100%", flexDirection: "row" }}
        >
          <Image style={styles.image} source={images[player.photo]} />
          <View style={styles.content_container}>
            <View style={styles.player_identity_container}>
              <Text style={styles.name_text}>{player.name}</Text>
              <Text style={styles.firstname_text}>{player.firstname}</Text>
              <Text style={styles.poste_text}>{player.poste_name}</Text>
            </View>
            <View style={styles.shirt_number_container}>
              <Text style={styles.shirt_number_text}>
                {player.shirt_number}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    height: 120,
    flexDirection: "row",
    backgroundColor: "#eaeaea",
    marginBottom: 20
  },
  image: {
    width: 120,
    height: 120
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
    color: "#FF0000"
  }
});

export default Player;
