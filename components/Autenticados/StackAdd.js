import { createStackNavigator } from "react-navigation";
import Add from "./Add";
import SeleccionarGaleria from "./SeleccionarGaleria";

const StackAdd = createStackNavigator({
  Add: {
    screen: Add,
    navigationOptions: {
      header: null
    }
  },
  Seleccion: {
    screen: SeleccionarGaleria
  }
});

StackAdd.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export { StackAdd };
