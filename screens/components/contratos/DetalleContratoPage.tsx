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
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ContratosModel } from "./ContratosTypes";
import { RootStackParamList } from "App";
import { stylesContrato } from "./StylesContrato";
import Icon from "react-native-vector-icons/FontAwesome";
import { stylesDetalle } from "./StylesDetalle";
import { FontAwesome5 } from '@expo/vector-icons'; 
import LoadingComponent from "../utils/LoadingComponent";


type DetalleContratoScreenRouteProp = RouteProp<
  RootStackParamList,
  "DetalleContrato"
>;
type DetalleContratoScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DetalleContrato"
>;

interface DetalleContratoProps {
  route: DetalleContratoScreenRouteProp;
  navigation: DetalleContratoScreenNavigationProp;
}

const DetalleContratoPage = ({ route, navigation }: DetalleContratoProps) => {
  const { contrato } = route.params;

  const [contratoDetails, setContratoDetails] = useState<ContratosModel | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const handleSelectContrato = (contrato: ContratosModel) => {
    navigation.navigate("DetalleNominaContrato", { contrato });
  };
  const fetchContrato = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!contrato.numeroContrato) {
        const response = await axios.get(
          `${BASE_URL}contrato_by_id/${contrato.id}`
        );
        setContratoDetails(response.data as ContratosModel);
      } else {
        setContratoDetails(contrato);
      }
    } catch (error) {
      console.error("Error al cargar el contrato:", error);
      setError("Hubo un problema al cargar el contrato.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContrato();
    if (contratoDetails) {
      navigation.setOptions({
        title: `${contratoDetails.persona.nombre1} ${contratoDetails.persona.apellido1}`,
      });
    }
  }, [contrato, contratoDetails, navigation]);

  if (loading) {
    return <LoadingComponent text="Cargando contrato..." color="#ff6347" />;
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

  const cards = new Array(1).fill(0);

  return (
    <ScrollView style={stylesContrato.container}>
      <View style={stylesContrato.body}>
    
        {/* Lado Derecho: Información del contrato y persona */}
        <View style={stylesContrato.rightSide}>
          <View style={stylesContrato.cardHeader}>
            <Image
              source={{ uri: contratoDetails.persona.rutaFotoUrl }}
              style={stylesContrato.avatar}
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
                name={contratoDetails.estado.estado === "ACTIVO" ? "check" : "times"}
                size={20}
                color={contratoDetails.estado.estado === "ACTIVO" ? "green" : "red"}
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
        {cards.map((_, index) => (
          <View key={index} style={stylesContrato.cardItem}>
            <Text style={stylesContrato.cardTitle}>Acerca del Contrato</Text>
            <Text style={stylesContrato.cardContent}>
              {contratoDetails.fechaContratacion}
              {"\n"}
              {contratoDetails.fechaFinalContrato}
              {"\n"}
              {contratoDetails.salario.rol.name}
              {"\n"}
              {contratoDetails.objetoContrato}
              {"\n"}
              {contratoDetails.salario.valor}
            </Text>
          </View>
        ))}
      </View>

      {/* Botón para regresar */}

<View style={stylesContrato.container}>
  <TouchableOpacity 
    style={stylesDetalle.buttonNomina} 
    onPress={() => handleSelectContrato(contratoDetails)}
  >
    <FontAwesome5 name="file-invoice-dollar" size={16} color="#FFF" style={{ marginRight: 10 }} />
    <Text style={stylesDetalle.buttonNominaText}>Detalle Nómina</Text>
  </TouchableOpacity>
</View>

      
    </ScrollView>
  );
};

export default DetalleContratoPage;
