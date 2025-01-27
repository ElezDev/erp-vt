import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import color from "src/constant/color";
import BannerNomina from "./BannerNomina";

import { NavigationProp } from '@react-navigation/native';
import { stylesGeneral } from "./styles/NominaGeneralStyles";

interface NominaGeneralProps {
  navigation: NavigationProp<any>;
}

const NominaGeneral = ({ navigation }: NominaGeneralProps) => {
  const totalNomina = 50000000; 
  const contratosActivos = 45;
  const promedioSalario = 2500000; 
  const departamentosTop = [
    { nombre: "Recursos Humanos", empleados: 10 },
    { nombre: "Tecnología", empleados: 20 },
    { nombre: "Ventas", empleados: 15 },
  ];
  const totalBeneficios = 8000000; 

  const handleVerContratos = () => {
    navigation.navigate("Contratos");
  };

  return (
    <ScrollView style={stylesGeneral.container}>
        <BannerNomina navigation={navigation} />
      <Text></Text>
      {/* Tarjeta de Resumen */}
      <View style={stylesGeneral.card}>
        <Text style={stylesGeneral.cardTitle}>Resumen General</Text>
        <View style={stylesGeneral.dataRow}>
          <FontAwesome5 name="money-bill-wave" size={24} color="#4CAF50" />
          <Text style={stylesGeneral.dataText}>
            Costo Total de Nómina:{" "}
            <Text style={stylesGeneral.dataValue}>
              ${totalNomina.toLocaleString("es-CO")}
            </Text>
          </Text>
        </View>
        <View style={stylesGeneral.dataRow}>
          <FontAwesome5 name="file-contract" size={24} color="#4CAF50" />
          <Text style={stylesGeneral.dataText}>
            Contratos Activos:{" "}
            <Text style={stylesGeneral.dataValue}>{contratosActivos}</Text>
          </Text>
        </View>
        <View style={stylesGeneral.dataRow}>
          <FontAwesome5 name="chart-line" size={24} color="#4CAF50" />
          <Text style={stylesGeneral.dataText}>
            Promedio Salarial:{" "}
            <Text style={stylesGeneral.dataValue}>
              ${promedioSalario.toLocaleString("es-CO")}
            </Text>
          </Text>
        </View>
      </View>

      {/* Tarjeta de Departamentos */}
      <View style={stylesGeneral.card}>
        <Text style={stylesGeneral.cardTitle}>Departamentos Destacados</Text>
        {departamentosTop.map((dep, index) => (
          <View key={index} style={stylesGeneral.dataRow}>
            <FontAwesome5 name="building" size={24} color="#2196F3" />
            <Text style={stylesGeneral.dataText}>
              {dep.nombre}:{" "}
              <Text style={stylesGeneral.dataValue}>{dep.empleados} empleados</Text>
            </Text>
          </View>
        ))}
      </View>

      {/* Botones */}
      {/* <View style={stylesGeneral.buttonContainer}>
        <TouchableOpacity
          style={stylesGeneral.buttonNomina}
          onPress={handleVerContratos}
        >
           <FontAwesome5 name="file-contract" size={16} color="#FFF" style={{ marginRight: 10 }} />
          <Text style={stylesGeneral.buttonNominaText}>Contratos</Text>
        </TouchableOpacity>
       
      </View> */}
    </ScrollView>
  );
};



export default NominaGeneral;
