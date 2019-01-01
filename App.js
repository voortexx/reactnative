import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import Home from "./Components/Home";
import Effectif from "./Components/Effectif";
import PlayerDetail from "./Components/PlayerDetail";
import Results from "./Components/Results";
import Infos from "./Components/Infos";
import Ionicons from "react-native-vector-icons/Ionicons";

const EffectifStack = createStackNavigator({
  Effectif: {
    screen: Effectif,
    navigationOptions: {
      title: "Squad"
    }
  },
  PlayerDetail: {
    screen: PlayerDetail,
    navigationOptions: {
      title: "Player Detail"
    }
  }
});

const ResultsStack = createStackNavigator({
  Results: {
    screen: Results,
    navigationOptions: {
      title: "Results"
    }
  }
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home
    },
    Squad: {
      screen: EffectifStack
    },
    Results: {
      screen: ResultsStack
    },
    Infos: {
      screen: Infos
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = `md-home`;
        } else if (routeName === "Squad") {
          iconName = `md-person`;
        } else if (routeName === "Results") {
          iconName = `md-list`;
        } else if (routeName === "Infos") {
          iconName = `ios-information-circle`;
        }

        return (
          <Ionicons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "#FF0000",
      inactiveTintColor: "gray"
    }
  }
);

const App = createAppContainer(TabNavigator);

export default App;
