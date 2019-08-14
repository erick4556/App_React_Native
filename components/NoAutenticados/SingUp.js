import React, { Component } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import { connect } from "react-redux"; //Adorna el componente e integrarle a traves de propiedades la store y la posibilidad de hacer dispatch
import { blur, change } from "redux-form"; //Importar actionCreators
import SignUpForm from "./Formas/SignUpForm";
import {
  actionRegistro,
  actionLimpiarImagen,
  actionCargarImagenSignUp
} from "../../Store/ACCIONES";
import SeleccionarImagen from "../SeleccionarImagen";
import CONSTANTES from "../../Store/CONSTANTES";
/* const SignUp = props => {
    const { navigation } = props;
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Navegar a SignIn</Text>
        <Button
          title="Regresar al SignIn"
          onPress={() => {
            //navigation.navigate("SignIn");
            navigation.goBack(); //Para que no cree componentes de mas
          }}
        />
      </View>
    );
  };
 */

class SignUp extends Component {
  //Se ejecute antes de que el componente se desmonte
  componentWillUnmount() {
    this.props.limpiarImagen(); //Ejecuto el dispatch que viene del reducer del store
  }

  registroUsuario = values => {
    console.log(values);
    this.props.registro(values);
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <SeleccionarImagen
          imagen={this.props.imagen.imagen}
          cargar={this.props.cargarImagen}
        />
        <SignUpForm
          registro={this.registroUsuario}
          imagen={this.props.imagen.imagen} //le digo que solo quiero el valor, ya que imagen trae todo el objeto del reducer
        />
        <Button
          title="Regresar al SignIn"
          onPress={() => {
            //navigation.navigate("SignIn");
            navigation.goBack(); //Para que no cree componentes de mas
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16
  }
});

const mapStateToProps = state => ({
  numero: state.reducerPrueba, //Puedo acceder al Store por que mapState le paso el state, puedo acceder
  imagen: state.reducerImagenSignUp // Ya tengo el objeto de imagen : null del reducer
});

/* const mapDispatchToProps = dispatch => {
  return {
    registro: values => {
      //dispatch({ type: "AUMENTAR_REDUCER_PRUEBA" });
      dispatch({ type: "REGISTRO", datos: values });
    }
  };
};
 */

//Usando actionCreator
//actionCreator: Funcion que regresa una accion
const mapDispatchToProps = dispatch => {
  return {
    registro: values => {
      //dispatch({ type: "AUMENTAR_REDUCER_PRUEBA" });
      dispatch(actionRegistro(values));
    },
    cargarImagen: imagen => {
      dispatch(actionCargarImagenSignUp(imagen)); //Impacta el reducer
      dispatch(blur("SignUpForm", "imagen", Date.now())); //Le paso la forma del SignUpForm, form: "SignUpForm", blur: permite que el campo de la imagen se actualice y la validacion compruebe que el campo se ha cambiado
      //name="imagen" del form
    },
    limpiarImagen: () => {
      dispatch(actionLimpiarImagen());
      //dispatch({ type: CONSTANTES.LIMPIAR_IMAGEN_SIGNUP });
    }
  };
};

//export default SignUp;

export default connect(
  mapStateToProps,
  mapDispatchToProps //Inyecta como propiedades los elementos al componente
)(SignUp); //Le paso el componente que quiero integrar con connect
