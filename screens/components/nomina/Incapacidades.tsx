import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { incapacidadesStyles } from "./styles/IncapacidadesStyles";

const IncapacidadesPage = () => {
  const [incapacidades, setincapacidades] = useState([
    {
      id: 1,
      fechaInicial: "2021-02-01",
      fechaFinal: "2021-01-01",
      tipo: "Paternidad",
      valor: "100000",
      observacion: "NA",
      estado: "Finalizado",
    },
    {
      id: 2,
      fechaInicial: "2025-02-01",
      fechaFinal: "2021-01-01",
      tipo: "Enfermedad",
      valor: "200000",
      observacion: "NA",
      estado: "Por autorizar",
    },
    {
      id: 3,
      fechaInicial: "2025-02-01",
      fechaFinal: "2021-01-01",
      tipo: "Enfermedad",
      valor: "200000",
      observacion: "NA",
      estado: "Por autorizar",
    },
    {
      id: 4,
      fechaInicial: "2025-02-01",
      fechaFinal: "2021-01-01",
      tipo: "Enfermedad",
      valor: "200000",
      observacion: "NA",
      estado: "Por autorizar",
    },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState(incapacidades);

  const handleBuscar = (texto: string) => {
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
      (suma, incapacidad) => suma + parseFloat(incapacidad.valor || "0"),
      0
    );
    return { totalCantidad, totalValor };
  };

  const { totalCantidad, totalValor } = calcularTotales();

  const renderIncapacidad = ({ item }: { item: typeof incapacidades[0] }) => (
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
        <Text style={incapacidadesStyles.input}>{item.tipo}</Text>
      </View>

      <View style={incapacidadesStyles.inputRow}>
        <Text style={incapacidadesStyles.label}>Valor:</Text>
        <Text style={incapacidadesStyles.input}>{item.valor}</Text>
      </View>

      <View style={incapacidadesStyles.inputRow}>
        <Text style={incapacidadesStyles.label}>Estado:</Text>
        <Text style={incapacidadesStyles.input}>{item.estado}</Text>
      </View>

      {/* Botón Soportes */}
      <View style={incapacidadesStyles.switchRow}>
        <TouchableOpacity
          style={incapacidadesStyles.buttonAdd}
          onPress={() => alert(`Soportes para incapacidad ${item.id}`)}>
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
        data={resultados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderIncapacidad}
      />
    </View>
  );
};

export default IncapacidadesPage;
