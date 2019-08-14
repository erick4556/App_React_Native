import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

class Add extends Component {
  render() {
    const { navigation } = this.props;
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Button
          title="Seleccionar galeria"
          onPress={() => {
            navigation.navigate("Seleccion");
          }}
        />
        <Text> Add </Text>
        <Button
          title="Tomar foto"
          onPress={() => {
            navigation.navigate("Seleccion");
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
    backgroundColor: "#f9f9f9"
  }
});

export default Add;
