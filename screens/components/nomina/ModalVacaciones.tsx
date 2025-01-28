import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  TextInput,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { stylesVacaciones } from "./styles/VacacionesStyles";

const VacacionesView = () => {
  const [periodos, setPeriodos] = useState([
    {
      id: 1,
      periodo: "2021",
      fechaSolicitud: "2021-01-01",
      fechaLiquidacion: "2021-02-01",
      fechaEjecucion: "2021-03-01",
      seleccionado: false,
      estado: "Pendiente",
    },
    {
      id: 2,
      periodo: "2022",
      fechaSolicitud: "2022-01-01",
      fechaLiquidacion: "2022-02-01",
      fechaEjecucion: "2022-03-01",
      seleccionado: true,
      estado: "Aprobado",
    },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState(periodos);

  const handleBuscar = (texto: string) => {
    setBusqueda(texto);
    if (texto === "") {
      setResultados(periodos);
    } else {
      const filtrados = periodos.filter((p) =>
        p.periodo.toLowerCase().includes(texto.toLowerCase())
      );
      setResultados(filtrados);
    }
  };

  interface Periodo {
    id: number;
    periodo: string;
    fechaSolicitud: string;
    fechaLiquidacion: string;
    fechaEjecucion: string;
    seleccionado: boolean;
    estado: string;
  }

  const handleActualizarPeriodo = (id: number, campo: keyof Periodo, valor: string | boolean) => {
    const actualizados = periodos.map((p) =>
      p.id === id ? { ...p, [campo]: valor } : p
    );
    setPeriodos(actualizados);
    setResultados(actualizados.filter((p) =>
      p.periodo.toLowerCase().includes(busqueda.toLowerCase())
    ));
  };

  const renderPeriodo = ({ item }: { item: { id: number; periodo: string; fechaSolicitud: string; fechaLiquidacion: string; fechaEjecucion: string; seleccionado: boolean; estado: string; } }) => (
    <View style={stylesVacaciones.card}>
      <Text style={stylesVacaciones.cardTitle}>Período: {item.periodo || "Nuevo"}</Text>

      <View style={stylesVacaciones.inputRow}>
        <Text style={stylesVacaciones.label}>Período:</Text>
        <TextInput
          style={stylesVacaciones.input}
          value={item.periodo}
          onChangeText={(text) => handleActualizarPeriodo(item.id, "periodo", text)}
          placeholder="Año"
        />
      </View>

      <View style={stylesVacaciones.inputRow}>
        <Text style={stylesVacaciones.label}>Solicitud:</Text>
        <TextInput
          style={stylesVacaciones.input}
          value={item.fechaSolicitud}
          onChangeText={(text) =>
            handleActualizarPeriodo(item.id, "fechaSolicitud", text)
          }
          placeholder="Fecha Solicitud"
        />
      </View>

      <View style={stylesVacaciones.inputRow}>
        <Text style={stylesVacaciones.label}>Liquidación:</Text>
        <TextInput
          style={stylesVacaciones.input}
          value={item.fechaLiquidacion}
          onChangeText={(text) =>
            handleActualizarPeriodo(item.id, "fechaLiquidacion", text)
          }
          placeholder="Fecha Liquidación"
        />
      </View>

      <View style={stylesVacaciones.inputRow}>
        <Text style={stylesVacaciones.label}>Ejecución:</Text>
        <TextInput
          style={stylesVacaciones.input}
          value={item.fechaEjecucion}
          onChangeText={(text) =>
            handleActualizarPeriodo(item.id, "fechaEjecucion", text)
          }
          placeholder="Fecha Ejecución"
        />
      </View>

      <Switch
  style={stylesVacaciones.switch}
  value={item.seleccionado}
  onValueChange={(value) =>
    handleActualizarPeriodo(item.id, "seleccionado", value)
  }
  thumbColor={item.seleccionado ? "#ff6605" : "#f4f4f4"} // Cambia el color del círculo.
  trackColor={{
    false: "#ccc",
    true: "#ff6605",
  }}
/>

    </View>
  );

  return (
    <View style={stylesVacaciones.container}>
      {/* Buscador */}
      <View style={stylesVacaciones.searchContainer}>
        <Icon name="search" size={20} color="#888" style={stylesVacaciones.searchIcon} />
        <TextInput
          style={stylesVacaciones.searchBar}
          value={busqueda}
          onChangeText={handleBuscar}
          placeholder="Buscar por período"
        />
      </View>

      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPeriodo}
      />
    </View>
  );
};


export default VacacionesView;
