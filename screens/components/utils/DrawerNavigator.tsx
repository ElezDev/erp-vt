import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { usePushNotifications } from 'usePushNotifications';
import BottomTabNavigator from './BottomTabNavigator';
import NotificationsScreen from '../notifications/notificationsScreen';



const Drawer = createDrawerNavigator();

function AppDrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={BottomTabNavigator} options={{ title: 'Principal' }} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notificaciones' }} />
    </Drawer.Navigator>
  );
}

export default AppDrawerNavigator;
