import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.login}>Bienvenido!</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Correo"
          //value = {}
          //onChangeText = {text => }
          style={styles.input}
        />

        <TextInput
          placeholder="Contraseña"
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.containerTextPassword}>
        <View style={{ flex: 1 }}>
          <Text style={styles.textPassword}>¿Olvidaste tu contraseña?</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Text style={styles.button}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerRegister}>
        <Text>
          ¿No tienes una cuenta?
          <Text style={styles.register}> REGISTRATE</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    fontWeight: "bold",
    fontSize: 30,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 15,
    borderColor: "#000000",
    borderWidth: 2,
  },

  containerTextPassword: {
    flexDirection: "row",
    width: "80%",
  },
  textPassword: {
    marginTop: 8,
    fontWeight: "bold",
    textAlign: "right",
  },
  buttonContainer: {
    width: "80%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 7,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  containerRegister: {
    flexDirection: "row",
    marginTop: 20,
  },
  register: {
    fontWeight: "bold",
    color: "red",
  },
});
