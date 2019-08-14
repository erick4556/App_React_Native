import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { Text, View, StyleSheet, Button } from "react-native";
//import Home from "./Home"; Ya no lo voy a usar por que a usar el StackHome
import { StackHome, CommentStack } from "./StackHome";
import { StackSearch } from "./StackSearch";
import Profile from "./Profile";
import Follow from "./Follow";
import Add from "./Add";
import Search from "./Search";
import { TabFollow } from "./TabFollow";
import { StackFollow } from "./StackFollow";
import { StackAdd } from "./StackAdd";

const RutasAutenticadas = createBottomTabNavigator(
  {
    Home: {
      screen: StackHome
    },
    Search: {
      //screen: Search
      screen: StackSearch
    },
    Add: {
      screen: StackAdd
    },
    Follow: {
      //screen: Follow
      //screen: TabFollow
      screen: StackFollow
    },
    Profile: {
      screen: Profile
    }
  },
  {
    tabBarPosition: "top" //Sobreescribo para que se pueda ver en android tambien
  }
);

const RutasAutent = createAppContainer(RutasAutenticadas);

export { RutasAutent };
