import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator,
  Linking
} from "react-native";
import Logo from "./Logo";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

class Infos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { infos: [], isLoading: false };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get(`https://api.football-data.org/v2/teams/57`, {
        headers: {
          accept: "application/json",
          "X-Auth-Token": "2dcfa7491ad84f4ea493fef5f02de9fb"
        }
      })
      .then(res => {
        this.setState({ isLoading: false, infos: res.data });
      });
  }
  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column", marginTop: 20 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 2, alignItems: "center" }}>
            <Logo height={100} width={100} />
          </View>
          <View
            style={{
              flexDirection: "column",
              flex: 3
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "#201F76"
              }}
            >
              {this.state.infos.shortName}
            </Text>
            <TouchableHighlight
              onPress={() =>
                Linking.openURL("https://www.arsenal.com").catch(err =>
                  console.error("An error occurred", err)
                )
              }
            >
              <Text style={{ color: "#201F76" }}>
                <Ionicons
                  name="md-home"
                  style={{ fontSize: 15, color: "#201F76" }}
                />{" "}
                https://www.arsenal.com
              </Text>
            </TouchableHighlight>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <TouchableHighlight
                style={{
                  marginRight: 5,
                  marginTop: 5,
                  backgroundColor: "#efefef",
                  borderRadius: 20,
                  height: 30,
                  width: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() =>
                  Linking.openURL("https://www.facebook.com/arsenal/").catch(
                    err => console.error("An error occurred", err)
                  )
                }
              >
                <Ionicons
                  name="logo-facebook"
                  style={{ fontSize: 20, color: "#201F76" }}
                />
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  margin: 5,
                  backgroundColor: "#efefef",
                  borderRadius: 20,
                  height: 30,
                  width: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() =>
                  Linking.openURL("https://twitter.com/Arsenal/").catch(err =>
                    console.error("An error occurred", err)
                  )
                }
              >
                <Ionicons
                  name="logo-twitter"
                  style={{ fontSize: 20, color: "#201F76" }}
                />
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  margin: 5,
                  backgroundColor: "#efefef",
                  borderRadius: 20,
                  height: 30,
                  width: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() =>
                  Linking.openURL("http://instagram.com/arsenal/").catch(err =>
                    console.error("An error occurred", err)
                  )
                }
              >
                <Ionicons
                  name="logo-instagram"
                  style={{ fontSize: 20, color: "#201F76" }}
                />
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  margin: 5,
                  backgroundColor: "#efefef",
                  borderRadius: 20,
                  height: 30,
                  width: 30,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={() =>
                  Linking.openURL("https://www.youtube.com/arsenal/").catch(
                    err => console.error("An error occurred", err)
                  )
                }
              >
                <Ionicons
                  name="logo-youtube"
                  style={{ fontSize: 20, color: "#201F76" }}
                />
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <View
          style={{
            margin: 20,
            paddingTop: 20,
            borderTopWidth: 3,
            borderTopColor: "#201F76"
          }}
        >
          <Text>Description</Text>
        </View>
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
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Infos;
