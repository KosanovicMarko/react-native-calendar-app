import { NavigationContainer } from "@react-navigation/native"
import store from "./src/store/store"
import RootNavigator from "./src/navigation/RootNavigator"
import { Provider } from "react-redux"
import { StatusBar } from "react-native"

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  )
}

export default App
