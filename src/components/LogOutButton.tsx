import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { MainNavigationProp } from "../navigation/RootNavigator"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useDispatch } from "react-redux"
import { setUnauth } from "../store/authSlice"
import { TouchableOpacity } from "react-native"

const LogOutButton: React.FC = () => {
  const navigation = useNavigation<MainNavigationProp>()
  const dispatch = useDispatch()

  const onLogout = async () => {
    dispatch(setUnauth())
    navigation.reset({ index: 0, routes: [{ name: "Auth" }] })
  }

  return (
    <TouchableOpacity style={{ marginRight: 20 }} onPress={onLogout}>
      <Ionicons name="log-out-outline" size={24} color="#ffffff" />
    </TouchableOpacity>
  )
}

export default LogOutButton
