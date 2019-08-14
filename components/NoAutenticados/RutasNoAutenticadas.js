import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Text, View, StyleSheet, Button } from "react-native";
import SignIn from "./SignIn";
import SignUp from "./SingUp";

const RutasNoAutenticadas = createStackNavigator(
  {
    //Para hacer login - Rutas
    SignIn: {
      screen: SignIn //El escreen que voy a redenreizar, le paso el componente
      /* navigationOptions: {
        header: null,
        title: "SingIn - Titulo desde la screen"
      } */
    },
    //Para registrarse
    SignUp: {
      screen: SignUp
    }
  },
  {
    headerMode: "none"
    /*   //Le paso un segundo parametro
    //headerMode: "none",
    navigationOptions: { //Genera una configuracion predefinida para todas las screens
      title: "Titulo desde StackNavigator"
    } */
  }
);

const RutasNoAutent = createAppContainer(RutasNoAutenticadas);

export { RutasNoAutent };
