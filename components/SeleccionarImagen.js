import React from "react";
import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import ImagePicker from "react-native-image-picker";

//Uso de un componente funcional, no tienen state, ni componentes del ciclo de vida de react
const SeleccionarImagen = props => {
  //Le paso las propiedades como parametros por que es una funcion - this.props.imagen.imagen
  const handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        //this.setState({ photo: response });
        props.cargar(response); //Le envio la informacion del resultado
      }
    });
  };

  // render() {
  // const { photo } = this.state;
  const radius = { borderRadius: props.radius ? 0 : 80 };
  return (
    <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={handleChoosePhoto}>
        {props.imagen ? ( //Si hay imagen renderiza la imagen
          <Image
            source={{ uri: props.imagen.uri }}
            style={{ width: 180, height: 180, ...radius }}
          />
        ) : (
          <Image
            source={require("../assets/imagen.jpg")}
            style={{ width: 180, height: 180, ...radius }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
// }

export default SeleccionarImagen;

/*
<Button title="Choose Photo" onPress={this.handleChoosePhoto} />
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 150, height: 150 }}
          />
        )}*/
