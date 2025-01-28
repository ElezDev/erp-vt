import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { RetencionesStyles } from "./styles/RetencionesStyles";

const RetencionesPage = () => {
  const [retenciones, setretenciones] = useState([
    {
      id: 1,
      novedad: "novedad 1",
      fechaSolicitud: "2021-01-01",
      valor: "100000",
      estado: "Finalizado",
    },
    {
      id: 2,
      novedad: "novedad 2",
      fechaSolicitud: "2022-01-01",
      valor: "100000",
      estado: "Pendiente",
    },
    {
      id: 3,
      novedad: "novedad 3",
      fechaSolicitud: "2022-01-01",
      valor: "100000",
      estado: "Finalizado",
    },


    
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState(retenciones);

  const handleBuscar = (texto: string) => {
    setBusqueda(texto);
    if (texto === "") {
      setResultados(retenciones);
    } else {
      const filtrados = retenciones.filter((p) =>
        p.novedad.toLowerCase().includes(texto.toLowerCase())
      );
      setResultados(filtrados);
    }
  };

  const calcularTotales = () => {
    const totalCantidad = resultados.length;
    const totalValor = resultados.reduce(
      (suma, incapacidad) => suma + parseFloat(incapacidad.valor || "0"),
      0
    );
    return { totalCantidad, totalValor };
  };

  const { totalCantidad, totalValor } = calcularTotales();

  const renderIncapacidad = ({ item }: { item: typeof retenciones[0] }) => (
    <View style={RetencionesStyles.card}>
      <View style={RetencionesStyles.inputRow}>
        <Text style={RetencionesStyles.label}>Novedad:</Text>
        <Text style={RetencionesStyles.input}>{item.novedad}</Text>
      </View>

      <View style={RetencionesStyles.inputRow}>
        <Text style={RetencionesStyles.label}>Fecha solicitud:</Text>
        <Text style={RetencionesStyles.input}>{item.fechaSolicitud}</Text>
      </View>

      <View style={RetencionesStyles.inputRow}>
        <Text style={RetencionesStyles.label}>Valor:</Text>
        <Text style={RetencionesStyles.input}>{item.valor}</Text>
      </View>

      <View style={RetencionesStyles.inputRow}>
        <Text style={RetencionesStyles.label}>Estado:</Text>
        <Text style={RetencionesStyles.input}>{item.estado}</Text>
      </View>

      {/* Botón Soportes */}
      <View style={RetencionesStyles.switchRow}>
        <TouchableOpacity
          style={RetencionesStyles.buttonAdd}
          onPress={() => alert(`Soportes para retencion ${item.id}`)}>
          <Text style={RetencionesStyles.buttonText}>Soportes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={RetencionesStyles.container}>
      {/* Buscador */}
      <View style={RetencionesStyles.searchContainer}>
        <Icon
          name="search"
          size={20}
          color="#888"
          style={RetencionesStyles.searchIcon}
        />
        <TextInput
          style={RetencionesStyles.searchBar}
          value={busqueda}
          onChangeText={handleBuscar}
          placeholder="Buscar..."
        />
      </View>

      {/* Totales */}
      <View style={RetencionesStyles.totalContainer}>
        <Text style={RetencionesStyles.totalText}>
          Valor Retefuente: {totalValor.toFixed(2)}
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

export default RetencionesPage;
