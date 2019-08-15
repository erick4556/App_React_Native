import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  Dimensions
} from "react-native";
import Icon from "react-native-ionicons";

class Publicacion extends Component {
  render() {
    //console.log(this.props.autor);
    const { navigation, item, autor } = this.props; //Ese item es el que estoy pasando
    const { width } = Dimensions.get("window"); //Para tener el ancho de la pantalla
    //console.log(width);
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
          <View />
          <View style={styles.icons}>
           {/*  <Icon name="heart" color="#000000" size={30} style={styles.icon} />
            <Icon
              name="chatbubbles"
              color="#000000"
              size={30}
              style={styles.icon}
            /> */}
          </View>
          <View style={styles.texto}>
            <Text>{item.texto}</Text>
          </View>
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
    marginVertical: 16,
    marginBottom: 16
  },
  footer: {
    marginHorizontal: 16
  },
  icons: {
    flexDirection: "row"
  },
  icon: {
    marginRight: 16,
    marginVertical: 16
  },
  texto: {
    marginBottom: 16
  }
});

export default Publicacion;
