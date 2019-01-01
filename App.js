import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import { Image, StyleSheet } from "react-native";
import Effectif from "./Components/Effectif";
import PlayerDetail from "./Components/PlayerDetail";
import Results from "./Components/Results";
import Ionicons from "react-native-vector-icons/Ionicons";

const RootStack = createStackNavigator({
  Effectif: {
    screen: Effectif,
    navigationOptions: {
      title: "Effectif"
    }
  },
  PlayerDetail: {
    screen: PlayerDetail,
    navigationOptions: {
      title: "Détail du joueur"
    }
  }
});

const TabNavigator = createBottomTabNavigator(
  {
    Effectif: {
      screen: RootStack,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            //ios-information-circle
            <Ionicons name="md-person" size={32} />
          );
        }
      }
    },
    Résultats: {
      screen: Results,
      navigationOptions: {
        tabBarIcon: () => {
          return <Ionicons name="md-list" size={32} />;
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: "#FF0000",
      activeTintColor: "#fff",
      inactiveBackgroundColor: "#FFFFFF",
      showIcon: true
    }
  }
);

const App = createAppContainer(TabNavigator);

export default App;
