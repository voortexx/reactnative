import React from "react";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import axios from "axios";
import images from "../Helpers/avatars";
import ageCalculation from "../Helpers/ageCalculation";
import formatBirthDate from "../Helpers/formatBirthDate";

class PlayerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { player: {} };
  }
  componentDidMount() {
    axios
      .get(
        `http://192.168.1.23:3001/players/${this.props.navigation.getParam(
          "playerId"
        )}`,
        {
          headers: {
            accept: "application/json"
          }
        }
      )
      .then(res => {
        this.setState({ player: res.data[0] });
      });
  }
  render() {
    return (
      <View style={styles.main_container}>
        <ImageBackground
          source={require("../Images/bg_player.png")}
          style={{ width: "100%", height: "100%", flexDirection: "column" }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              style={styles.image}
              source={images[this.state.player.photo]}
            />
          </View>
          <View style={styles.content_container}>
            <View style={styles.player_identity_container}>
              <Text style={styles.name_text}>{this.state.player.name}</Text>
              <Text style={styles.firstname_text}>
                {this.state.player.firstname}
              </Text>
              <Text style={styles.poste_text}>
                {this.state.player.poste_name}
              </Text>
            </View>
            <View style={styles.shirt_number_container}>
              <Text style={styles.shirt_number_text}>
                {this.state.player.shirt_number}
              </Text>
            </View>
          </View>
          <View
            style={{
              margin: 10,
              paddingTop: 20,
              borderTopWidth: 3,
              borderTopColor: "#201F76"
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                flexWrap: "wrap",
                color: "#201f76"
              }}
            >
              Personal Details
            </Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <View
                style={{
                  flex: 1,
                  borderRightWidth: 1,
                  borderRightColor: "#dcdcdc",
                  paddingRight: 10
                }}
              >
                <Text style={{ fontWeight: "bold", color: "#201f76" }}>
                  Nationality
                </Text>
                <Text style={{ color: "#201f76" }}>
                  {this.state.player.nationality}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  borderRightWidth: 1,
                  borderRightColor: "#dcdcdc",
                  paddingLeft: 10,
                  paddingRight: 10
                }}
              >
                <Text style={{ color: "#201f76" }}>Date of Birth</Text>
                <Text style={{ fontWeight: "bold", color: "#201f76" }}>
                  {formatBirthDate(this.state.player.birthdate)}
                </Text>
                <Text style={{ color: "#201f76" }}>Age</Text>
                <Text style={{ fontWeight: "bold", color: "#201f76" }}>
                  {ageCalculation(this.state.player.birthdate)}
                </Text>
              </View>
              <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
                <Text style={{ color: "#201f76" }}>Height</Text>
                <Text style={{ fontWeight: "bold", color: "#201f76" }}>
                  {this.state.player.height}cm
                </Text>
              </View>
            </View>
          </View>
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
  image: {
    width: 120,
    height: 120,
    marginTop: 40,
    backgroundColor: "#fff",
    borderRadius: 80
  },
  content_container: {
    flexDirection: "row",
    margin: 10
  },
  player_identity_container: {
    flex: 3,
    flexDirection: "column"
  },
  name_text: {
    fontWeight: "bold",
    fontSize: 20,
    flexWrap: "wrap",
    paddingRight: 5,
    color: "#201f76"
  },
  firstname_text: {
    fontSize: 20,
    flexWrap: "wrap",
    paddingRight: 5,
    color: "#201f76"
  },

  poste_text: {
    fontSize: 14,
    paddingRight: 5,
    marginTop: 5,
    color: "#201f76"
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

export default PlayerDetail;
