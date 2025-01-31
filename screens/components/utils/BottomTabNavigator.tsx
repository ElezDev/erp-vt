



import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Animated from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ProfileScreen from "../profile/ProfileScreen";
import Nomina from "../nomina/Nomina";
import HomeScreen from "../home/HomeScreen";
import NominaGeneral from "../nomina/NominaGeneral";
import CustomHeader from "../navigations/CustomHeader";
import color from "src/constant/color";
import homeUser from "../User/home/homeUser";
import Banners from "../nomina/TipoNomina";

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
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const storedRoles = await AsyncStorage.getItem("roles");
        setRoles(storedRoles ? JSON.parse(storedRoles) : []);
      } catch (error) {
        console.error("Error al obtener los roles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={color.primaryColor} />
      </View>
    );
  }

  const screens = [
    { name: "Home", component: HomeScreen, icon: "home-outline", roles: ["Admin", "MARKETING DIGITAL"] },
    { name: "Nomina", component: Banners, icon: "wallet", roles: ["Admin"] },
    { name: "Profile", component: ProfileScreen, icon: "person-outline", roles: ["Admin", "MARKETING DIGITAL", "DESARROLADOR JR"] },
    { name: "Home", component: homeUser, icon: "home-outline", roles: ["DESARROLADOR JR"] },
  ];

  const filteredScreens = screens.filter((screen) =>
    screen.roles.some((role) => roles.includes(role))
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const screen = screens.find((s) => s.name === route.name);
          const iconName = focused ? screen?.icon.replace("-outline", "") : screen?.icon;

          return (
            <Animated.View style={[styles.iconContainer, focused && styles.iconFocused]}>
              <Ionicons name={iconName as string} size={size} color={color} />
            </Animated.View>
          );
        },
        tabBarLabel: ({ focused }) => <CustomTabBarLabel focused={focused} title={route.name} />,
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
      {filteredScreens.map((screen) => (
        <Tab.Screen key={screen.name} name={screen.name} component={screen.component} />
      ))}
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default BottomTabNavigator;
