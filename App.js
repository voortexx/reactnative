import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./Components/Home";
import PlayerDetail from "./Components/PlayerDetail";

const RootStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Accueil"
    }
  },
  PlayerDetail: {
    screen: PlayerDetail,
    navigationOptions: {
      title: "Détail"
    }
  }
});

const App = createAppContainer(RootStack);

export default App;
