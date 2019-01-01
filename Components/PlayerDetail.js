import React from "react";
import { StyleSheet, View, Text } from "react-native";

class PlayerDetail extends React.Component {
  render() {
    console.log(this.props.navigation);
    return (
      <View style={styles.main_container}>
        <Text>
          Détail du Player {this.props.navigation.getParam("playerId")}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  }
});

export default PlayerDetail;
