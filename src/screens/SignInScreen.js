import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";

import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onSignInPressed = () => {
    navigation.navigate("Home");
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
        <CustomInput
          placeholder="Contraseña"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomButton text="Iniciar Sesión" onPress={onSignInPressed} />

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