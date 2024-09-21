import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useEffect, useState } from "react"
import { Alert, Button, StyleSheet, Text } from "react-native"
import Container from "../components/Container"
import InputField from "../components/InputField"
import {
  validateName,
  validateEmail,
  validatePassword
} from "../utils/validations"
import { useNavigation } from "@react-navigation/native"
import { MainNavigationProp } from "../navigation/RootNavigator"

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14
  },
  button: {
    paddingVertical: 20
  }
})

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [nameError, setNameError] = useState<string | null>(null)
  const [emailTouched, setEmailTouched] = useState<boolean>(false)
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false)
  const [nameTouched, setNameTouched] = useState<boolean>(false)
  const navigation = useNavigation<MainNavigationProp>()

  useEffect(() => {
    if (nameTouched) {
      setNameError(validateName(name))
    }
  }, [name, nameTouched])

  useEffect(() => {
    if (emailTouched) {
      setEmailError(validateEmail(email))
    }
  }, [email, emailTouched])

  useEffect(() => {
    if (passwordTouched) {
      setPasswordError(validatePassword(password))
    }
  }, [password, passwordTouched])

  const onRegister = async () => {
    if (name === "" || email === "" || password === "") {
      Alert.alert("Error", "All fields are required.")
      return
    }

    try {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ name, email, password })
      )
      Alert.alert("Success", "You have registered successfully.")
      navigation.navigate("Auth", { screen: "Login" })
    } catch (e) {
      Alert.alert("Error", "There was an issue with your registration.")
    }
  }

  const onLogin = () => {
    navigation.navigate("Auth", { screen: "Login" })
  }

  return (
    <Container title={"Register"}>
      <InputField
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        onBlur={() => setNameTouched(true)}
      />
      {nameTouched && nameError && (
        <Text style={styles.errorText}>{nameError}</Text>
      )}
      <InputField
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        onBlur={() => setEmailTouched(true)}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      {emailTouched && emailError && (
        <Text style={styles.errorText}>{emailError}</Text>
      )}
      <InputField
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        onBlur={() => setPasswordTouched(true)}
      />
      {passwordTouched && passwordError && (
        <Text style={styles.errorText}>{passwordError}</Text>
      )}
      <Button title="Register" onPress={onRegister} />
      <Text style={styles.button}>
        {"Have an account ? Tap here to login."}
      </Text>
      <Button title="Login" onPress={onLogin} />
    </Container>
  )
}

export default RegisterScreen
