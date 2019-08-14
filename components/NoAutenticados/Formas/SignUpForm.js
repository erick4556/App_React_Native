import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { Field, reduxForm } from "redux-form";

const fieldNombre = props => {
  return (
    <View style={styles.textInput}>
      <TextInput
        placeholder={props.ph}
        onChangeText={props.input.onChange}
        value={props.input.value}
        keyboardType={
          props.input.name == "correo" ? "email-address" : "default"
        }
        autoCapitalize="none" //Para la minuscula por defecto en el teclado
        secureTextEntry={
          !!(
            props.input.name == "password" || props.input.name == "confirmacion"
          )
        }
        onBlur={props.input.onBlur}
      />
      <View style={styles.linea} />
      {/*touched es que tiene que ser tocado */}
      {props.meta.touched && props.meta.error && (
        <Text style={styles.colorErros}>{props.meta.error}</Text>
      )}
    </View>
  );
};

const validate = (values, props) => {
  // props se las paso desde el signUp
  const errors = {};
  if (!props.imagen) {
    errors.imagen = "Imagen requerida";
  }
  if (!values.nombre) {
    errors.nombre = "Requerido";
  } else if (values.nombre.length < 5) {
    errors.nombre = "Deben ser al menos 5 caracteres";
  } else if (values.nombre.length > 10) {
    errors.nombre = "Deben ser menor de 10 caracteres";
  }

  if (!values.correo) {
    errors.correo = "Requerido";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correo)) {
    errors.correo = "Correo invalido";
  }

  if (!values.password) {
    errors.password = "Requerido";
  } else if (values.password.length < 5) {
    errors.password = "Deben ser al menos 5 caracteres";
  } else if (values.password.length > 15) {
    errors.password = "Debe ser menor de 15 caracteres ";
  }

  if (!values.confirmacion) {
    errors.confirmacion = "Requerido";
  } else if (values.password != values.confirmacion) {
    errors.confirmacion = "El password debe coincidir";
  }
  return errors;
};

//Componente funcional
const SignUpForm = props => {
  //console.log(props);
  return (
    <View style={styles.container}>
      <Field name="imagen" component={fieldImagen} />
      <Field name="nombre" component={fieldNombre} ph="nombre" />
      <Field name="correo" component={fieldNombre} ph="correo@correo.com" />
      <Field name="password" component={fieldNombre} ph="******" />
      <Field name="confirmacion" component={fieldNombre} ph="******" />
      <Text>Redux Form</Text>
      <Button title="Registrar" onPress={props.handleSubmit(props.registro)} />
      {/*Handlesubmit no toma el valor de aqui sino del store  */}
    </View>
  );
};

const fieldImagen = props => (
  <View>
    {/*touched es que tiene que ser tocado */}
    {props.meta.touched && props.meta.error && (
      <Text style={styles.colorErros}>{props.meta.error}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 3
  },
  textInput: {
    marginBottom: 16
  },
  linea: {
    backgroundColor: "#DCDCDC",
    height: 2
  },
  colorErros: {
    color: "#FF0000"
  }
});

//La funcion recibe dos parametros un objeto y el componente
//Adorna el componente con una funcion  //Inyecta igual que connect por medio de dos funciones el state y dispatch
export default reduxForm({
  form: "SignUpForm",
  validate
})(SignUpForm); //Inyecto las propiedades al componente por reduxform
