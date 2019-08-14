import React, { Component } from "react";
import { Text, View, StyleSheet,Button } from "react-native";

class Comentarios extends Component {
 /*  static navigationOptions = {
    tabBarVisible: false
  }  Prueba*/
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text> Comentarios </Text>
        <Button
          title="Autor"
          onPress={() => {
            navigation.navigate("Autor");
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

export default Comentarios;
