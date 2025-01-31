import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import BASE_URL from "src/Config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { stylesProfile } from "./StylesProfile";
import { Persona } from "../contratos/ContratosTypes";



const ProfileScreen = () => {
  const [userData, setUserData] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        const roles = await AsyncStorage.getItem("roles");
        console.log("Roles:", roles);
        
        const response = await axios.get(
          `${BASE_URL}user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUserData((response.data as { persona: Persona }).persona);
        console.log("User data:", response.data);
        
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
    return (
      <View style={stylesProfile.centeredContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
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

  const {
    nombre1,
    nombre2,
    apellido1,
    apellido2,
    email,
    direccion,
    celular,
    telefonoFijo,
    perfil,
    rutaFotoUrl,
    ciudad_ubicacion,
  } = userData;

  return (
    <ScrollView contentContainerStyle={stylesProfile.container}>
      {/* Encabezado */}
      <View style={stylesProfile.headerCard}>
        <Image source={{ uri: rutaFotoUrl }} style={stylesProfile.profileImage} />
        <Text style={stylesProfile.name}>
          {`${nombre1} ${nombre2} ${apellido1}`}
        </Text>
        <Text style={stylesProfile.position}>Administrador del Sistema</Text>
      </View>

      {/* Información Personal */}
      <View style={stylesProfile.infoCard}>
        <Text style={stylesProfile.cardTitle}>Información Personal</Text>
        <Text style={stylesProfile.infoText}>
          📧 {email}
        </Text>
        <Text style={stylesProfile.infoText}>
          📞 {telefonoFijo || "N/A"}
        </Text>
        <Text style={stylesProfile.infoText}>
          📱 {celular || "N/A"}
        </Text>
        <Text style={stylesProfile.infoText}>
          📍 {ciudad_ubicacion.descripcion} || <Text style={stylesProfile.infoText}>{direccion}</Text>
        </Text>
      </View>

      {/* Dirección */} 
      {/* <View style={stylesProfile.infoCard}>
        <Text style={stylesProfile.cardTitle}>Dirección</Text>
        <Text style={stylesProfile.infoText}>{direccion}</Text>
      </View> */}

      {/* Perfil */}
      <View style={stylesProfile.infoCard}>
        <Text style={stylesProfile.cardTitle}>Perfil</Text>
        <Text style={stylesProfile.infoText}>{perfil}</Text>
      </View>

      {/* Botón de Cerrar Sesión */}
      {/* <TouchableOpacity style={stylesProfile.logoutButton} onPress={handleLogout}>
        <Text style={stylesProfile.buttonText}>Cerrar sesión</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};


export default ProfileScreen;
