import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { incapacidadesStyles } from "./styles/IncapacidadesStyles";
import BASE_URL from "src/Config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IncapacidadModel } from "./types/IncapacidadModel";
import { ContratosModel } from "../contratos/ContratosTypes";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";

type RouteParams = {
  IncapacidadesPage: {
    contrato: ContratosModel;
  };
};

const IncapacidadesPage = ({navigation}:{
  navigation: NavigationProp<any>;
}) => {
   const route = useRoute<RouteProp<RouteParams, "IncapacidadesPage">>();
  const contrato = route.params.contrato;
  const [incapacidades, setIncapacidades] = useState<IncapacidadModel[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<IncapacidadModel[]>([]);

  const handleNavigatetosupports = ()=>{
    navigation.navigate("ObservacionesIncapacidad", { contrato });
  }
  
  useEffect(() => {
    const fetchIncapacidades = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");

        const response = await axios.get(`${BASE_URL}get_my_solicitudes_worker/${contrato.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const datos: IncapacidadModel[] = (response.data as any[]).map((item: any) => ({
          id: item.id,
          fechaInicial: item.fechaInicial,
          fechaFinal: item.fechaFinal,
          tipo: item.tipo ?? "N/A",
          valor: item.valor.toLocaleString(),
          observacion: item.observacion ?? "N/A",
          estado: item.estado,
          fechaSolicitud: item.fechaSolicitud,
          urlSoporte: item.urlSoporte,
          idContrato: item.idContrato,
          idTipoIncapacidad: item.idTipoIncapacidad,
          idEmpleado: item.idEmpleado,
          idEmpresa: item.idEmpresa,
          idSede: item.idSede,
          numDias: item.numDias,
          created_at: item.created_at,
          updated_at: item.updated_at,
          rutaSoporte: item.rutaSoporte,
        }));

        setIncapacidades(datos);
        setResultados(datos);
      } catch (error) {
        console.error("Error al cargar las incapacidades:", error);
      }
    };

    fetchIncapacidades();
  }, []);


  
  const handleBuscar = (texto:any) => {
    setBusqueda(texto);
    if (texto === "") {
      setResultados(incapacidades);
    } else {
      const filtrados = incapacidades.filter((p) =>
        p.fechaFinal.toLowerCase().includes(texto.toLowerCase())
      );
      setResultados(filtrados);
    }
  };

  const calcularTotales = () => {
    const totalCantidad = resultados.length;
    const totalValor = resultados.reduce(
      (suma, incapacidad) => suma + parseFloat(incapacidad.valor?.toString() || "0"),
      0
    );
    return { totalCantidad, totalValor };
  };

  const { totalCantidad, totalValor } = calcularTotales();

  const renderIncapacidad = ({ item }: { item: IncapacidadModel }) => (
    <View style={incapacidadesStyles.card}>
      <View style={incapacidadesStyles.inputRow}>
        <Text style={incapacidadesStyles.label}>Fecha Ini:</Text>
        <Text style={incapacidadesStyles.input}>{item.fechaInicial}</Text>
      </View>

      <View style={incapacidadesStyles.inputRow}>
        <Text style={incapacidadesStyles.label}>Fecha fin:</Text>
        <Text style={incapacidadesStyles.input}>{item.fechaFinal}</Text>
      </View>

      <View style={incapacidadesStyles.inputRow}>
        <Text style={incapacidadesStyles.label}>Tipo:</Text>
        <Text style={incapacidadesStyles.input}>{item.idTipoIncapacidad}</Text>
      </View>

      <View style={incapacidadesStyles.inputRow}>
        <Text style={incapacidadesStyles.label}>Valor:</Text>
        <Text style={incapacidadesStyles.input}>{item.valor.toLocaleString()}</Text>
      </View>

      <View style={incapacidadesStyles.inputRow}>
        <Text style={incapacidadesStyles.label}>Estado:</Text>
        <Text style={incapacidadesStyles.input}>{item.estado}</Text>
      </View>

      {/* Botón Soportes */}
      <View style={incapacidadesStyles.switchRow}>
        <TouchableOpacity
        style={incapacidadesStyles.buttonAdd}
        onPress={() => navigation.navigate(`ObservacionesIncapacidad`, { idSolicitud: item.id })}>
        <Text style={incapacidadesStyles.buttonText}>Soportes</Text>
      </TouchableOpacity>

      </View>
    </View>
  );

  return (
    <View style={incapacidadesStyles.container}>
      {/* Buscador */}
      <View style={incapacidadesStyles.searchContainer}>
        <Icon
          name="search"
          size={20}
          color="#888"
          style={incapacidadesStyles.searchIcon}
        />
        <TextInput
          style={incapacidadesStyles.searchBar}
          value={busqueda}
          onChangeText={handleBuscar}
          placeholder="Buscar..."
        />
      </View>

      {/* Totales */}
      <View style={incapacidadesStyles.totalContainer}>
        <Text style={incapacidadesStyles.totalText}>
          Total Incapacidades: {totalCantidad}
        </Text>
        <Text style={incapacidadesStyles.totalText}>
          Valor Total: {totalValor.toFixed(2)}
        </Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={resultados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderIncapacidad}
      />
    </View>
  );
};

export default IncapacidadesPage;
