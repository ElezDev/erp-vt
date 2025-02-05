import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { NavigationProp, useRoute, RouteProp } from "@react-navigation/native";
import axios from "axios";
import BASE_URL from "src/Config/config";
import color from "src/constant/color";
import { stylesDetalleNomina } from "./styles/DetalleNominaStyles";
import { NominaModel } from "./types/NominaModel";
import { ContratosModel } from "../contratos/ContratosTypes";
import LoadingComponent from "../utils/LoadingComponent";

type RouteParams = {
  DetalleNominaContrato: {
    contrato: ContratosModel;
  };
};

const DetalleNominaContrato = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const route = useRoute<RouteProp<RouteParams, "DetalleNominaContrato">>();
  const contrato = route.params.contrato;
  

  const [nomina, setNomina] = useState<NominaModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${BASE_URL}nominas_by_contrato/${contrato.id}`);
          const data = response.data as NominaModel[];
        
          if (data.length > 0) {
            setNomina(data[0]);
          } else {
            setNomina(null);
          }
        } catch (error) {
          Alert.alert("Error", "No se pudieron cargar los datos de la nómina.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    });
  
    return unsubscribe; 
  }, [navigation, contrato.id]);
  

  if (loading) {
    return <LoadingComponent text="Cargando..." color="#ff6347" />;
  }

  if (!nomina) {
    return (
      <View style={stylesDetalleNomina.container}>
        <Text style={stylesDetalleNomina.noDataText}>
          No hay datos de nómina disponibles para este contrato.
        </Text>
      </View>
    );
  }
 
  return (
    <ScrollView style={stylesDetalleNomina.container}>
      {/* Encabezado */}
      <Animated.View style={{ opacity: new Animated.Value(0) }}>
        <View style={stylesDetalleNomina.headerContainer}></View>
      </Animated.View>

      {/* Datos del Contrato */}
      <View style={stylesDetalleNomina.card}>
        <Text style={stylesDetalleNomina.title}>Datos del Contrato</Text>
        <View style={stylesDetalleNomina.row}>
          <Text style={stylesDetalleNomina.label}>Número de Contrato:</Text>
          {/* <Text style={stylesDetalleNomina.value}>{contrato.numeroContrato}</Text> */}
        </View>
        <View style={stylesDetalleNomina.row}>
          <Text style={stylesDetalleNomina.label}>Devengado:</Text>
          <Text style={stylesDetalleNomina.value}>{nomina.devengado.toLocaleString()}</Text>
        </View>
      </View>

      {/* Cálculos Financieros */}
      <View style={stylesDetalleNomina.card}>
        <Text style={stylesDetalleNomina.title}>Cálculos Financieros</Text>
        <View style={stylesDetalleNomina.row}>
          <Text style={stylesDetalleNomina.label}>Neto Pagado:</Text>
          <Text style={stylesDetalleNomina.value}>
            ${nomina.netoPagado.toLocaleString()}
          </Text>
        </View>
        <View style={stylesDetalleNomina.row}>
          <Text style={stylesDetalleNomina.label}>Total Seg. Social:</Text>
          <Text style={stylesDetalleNomina.value}>
            ${nomina.totalDectoSegSocial.toLocaleString()}
          </Text>
        </View>
        <View style={stylesDetalleNomina.row}>
          <Text style={stylesDetalleNomina.label}>Parafiscales:</Text>
          <Text style={stylesDetalleNomina.value}>
            ${nomina.aportFiscales.toLocaleString()}
          </Text>
        </View>
        <View style={stylesDetalleNomina.row}>
          <Text style={stylesDetalleNomina.label}>Apropiaciones:</Text>
          <Text style={stylesDetalleNomina.value}>
            ${nomina.totalApropiaciones.toLocaleString()}
          </Text>
        </View>
        <View style={stylesDetalleNomina.row}>
          <Text style={stylesDetalleNomina.label}>Costo Trabajador:</Text>
          <Text style={stylesDetalleNomina.value}>
            ${nomina.valorTotalPorTrabajador.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Acciones */}
      <View  style={stylesDetalleNomina.actionsContainer}>
        <TouchableOpacity style={stylesDetalleNomina.actionButton} onPress={() => navigation.navigate("UserVacacionesView",{ contrato })}>
          <Icon name="beach-access" size={28} color="#fff" />
          <Text style={stylesDetalleNomina.actionText}>Vacaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesDetalleNomina.actionButton} onPress={() => Alert.alert("Info", "Detalle del contrato")}>
          <Entypo name="info" size={24} color="#fff" />
          <Text style={stylesDetalleNomina.actionText}>Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesDetalleNomina.actionButton} onPress={() => navigation.navigate("Incapacidades",{ contrato })}>
          <FontAwesome5 name="briefcase-medical" size={24} color="#fff" />
          <Text style={stylesDetalleNomina.actionText}>Incapacidades</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesDetalleNomina.actionButton} onPress={() => navigation.navigate("Retenciones")}>
          <FontAwesome5 name="comments-dollar" size={24} color="#fff" />
          <Text style={stylesDetalleNomina.actionText}>Retenciones</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetalleNominaContrato;