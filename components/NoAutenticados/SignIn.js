import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { connect } from "react-redux"; //Adorna el componente e integrarle a traves de propiedades la store y la posibilidad de hacer dispatch
import SignInForm from "./Formas/SignInForm";
import { actionLogin } from "../../Store/ACCIONES";

/* const SignIn = (props) => {
    //A diferencia de los componentes con clases, a estos componentes funcionales hay que pasarles las propiedades
    //props.navigation.navigate(RutasNoAutenticadas.SignIn)
    const { navigation } = props; //le paso una parte del objeto props que es navigation
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Componente SignIn</Text>
        <Button
          title="Navegar al SignUp"
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        />
         Agrego una arrowfunction por que no se puede tener funciones que se ejecuten dentro de los eventos  
      </View>
    );
  };
 */

class SignIn extends Component {
  signinUsuario = values => {
    //console.log(values);
    this.props.login(values);
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <SignInForm login={this.signinUsuario} />
        <Button
          title="Navegar al SignUp"
          onPress={() => {
            navigation.navigate("SignUp");
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

//export default SignIn;

const mapStateToProps = state => ({
  numero: state.reducerPrueba //Puedo acceder al Store por que mapState le paso el state, puedo acceder
});

//Explicacion
//Necesito que realice un dispatch con los values de singinUsuario cuando se ejecute los values
//del form que es handleSubmit(props.login)
/*
const mapDispatchToProps = dispatch => {
  return {
    login: datos => {
      //dispatch({ type: "AUMENTAR_REDUCER_PRUEBA" });
      dispatch({ type: "LOGIN", datos }); //Omito el datos: datos
    }
  };
};*/

//Usando actionCreator
//actionCreator: Funcion que regresa una accion
const mapDispatchToProps = dispatch => {
  return {
    login: datos => {
      //dispatch({ type: "AUMENTAR_REDUCER_PRUEBA" });
      dispatch(actionLogin(datos)); //Omito el datos: datos
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps //Inyecta como propiedades los elementos al componente
)(SignIn);
