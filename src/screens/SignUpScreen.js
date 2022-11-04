import { View, Text, StyleSheet, ScrollView } from "react-native";

import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

import { useNavigation } from "@react-navigation/native";

import axios from '../api/server';

const SignUpScreen = () => {
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigation = useNavigation();

  const [dniError, setdniError] = useState("");
  const [telefonoError, settelefonoError] = useState("");
  const [nameError, setnameError] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [confirmationpasswordError, setconfirmationpasswordError] = useState("");


  const onRegisterPressed = () => {
    /* console.warn("Crear cuenta"); */

    axios.post('/api/register', {
      dni: dni,
      telefono: telefono,
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation
    })
    .then(function (response) {
      setdniError(response.data.dni);
      settelefonoError(response.data.telefono);
      setnameError(response.data.name);
      setemailError(response.data.email);
      setpasswordError(response.data.password);
      setconfirmationpasswordError(response.data.password);

      if (response.data.message == "Registro con éxito!!") {
        alert(response.data.message);
        setDni("");
        setTelefono("");
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
      }

    })
    .catch(function (error) {
      console.log(error);
    });
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
        <Text style={{ color: "red" }}>{dniError}</Text>

        <CustomInput placeholder="Celular" value={telefono} setValue={setTelefono} />
        <Text style={{ color: "red" }}>{telefonoError}</Text>

        <CustomInput
          placeholder="Nombres y Apellidos"
          value={name}
          setValue={setName}
        />
        <Text style={{ color: "red" }}>{nameError}</Text>

        <CustomInput placeholder="Correo" value={email} setValue={setEmail} />
        <Text style={{ color: "red" }}>{emailError}</Text>

        <CustomInput
          placeholder="Contraseña"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <Text style={{ color: "red" }}>{passwordError}</Text>

        <CustomInput
          placeholder="Repetir Contraseña"
          value={passwordConfirmation}
          setValue={setPasswordConfirmation}
          secureTextEntry={true}
        />
        <Text style={{ color: "red" }}>{confirmationpasswordError}</Text>

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
