import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createAppContainer
} from "react-navigation";
import Follow from "./Follow";

const TabFollow = createMaterialTopTabNavigator(
  {
    Follow: {
      screen: Follow,
    },
    Followers: {
      screen: Follow
    }
  },
  {
    tabBarPosition: "top"
  }
);

//var TabFollowEx = createAppContainer(Tabfollow);

export { TabFollow };
