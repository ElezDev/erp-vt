import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Animated from "react-native-reanimated";
import ProfileScreen from "../profile/ProfileScreen";
import color from "src/constant/color";
import CustomHeader from "../navigations/CustomHeader";
import ContratosPage from "../contratos/ContratosPage";
import Nomina from "../nomina/Nomina";
import HomeScreen from "../home/HomeScreen";
import NominaGeneral from "../nomina/NominaGeneral";

const Tab = createBottomTabNavigator();

interface CustomTabBarLabelProps {
  focused: boolean;
  title: string;
}

const CustomTabBarLabel: React.FC<CustomTabBarLabelProps> = ({
  focused,
  title,
}) => (
  <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
    {title}
  </Text>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          // }
          //  else if (route.name === "Contratos") {
          //   iconName = focused ? "document-text" : "document-outline";
            
          } else if (route.name === "Nomina") {
            iconName = focused ? "card" : "wallet";
          }

          return (
            <Animated.View
              style={[styles.iconContainer, focused && styles.iconFocused]}
            >
              <Ionicons name={iconName as string} size={size} color={color} />
            </Animated.View>
          );
        },
        tabBarLabel: ({ focused }) => (
          <CustomTabBarLabel focused={focused} title={route.name} />
        ),
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: color.primaryColor,
        tabBarInactiveTintColor: "#A9A9A9",
        header: ({ navigation, route, options }) => (
          <CustomHeader
            title={options.title || route.name}
            showBackButton={false}
            onBackPress={() => navigation.goBack()}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Contratos" component={ContratosPage} /> */}
      <Tab.Screen name="Nomina" component={NominaGeneral} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 10,
    left: 20,
    right: 20,
    backgroundColor: "#FFFFFFE5",
    borderRadius: 20,
    height: 65,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  iconFocused: {
    backgroundColor: "#F3F2F2FF",
  },
  tabLabel: {
    fontSize: 12,
    color: "#A9A9A9",
  },
  tabLabelFocused: {
    color: color.primaryColor,
    fontWeight: "600",
  },
});

export default BottomTabNavigator;
