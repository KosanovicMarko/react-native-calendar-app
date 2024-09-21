import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native"
import { useDispatch } from "react-redux"
import * as LocalAuth from "expo-local-authentication"
import {
  setAuth,
  setBiometricAuthAvailable,
  setUnauth
} from "../store/authSlice"
import { MainNavigationProp } from "../navigation/RootNavigator"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    marginBottom: 20,
    fontSize: 18
  }
})

const BiometricAuthScreen: React.FC = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation<MainNavigationProp>()

  useEffect(() => {
    const auth = async () => {
      try {
        // Check if hardware supports biometric authentication
        const hasHardware = await LocalAuth.hasHardwareAsync()
        if (!hasHardware) {
          // Update the state and navigate to LoginScreen
          dispatch(setBiometricAuthAvailable(false))
          dispatch(setUnauth())
          navigation.reset({ index: 0, routes: [{ name: "Auth" }] })
          return
        }

        // Check if biometric are enrolled on the device
        const isEnrolled = await LocalAuth.isEnrolledAsync()
        if (!isEnrolled) {
          // Update the state and navigate to LoginScreen
          dispatch(setBiometricAuthAvailable(false))
          dispatch(setUnauth())
          navigation.reset({ index: 0, routes: [{ name: "Auth" }] })
        }

        // Authenticate using biometrics
        const result = await LocalAuth.authenticateAsync({
          promptMessage: "Authenticate with Biometrics",
          cancelLabel: "Cancel",
          fallbackLabel: "Use passcode",
          disableDeviceFallback: false
        })

        if (result.success) {
          dispatch(setAuth())
          navigation.reset({ index: 0, routes: [{ name: "Main" }] })
        } else {
          // If authentication fails, navigate to LoginScreen
          dispatch(setUnauth())
          navigation.reset({ index: 0, routes: [{ name: "Auth" }] })
        }
      } catch (e) {
        Alert.alert("Error", "Biometric authentication error")
        dispatch(setUnauth())
        navigation.reset({ index: 0, routes: [{ name: "Auth" }] })
      }
    }

    auth()
  }, [dispatch, navigation])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Authenticating...</Text>
      <ActivityIndicator size="large" color="#000FF" />
    </View>
  )
}

export default BiometricAuthScreen
