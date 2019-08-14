import { createStackNavigator } from "react-navigation";
import Publicacion from "./Publicacion";
import Search from "./Search";
import Autor from "./Profile";
import Comentarios from "./Cometarios";

const StackSearch = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      header: null
    }
  },
  Publicacion: {
    screen: Publicacion,
  },
  Autor: {
    screen: Autor
  },
  Comentarios: {
    screen: Comentarios
  }
});

export { StackSearch };
