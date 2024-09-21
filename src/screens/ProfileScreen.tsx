import React, { useEffect, useState } from "react"
import Container from "../components/Container"
import { Alert, Button, Text } from "react-native"
import InputField from "../components/InputField"
import AsyncStorage from "@react-native-async-storage/async-storage"

const ProfileScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [name, setName] = useState<string>("")

  useEffect(() => {
    const getProfile = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user")
        if (storedUser) {
          const { email, password, name } = JSON.parse(storedUser)
          setEmail(email)
          setPassword(password)
          setName(name)
        }
      } catch (e) {
        Alert.alert("Error", "Failed to loead profile.")
      }
    }

    getProfile()
  }, [])

  const onSaveProfile = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required.")
      return
    }

    try {
      await AsyncStorage.setItem(
        "user",
        JSON.stringify({ email, password, name })
      )
      Alert.alert("Success", "Profile succassfully updated!")
    } catch (e) {
      Alert.alert("Error", "Failed to update profile.")
    }
  }

  return (
    <Container title={"Profile"}>
      <InputField
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <InputField
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureText={true}
      />
      <InputField
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Button title="Save Profile" onPress={onSaveProfile} />
    </Container>
  )
}

export default ProfileScreen
