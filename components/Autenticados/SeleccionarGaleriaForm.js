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
        keyboardType={"default"}
        autoCapitalize="none" //Para la minuscula por defecto en el teclado
        onBlur={props.input.onBlur}
        multiline
      />
      <View />
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
  if (values.texto && values.texto.length > 140) {
    //values.texto viene del name="texto"
    errors.texto = "Deben ser menor de 140 caracteres";
  }

  return errors;
};

//Componente funcional
const SeleccionarGaleriaForm = props => {
  //console.log(props);
  return (
    <View style={styles.container}>
      <Field name="imagen" component={fieldImagen} />
      <Field name="texto" component={fieldNombre} ph="Texto de la imagen" />
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
    marginHorizontal: 16
  },
  colorErros: {
    color: "#FF0000"
  }
});

//La funcion recibe dos parametros un objeto y el componente
//Adorna el componente con una funcion  //Inyecta igual que connect por medio de dos funciones el state y dispatch
export default reduxForm({
  form: "SeleccionarGaleriaForm",
  validate
})(SeleccionarGaleriaForm); //Inyecto las propiedades al componente por reduxform
