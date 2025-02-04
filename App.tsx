import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import CategoryDetailScreen from "./screens/components/categories/CategoryDetailScreen";
import NewsDetailScreen from "./screens/components/news/NewsDetailScreen";
import BottomTabNavigator from "screens/components/utils/BottomTabNavigator";
import LoginScreen from "screens/components/auth/LoginScreen";
import notificationsScreen from "screens/components/notifications/notificationsScreen";
import { usePushNotifications } from "usePushNotifications";
import IndicatorScreen from "screens/components/utils/IdicatorScreen";
import DetalleContratoPage from "screens/components/contratos/DetalleContratoPage";
import { ContratosModel } from "screens/components/contratos/ContratosTypes";
import DetalleNominaContrato from "screens/components/nomina/DetalleNominaContrato";
import ContratosPage from "screens/components/contratos/ContratosPage";
import VacacionesView from "screens/components/nomina/NominaVacaciones";
import IncapacidadesView from "screens/components/nomina/Incapacidades";
import RetencionesPage from "screens/components/nomina/NominaRetenciones";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "theme/themeContext";
import theme from "theme/theme";
import StoryDetail from "screens/components/Stories/StoryDetail";
import Nomina from "screens/components/nomina/Nomina";
import NominaGeneral from "screens/components/nomina/NominaGeneral";
import InfoContratoUserPage from "screens/components/User/ContratosUser/InfocontratosUser";
import VacacionesUserView from "screens/components/User/Vacaciones/VacacionesUser";
import EstadoObservaciones from "screens/components/User/Vacaciones/Comment";
import Toast from "react-native-toast-message";

export type RootStackParamList = {
  Indicator: undefined;
  Login: undefined;
  Main: undefined;
  Notification: undefined;
  CategoryDetail: { categoryName: string };
  NewsDetail: {
    newsItem: { id: number; title: string; description: string; image: string };
  };
  DetalleContrato: { contrato: ContratosModel };
  DetalleNominaContrato: { contrato: ContratosModel };
  Contratos: undefined;
  Vacaciones: undefined;
  UserVacacionesView: { contrato: ContratosModel };
  Incapacidades: undefined;
  Retenciones: undefined;
  StoryDetail: { stories: any[]; initialIndex: number };
  NominaGeneral: undefined;
  InfoContratoPage: undefined;
  ObservacionesVacaciones: { idSolicitud: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
      setDarkMode(data);
      console.log("DarkMode", data);
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
          <Stack.Screen
            name="NewsDetail"
            component={NewsDetailScreen}
            options={{ title: "Detalle de Noticia" }}
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
        </Stack.Navigator>
        <Toast />

      </NavigationContainer>
      {/* </themeContext.Provider> */}

      {/* Agregar el componente Toast aquí */}
    </PaperProvider>
  );
}