import { createStackNavigator, createAppContainer } from "react-navigation";
import Effectif from "./Components/Effectif";
import PlayerDetail from "./Components/PlayerDetail";

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
      title: "Détail"
    }
  }
});

const App = createAppContainer(RootStack);

export default App;
