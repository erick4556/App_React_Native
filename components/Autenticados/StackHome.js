import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from "./Home";
import Autor from "./Profile";
import Publicacion from "./Publicacion";
import Comentarios from "./Cometarios";

const StackHome = createStackNavigator({
  //Rutas
  Home: {
    screen: Home,
    navigationOptions: {
      //title: "Home - Titulo desde la screen"
      header: null
    }
  },
  Autor: {
    screen: Autor
  },
  Publicacion: {
    screen: Publicacion
  },
  Comentarios: {
    screen: Comentarios
  }
});

StackHome.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index === 1) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

//const StackHome = createAppContainer(RouteHome);

export { StackHome };
