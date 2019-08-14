import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { autenticacion } from "../Store/Servicios/Firebase";
import { RutasNoAutent } from "./NoAutenticados/RutasNoAutenticadas";
import { RutasAutent } from "./Autenticados/RutasAutenticadas";
import { actionEstablecerSesion, actionCerrarSesion } from "../Store/ACCIONES";

class Seleccion extends Component {
  //Despues que ejecute el render quiero que revise si hay un usuario autenticado o no
  componentDidMount() {
    this.props.autenticacion();
  }
  render() {
    return (
      <View style={styles.container}>
        {this.props.usuario ? <RutasAutent /> : <RutasNoAutent />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  usuario: state.reducerSesion
});

const mapDispatchToProps = dispatch => ({
  autenticacion: () => {
    autenticacion.onAuthStateChanged(usuario => {
      if (usuario) {
        console.log(usuario);
        dispatch(actionEstablecerSesion(usuario));
      } else {
        console.log("No existe usuario");
        dispatch(actionCerrarSesion());
        // User is signed out.
      }
    });
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Seleccion);
