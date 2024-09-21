import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions
} from "@react-navigation/material-top-tabs"
import ProfileScreen from "../screens/ProfileScreen"
import CalendarScreen from "../screens/CalendarScreen/CalendarParentScreen"
import { Ionicons } from "@expo/vector-icons"

export type MainTabParamList = {
  Calendar: undefined
  Profile: undefined
}

const Tab = createMaterialTopTabNavigator<MainTabParamList>()

const screenOptions: MaterialTopTabNavigationOptions = {
  tabBarShowIcon: true,
  tabBarActiveTintColor: "#ffffff",
  tabBarInactiveTintColor: "#1E6091",
  tabBarStyle: { backgroundColor: "#89CFF0" },
  tabBarLabelStyle: {
    textTransform: "none"
  },
  tabBarIndicatorContainerStyle: { display: "none" },
  tabBarItemStyle: {
    paddingLeft: 0,
    paddingRight: 0
  }
}

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} tabBarPosition="bottom">
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar" size={20} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={20} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
