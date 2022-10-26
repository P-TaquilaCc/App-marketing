import { View, Text, StyleSheet, ScrollView } from "react-native";

import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const [dni, setDni] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const navigation = useNavigation();

  const onRegisterPressed = () => {
    console.warn("Crear cuenta");
  };

  const onTermsOfUsePressed = () => {
    console.warn("Términos y condiciones");
  };

  const onPrivacyPressed = () => {
    console.warn("Privacidad");
  };

  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView>
      <View style={style.root}>
        <Text style={style.title}>Crear Cuenta</Text>

        <CustomInput placeholder="DNI" value={dni} setValue={setDni} />
        <CustomInput
          placeholder="Nombres y Apellidos"
          value={name}
          setValue={setName}
        />
        <CustomInput placeholder="Correo" value={email} setValue={setEmail} />
        <CustomInput
          placeholder="Contraseña"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder="Repetir Contraseña"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry={true}
        />
        <CustomButton text="Crear Cuenta" onPress={onRegisterPressed} />

        <Text style={style.text}>
          Al momento de registrarse, Usted está aceptando nuestros{" "}
          <Text style={style.link} onPress={onTermsOfUsePressed}>
            Términos y condiciones
          </Text>
          , así como nuestra{" "}
          <Text style={style.link} onPress={onPrivacyPressed}>
            Política de Privacidad
          </Text>
        </Text>

        <CustomButton
          text="¿Ya tienes una cuenta? Inicia Sesión"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    marginTop: 50,
    marginBottom: 50,
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    marginTop: 40,
    marginBottom: 10,
  },
  text: {
    color: "gray",
    fontWeight: "bold",
    marginVertical: 10,
  },
  link: {
    color: "#3B71F3",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
