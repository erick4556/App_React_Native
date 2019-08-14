import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Dimensions
} from "react-native";

class Publicacion extends Component {
  render() {
    console.log(this.props.autor);
    const { navigation, item, autor } = this.props; //Ese item es el que estoy pasando
    const { width } = Dimensions.get("window"); //Para tener el ancho de la pantalla
    console.log(width);
    const factor = item.width / width; //item.width es el ancho de la imagen y el width es de la pantalla
    const height = item.height / factor;
    return (
      <View>
        <View style={styles.header}>
          <Image
            style={{ width: 48, height: 48, borderRadius: 24 }}
            source={{ uri: autor.fotoUrl }}
          />
          <Text>{autor.nombre}</Text>
        </View>
        <Image
          source={{ uri: item.secure_url }} //Siempre que se trae imagen de la red, se debe establecer la altura y el ancho
          style={{ width, height }}
        />
        <View style={styles.footer}>
        <View style={styles.icons}>
          
        </View>
          <Text>Likes</Text>
          <Text>Comentarios</Text>
        </View>

        {/* <Text> Publicacion </Text>
        <Button
          title="Autor"
          onPress={() => {
            navigation.navigate("Autor");
          }}
        />
        <Button
          title="Comentarios"
          onPress={() => {
            navigation.navigate('Comentarios');
          }}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 35,
    marginBottom: 16
  }
});

export default Publicacion;
