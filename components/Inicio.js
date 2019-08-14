import React, { Component } from "react";
import { Provider } from "react-redux";
import { Text, View, StyleSheet } from "react-native";
import { RutasNoAutent } from "./NoAutenticados/RutasNoAutenticadas";
import { RutasAutent } from "./Autenticados/RutasAutenticadas";
import Store from "../Store/Store";
import Seleccion from "./Seleccion";

class Inicio extends Component {
  /* constructor() {
    super();
    this.state = {
      nombre: "Prueba Test"
    };
  } */
  state = {
    nombre: "Prueba Test"
  };
  render() {
    return (
      <View style={style.container}>
        {/*<RutasAutent />*/}
        {/*Le digo que otorgue la posibilidad de usar el store */}
        <Provider store={Store}>
          {/* <RutasNoAutent /> */}
          <Seleccion />
        </Provider>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
    //alignItems: "center",
    // justifyContent: "center"
  }
});

export default Inicio;
