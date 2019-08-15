import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Image,
  Dimensions
} from "react-native";
import { connect } from "react-redux";
import { actionDescargarPublicaciones } from "../../Store/ACCIONES";
import Publicacion from "./Publicacion";

class Home extends Component {
  //Se ejecuta despues que se ejecuta el metodo render
  componentDidMount() {
    this.props.descargarPublicaciones();
  }
  render() {
    //console.log(this.props.publicaciones);
    const { navigation, autores } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.publicaciones} //Toma dos elementos
          //renderItem={({ item }) => <Text>{item.key}</Text>} //Como es un objeto le pongo a cada objeto la key, para que pueda identificar cada uno
          renderItem={({ item, index }) => (
            <Publicacion item={item} autor={autores[index]} /> //para eso se hizo el map para que itere sobre uno proegresivamente, va estar en el mismo indice que publicacion
          )}
          ItemSeparatorComponent={() => <View style={styles.separador} />}
        />
        {/* <Text> Home </Text>

        <Button
          title="Autor"
          onPress={() => {
            navigation.navigate("Autor"); //Le paso la ruta Autor
          }}
        />
        <Button
          title="Comentarios"
          onPress={() => {
            navigation.navigate("Comentarios");
          }}
        /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9"
  },
  separador: {
    borderWidth: 1,
    borderColor: "#C0C0C0"
  }
});

//export default Home;

const mapStateToProps = state => ({
  publicaciones: state.reducerPublicacionesDescargadas,
  autores: state.reducerAutoresDescargados
});

const mapDispatchToProps = dispatch => ({
  descargarPublicaciones: () => {
    dispatch(actionDescargarPublicaciones());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
