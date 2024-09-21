import React, { useEffect, useState } from "react"
import { Alert, Button, StyleSheet, Text, TextInput } from "react-native"
import Container from "../components/Container"
import AsyncStorage from "@react-native-async-storage/async-storage"
import InputField from "../components/InputField"
import { validateEmail, validatePassword } from "../utils/validations"
import { MainNavigationProp } from "../navigation/RootNavigator"
import { useNavigation } from "@react-navigation/native"
import { useDispatch } from "react-redux"
import { setAuth } from "../store/authSlice"

const styles = StyleSheet.create({
  input: {
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "#CCCCCC",
    padding: 10,
    marginVertical: 10
  },
  button: {
    paddingVertical: 20
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 14
  }
})

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [emailError, setEmailError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [emailTouched, setEmailTouched] = useState<boolean>(false)
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false)
  const navigation = useNavigation<MainNavigationProp>()
  const dispatch = useDispatch()

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

  const onLogin = async () => {
    const storedUser = await AsyncStorage.getItem("user")

    if (storedUser) {
      const { email: storedEmail, password: storedPassword } =
        JSON.parse(storedUser)

      if (email === storedEmail && password === storedPassword) {
        Alert.alert("Success", "Login successful")
        dispatch(setAuth())
        navigation.reset({ index: 0, routes: [{ name: "Main" }] })
      } else {
        Alert.alert("Error", "Wrong username or password.")
      }
    } else {
      Alert.alert("Error", "No registered user found.")
    }
  }

  const onRegister = () => {
    navigation.navigate("Auth", { screen: "Register" })
  }

  return (
    <Container title="Login">
      <InputField
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        onBlur={() => setEmailTouched(true)}
        keyboardType="email-address"
      />
      {emailTouched && emailError && (
        <Text style={styles.errorText}>{emailError}</Text>
      )}
      <InputField
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureText={true}
        onBlur={() => setPasswordTouched(true)}
      />
      {passwordTouched && passwordError && (
        <Text style={styles.errorText}>{passwordError}</Text>
      )}
      <Button title="Login" onPress={onLogin} />
      <Text style={styles.button}>
        {"Don't have an account ? Tap here to register."}
      </Text>
      <Button title="Register" onPress={onRegister} />
    </Container>
  )
}

export default LoginScreen
