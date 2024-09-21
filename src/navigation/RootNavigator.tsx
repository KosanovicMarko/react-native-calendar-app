import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
  TransitionPresets
} from "@react-navigation/stack"
import { useEffect, useState } from "react"
import MainTabNavigator, { MainTabParamList } from "./MainTabNavigator"
import AuthStackNavigator, { AuthStackParamList } from "./AuthNavigator"
import LogOutButton from "../components/LogOutButton"
import { NavigatorScreenParams } from "@react-navigation/native"
import { ActivityIndicator, View } from "react-native"
import { AppDispatch, RootState } from "../store/store"
import { useDispatch, useSelector } from "react-redux"
import { setBiometricAuthAvailable } from "../store/authSlice"
import BiometricAuthScreen from "../screens/BiometricAuthScreen"

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>
  Main: NavigatorScreenParams<MainTabParamList>
  BiometricAuth: undefined
}

export type MainNavigationProp = StackNavigationProp<RootStackParamList>

const Stack = createStackNavigator<RootStackParamList>()

const screenOptions: StackNavigationOptions = {
  title: "Calendar",
  headerStyle: { backgroundColor: "#89CFF0" },
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center"
  },
  headerTitleAlign: "center",
  ...TransitionPresets.SlideFromRightIOS
}

const RootNavigator: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isAuth = useSelector((state: RootState) => state.auth.isAuth)
  const biometricAuthAvailable = useSelector(
    (state: RootState) => state.auth.biometricAuthAvailable
  )
  const [loading, setLoading] = useState(true)

  //Check if user data exists and set biometric Auth accordingly
  useEffect(() => {
    const checkStoredUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user")
        await AsyncStorage.removeItem("events")
        if (storedUser) {
          dispatch(setBiometricAuthAvailable(true))
        } else {
          dispatch(setBiometricAuthAvailable(false))
        }
      } catch (e) {
        dispatch(setBiometricAuthAvailable(false))
      } finally {
        setLoading(false)
      }
    }

    checkStoredUser()
  }, [dispatch])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000FF" />
      </View>
    )
  }

  return (
    <Stack.Navigator
      // If authenticated, show the MainNavigator
      // If user data exists but not authenticated, show BiometricAuthScreen
      // Otherwise, show the AuthNavigator (Login/Register)
      initialRouteName={
        isAuth ? "Main" : biometricAuthAvailable ? "BiometricAuth" : "Auth"
      }
      screenOptions={{
        ...screenOptions,
        headerRight: () => (isAuth ? <LogOutButton /> : undefined)
      }}
    >
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="BiometricAuth" component={BiometricAuthScreen} />
      <Stack.Screen name="Auth" component={AuthStackNavigator} />
    </Stack.Navigator>
  )
}

export default RootNavigator
