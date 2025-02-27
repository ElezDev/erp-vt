import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import BASE_URL from "src/Config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { stylesProfile } from "./StylesProfile";
import { Persona } from "../Contratos/ContratosTypes";
import LoadingComponent from "../utils/LoadingComponent";

const ProfileScreen = () => {
  const [userData, setUserData] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        const roles = await AsyncStorage.getItem("roles");
        
        const response = await axios.get(
          `${BASE_URL}user_mobile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserData((response.data as { persona: Persona }).persona);
        
      } catch (error) {
        Alert.alert("Error", "No se pudo cargar la información del usuario.");
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro de que deseas cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        onPress: async () => {
          await AsyncStorage.removeItem("access_token");
          navigation.reset({ index: 0, routes: [{ name: "Login" as never }] });
        },
      },
    ]);
  };

  if (loading) {
    return <LoadingComponent text="Cargando perfil..." color="#ff6347" />;
  }

  if (!userData) {
    return (
      <View style={stylesProfile.centeredContainer}>
        <Text style={stylesProfile.errorText}>
          No se pudieron cargar los datos del usuario.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={stylesProfile.container}>
      {/* Encabezado */}
      <View style={stylesProfile.headerCard}>
        <Image source={{ uri: userData.rutaFotoUrl }} style={stylesProfile.profileImage} />
        <Text style={stylesProfile.name}>
          {`${userData.nombre1} ${userData.nombre2} ${userData.apellido1}`}
        </Text>
        <Text style={stylesProfile.position}>Administrador del Sistema</Text>
      </View>

      {/* Información Personal */}
      <View style={stylesProfile.infoCard}>
        <Text style={stylesProfile.cardTitle}>Información Personal</Text>
        <Text style={stylesProfile.infoText}>
          📧 {userData.email}
        </Text>
        <Text style={stylesProfile.infoText}>
          📞 {userData.telefonoFijo || "N/A"}
        </Text>
        <Text style={stylesProfile.infoText}>
          📱 {userData.celular || "N/A"}
        </Text>
        <Text style={stylesProfile.infoText}>
          📍 {userData.ciudad_ubicacion.descripcion} - {userData.direccion}
        </Text>
      </View>

      {/* Perfil */}
      <View style={stylesProfile.infoCard}>
        <Text style={stylesProfile.cardTitle}>Perfil</Text>
        <Text style={stylesProfile.infoText}>{userData.perfil}</Text>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;