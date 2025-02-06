import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import BASE_URL from "src/Config/config";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { stylesDetalle } from "screens/components/Contratos/StylesDetalle";
import { ContratosModel } from "screens/components/Contratos/ContratosTypes";
import { stylesContrato } from "screens/components/Contratos/StylesContrato";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingComponent from "screens/components/utils/LoadingComponent";
import Toast from "react-native-toast-message";

type InfoContratoPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "InfoContratoPage"
>;

interface InfoContratoProps {
  navigation: InfoContratoPageNavigationProp;
}

const InfoContratoUserPage = ({ navigation }: InfoContratoProps) => {
  const [contratoDetails, setContratoDetails] = useState<ContratosModel | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const handleSelectContrato = (contrato: ContratosModel) => {
    navigation.navigate("DetalleNominaContrato", { contrato });
  };

  const fetchContrato = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");

      setLoading(true);
      setError(null);

      const response = await axios.get(`${BASE_URL}contrato_by_user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setContratoDetails(response.data as ContratosModel);
    } catch (error) {
      Toast.show({
        text1: "Error al cargar los contratos.",
        type: "error",
        topOffset: 100,
        bottomOffset: 50,
        text1Style: { fontSize: 18 },
      })
        setError("Hubo un problema al cargar el contrato.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContrato();
  }, []);

  useEffect(() => {
    if (contratoDetails) {
      navigation.setOptions({
        title: `${contratoDetails.persona.nombre1} ${contratoDetails.persona.apellido1}`,
      });
    }
  }, [contratoDetails, navigation]);

  if (loading) {
    return <LoadingComponent text="Cargando..." color="#ff6347" />;
  }

  if (error) {
    return (
      <View style={stylesContrato.errorContainer}>
        <Text style={stylesContrato.errorText}>{error}</Text>
        <Button title="Reintentar" onPress={fetchContrato} />
      </View>
    );
  }

  if (!contratoDetails) {
    return (
      <Text style={stylesContrato.errorText}>
        No se encontraron detalles del contrato.
      </Text>
    );
  }

  return (
    <ScrollView style={stylesContrato.container}>
      <View style={stylesContrato.body}>
        {/* Lado Derecho: Información del contrato y persona */}
        <View style={stylesContrato.rightSide}>
          <View style={stylesContrato.cardHeader}>
            <Image
              source={
                imageError || !contratoDetails.persona.rutaFotoUrl
                  ? require("../../../../assets/images/avatar.png")
                  : { uri: contratoDetails.persona.rutaFotoUrl }
              }
              style={stylesDetalle.avatar}
              onError={() => setImageError(true)}
            />
            <View style={stylesContrato.cardHeaderText}>
              <Text style={[stylesContrato.title, stylesContrato.bold]}>
                {contratoDetails.numeroContrato}
              </Text>
              <Text style={stylesContrato.subtitle}>
                {contratoDetails.persona.nombre1}{" "}
                {contratoDetails.persona.apellido1}
              </Text>
              <Text style={stylesContrato.jobTitle}>
                {contratoDetails.persona.perfil}
              </Text>
            </View>
          </View>

          <View style={stylesContrato.detailsContainer}>
            <View style={stylesContrato.infoItem}>
              <Icon name="calendar" size={20} color="#ff8c00" />
              <Text style={stylesContrato.info}>
                Fecha de Contratación: {contratoDetails.fechaContratacion}
              </Text>
            </View>
            <View style={stylesContrato.infoItem}>
              <Icon name="money" size={20} color="#ff8c00" />
              <Text style={stylesContrato.info}>
                Valor Total: $
                {contratoDetails.valorTotalContrato.toLocaleString()}
              </Text>
            </View>
            <View style={stylesContrato.infoItem}>
              <Icon
                name={
                  contratoDetails.estado.estado === "ACTIVO" ? "check" : "times"
                }
                size={20}
                color={
                  contratoDetails.estado.estado === "ACTIVO" ? "green" : "red"
                }
              />
              <Text style={stylesContrato.info}>
                Estado:
                <Text
                  style={
                    contratoDetails.estado.estado === "ACTIVO"
                      ? stylesContrato.activo
                      : stylesContrato.inactivo
                  }
                >
                  {contratoDetails.estado.estado}
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Sección con tarjetas adicionales */}
      <View style={stylesContrato.cardGrid}>
        <View style={stylesContrato.cardItem}>
          <Text style={stylesContrato.cardTitle}>Acerca del Contrato</Text>
          <Text style={stylesContrato.cardContent}>
            Fecha Ini: {contratoDetails.fechaContratacion}
            {"\n"}
             Fecha Fin: {contratoDetails.fechaFinalContrato}
            {"\n"}
            {"\n"}
            {/* {contratoDetails.salario.rol.name}
            {"\n"} */}
            {contratoDetails.objetoContrato}
            {"\n"}
            {"\n"}
            {contratoDetails.salario.valor.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Botón para regresar */}

      <View style={stylesContrato.container}>
        <TouchableOpacity
          style={stylesDetalle.buttonNomina}
          onPress={() => handleSelectContrato(contratoDetails)}
        >
          <FontAwesome5
            name="file-invoice-dollar"
            size={16}
            color="#FFF"
            style={{ marginRight: 10 }}
          />
          <Text style={stylesDetalle.buttonNominaText}>Detalle Nómina</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default InfoContratoUserPage;
