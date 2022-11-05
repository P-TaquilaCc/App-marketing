import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Text,
  
} from "react-native";

import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import axios from '../api/server';



const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [loginError, setloginError] = useState("");

  const onSignInPressed = () => {
    
    if (email != "" && password != "") {

      axios.post('/api/login', {
        email: email,
        password: password
      })
      .then(function (response) {
        if (response.status == 200) {
          AsyncStorage.setItem('userToken', response.data['token']);
          navigation.navigate("Home");
          setloginError("");
        } else {
          setloginError(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

      //alert(password);
      setemailError("");
      setpasswordError("");
    } else if (email == "" && password != "") {
      setpasswordError("");
      setloginError("");
      setemailError("Ingrese un email");
    } else if (password == "" && email != "") {
      setemailError("");
      setloginError("");
      setpasswordError("Ingrese un password");
    } else {
      setloginError("");
      setemailError("Ingrese un email");
      setpasswordError("Ingrese un password");
    }
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("ConfirmEmailScreen");
  };

  const onSignUpPress = () => {
    navigation.navigate("SignUpScreen");
  };
  return (
    <ScrollView>
      <View style={style.root}>
        <Image
          source={Logo}
          style={[style.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <CustomInput placeholder="Correo" value={email} setValue={setEmail} />
        <Text style={{ color: "red" }}>{emailError}</Text>
        <CustomInput
          placeholder="Contraseña"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <Text style={{ color: "red" }}>{passwordError}</Text>
        <CustomButton text="Iniciar Sesión" onPress={onSignInPressed} />
        <Text style={{ color: "red" }}>{loginError}</Text>
        <CustomButton
          text="¿Olvidaste tu contraseña?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <CustomButton
          text="¿No tienes una cuenta? Registrate"
          onPress={onSignUpPress}
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
});

export default SignInScreen;
