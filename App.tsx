import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import CategoryDetailScreen from "./screens/components/Categories/CategoryDetailScreen";
import BottomTabNavigator from "screens/components/utils/BottomTabNavigator";
import LoginScreen from "screens/components/auth/LoginScreen";
import notificationsScreen from "screens/components/notifications/notificationsScreen";
import { usePushNotifications } from "usePushNotifications";
import IndicatorScreen from "screens/components/utils/IdicatorScreen";
import DetalleContratoPage from "screens/components/Contratos/DetalleContratoPage";
import { ContratosModel } from "screens/components/Contratos/ContratosTypes";
import DetalleNominaContrato from "screens/components/nomina/DetalleNominaContrato";
import ContratosPage from "screens/components/Contratos/ContratosPage";
import VacacionesView from "screens/components/nomina/NominaVacaciones";
import IncapacidadesView from "screens/components/nomina/Incapacidades";
import RetencionesPage from "screens/components/nomina/NominaRetenciones";
import { EventRegister } from "react-native-event-listeners";
import StoryDetail from "screens/components/Stories/StoryDetail";
import NominaGeneral from "screens/components/nomina/NominaGeneral";
import InfoContratoUserPage from "screens/components/User/ContratosUser/InfoContratosUser";
import VacacionesUserView from "screens/components/User/Vacaciones/VacacionesUser";
import EstadoObservaciones from "screens/components/User/Vacaciones/ObservacionVacaciones";
import Toast from "react-native-toast-message";
import ObservacionesIncapacidadPage from "screens/components/nomina/SoportesIncapacidad/ObservacionesIncapacidadPage";

export type RootStackParamList = {
  Indicator: undefined;
  Login: undefined;
  Main: undefined;
  Notification: undefined;
  CategoryDetail: { categoryName: string };
  DetalleContrato: { contrato: ContratosModel };
  DetalleNominaContrato: { contrato: ContratosModel };
  Contratos: undefined;
  Vacaciones: undefined;
  UserVacacionesView: { contrato: ContratosModel };
  Incapacidades: { contrato: ContratosModel };
  Retenciones: undefined;
  StoryDetail: { stories: any[]; initialIndex: number };
  NominaGeneral: undefined;
  InfoContratoPage: undefined;
  ObservacionesVacaciones: { idSolicitud: number };
  ObservacionesIncapacidad: { idSolicitud: number };


};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
      setDarkMode(data);
    });
    return () => {
      // EventRegister.removeEventListener(listener);
    };
  }, [darkMode]);

  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  if (expoPushToken) {
    // console.log("TOKEN:", expoPushToken);
  } else {
  }

  return (
    <PaperProvider>
      {/* <themeContext.Provider
        value={darkMode === true ? theme.dark : theme.light}
      > */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Indicator">
          <Stack.Screen
            name="Indicator"
            component={IndicatorScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CategoryDetail"
            component={CategoryDetailScreen}
            options={{ title: "Detalle de Categoría" }}
          />
         
          <Stack.Screen name="Notification" component={notificationsScreen}
            options={{ title: "Notificaciones" }}
          
          />
          <Stack.Screen
            name="DetalleContrato"
            component={DetalleContratoPage}
          />
          <Stack.Screen
            name="DetalleNominaContrato"
            component={DetalleNominaContrato}
            options={{ title: " Detalle Nomina" }}
          />
          <Stack.Screen name="Contratos" component={ContratosPage} />
          <Stack.Screen
            name="Vacaciones"
            component={VacacionesView}
            options={{
              title: " Mis Vacaciones",
            }}
          />
          <Stack.Screen
            name="Incapacidades"
            component={IncapacidadesView}
            options={{
              title: "Incapacidades",
            }}
          />
          <Stack.Screen
            name="Retenciones"
            component={RetencionesPage}
            options={{
              title: "Deducciones y retenciones",
            }}
          />
          <Stack.Screen
            name="StoryDetail"
            component={StoryDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NominaGeneral"
            component={NominaGeneral}
            options={{ headerShown: true, title: "Nómina General" }}
          />
          <Stack.Screen
            name="InfoContratoPage"
            component={InfoContratoUserPage}
          />
          <Stack.Screen
            name="UserVacacionesView"
            component={VacacionesUserView}
            options={{ headerShown: true, title: "Mis Vacaciones" }}
          />
          <Stack.Screen
            name="ObservacionesVacaciones"
            component={EstadoObservaciones}
            options={{ headerShown: true, title: "Observaciones" }}
          />
          <Stack.Screen
            name="ObservacionesIncapacidad"
            component={ObservacionesIncapacidadPage}
            options={{ headerShown: true, title: "Observaciones" }}
          />
        </Stack.Navigator>
        <Toast />

      </NavigationContainer>
      {/* </themeContext.Provider> */}

      {/* Agregar el componente Toast aquí */}
    </PaperProvider>
  );
}