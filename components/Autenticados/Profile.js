import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { autenticacion } from "../../Store/Servicios/Firebase";

class Profile extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text> Profile </Text>
        <Button
          title="Publicacion"
          onPress={() => {
            navigation.navigate("Publicacion");
          }}
        />
        <Button
          title="Salir"
          onPress={() => {
            autenticacion.signOut();
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
    alignItems: "center",
    backgroundColor: "#2c3e50"
  }
});

export default Profile;
