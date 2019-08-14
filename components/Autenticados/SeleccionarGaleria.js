import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import SeleccionarImagen from "../SeleccionarImagen";
import { connect } from "react-redux";
import { blur } from "redux-form";
import {
  actionCargarImagenPublicacion,
  actionSubirPublicacion,
  actionLimpiarImagenPublicacion
} from "../../Store/ACCIONES";
import SeleccionarGaleriaForm from "./SeleccionarGaleriaForm";

class SeleccionarGaleria extends Component {
  publicado = () => {
    console.log("Publicado amigo");
  };

  publicado2() {
    console.log("Publicado amigo2");
  }
  componentWillUnmount() {
    this.props.limpiarImagen(); //Se ejecuta antes del que el componente sea destruido
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imagen}>
          <SeleccionarImagen
            imagen={this.props.imagen.imagen}
            cargar={this.props.cargarImagen}
            radius
          />
        </View>
        <View style={styles.texto}>
          <SeleccionarGaleriaForm
            imagen={this.props.imagen.imagen}
            registro={this.props.subirPublcacion}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9"
  },
  imagen: {
    flex: 2
  },
  texto: {
    flex: 2
  }
});

const mapStateToProps = state => ({
  imagen: state.reducerImagenPublicacion //Propiedad inyectada del Store, cambia el valor de la propiedad imagen por que lo tomo del reducer
});

const mapDispatchToProps = dispatch => {
  return {
    cargarImagen: imagen => {
      dispatch(actionCargarImagenPublicacion(imagen)); //Impacta el reducerImagenPublicacion y cambia el state con el valor de la imagen
      dispatch(blur("SeleccionarGaleriaForm", "imagen", Date.now())); //Le paso la forma del SeleccionarGaleriaForm, form: "SeleccionarGaleriaForm", blur: permite que el campo de la imagen se actualice y la validacion compruebe que el campo se ha cambiado
    },
    subirPublcacion: values => {
      dispatch(actionSubirPublicacion(values));
    },
    limpiarImagen: () => {
      dispatch(actionLimpiarImagenPublicacion());
    }
  };
};

//export default SeleccionarGaleria;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeleccionarGaleria);
