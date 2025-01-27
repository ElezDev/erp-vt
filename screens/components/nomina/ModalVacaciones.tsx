import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Switch,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";

const ModalVacaciones = ({ visible, onClose }) => {
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

  const handleAgregarPeriodo = () => {
    const nuevoPeriodo = {
      id: periodos.length + 1,
      periodo: "",
      fechaSolicitud: "",
      fechaLiquidacion: "",
      fechaEjecucion: "",
      seleccionado: false,
      estado: "Pendiente",
    };
    setPeriodos([...periodos, nuevoPeriodo]);
  };

  const handleGuardar = () => {
    console.log("Datos guardados:", periodos);
    onClose();
  };

  const handleActualizarPeriodo = (id, campo, valor) => {
    const actualizados = periodos.map((p) =>
      p.id === id ? { ...p, [campo]: valor } : p
    );
    setPeriodos(actualizados);
  };

  const renderPeriodo = ({ item }) => (
    <View style={styles.row}>
      {/* Período */}
      <TextInput
        style={styles.input}
        value={item.periodo}
        onChangeText={(text) => handleActualizarPeriodo(item.id, "periodo", text)}
        placeholder="Año"
      />
      {/* Fecha de Solicitud */}
      <TextInput
        style={styles.input}
        value={item.fechaSolicitud}
        onChangeText={(text) =>
          handleActualizarPeriodo(item.id, "fechaSolicitud", text)
        }
        placeholder="Fecha Solicitud"
      />
      {/* Fecha de Liquidación */}
      <TextInput
        style={styles.input}
        value={item.fechaLiquidacion}
        onChangeText={(text) =>
          handleActualizarPeriodo(item.id, "fechaLiquidacion", text)
        }
        placeholder="Fecha Liquidación"
      />
      {/* Fecha de Ejecución */}
      <TextInput
        style={styles.input}
        value={item.fechaEjecucion}
        onChangeText={(text) =>
          handleActualizarPeriodo(item.id, "fechaEjecucion", text)
        }
        placeholder="Fecha Ejecución"
      />
      {/* Switch */}
      <Switch
        value={item.seleccionado}
        onValueChange={(value) =>
          handleActualizarPeriodo(item.id, "seleccionado", value)
        }
      />
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Vacaciones</Text>

          {/* Tabla de Períodos */}
          <FlatList
            data={periodos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPeriodo}
            ListHeaderComponent={() => (
              <View style={styles.row}>
                <Text style={[styles.header, { flex: 1 }]}>Período</Text>
                <Text style={[styles.header, { flex: 2 }]}>Solicitud</Text>
                <Text style={[styles.header, { flex: 2 }]}>Liquidación</Text>
                <Text style={[styles.header, { flex: 2 }]}>Ejecución</Text>
                <Text style={[styles.header, { flex: 1 }]}>Seleccionado</Text>
              </View>
            )}
          />

          {/* Botón para agregar un nuevo período */}
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={handleAgregarPeriodo}
          >
            <Text style={styles.buttonText}>Agregar Período</Text>
          </TouchableOpacity>

          {/* Botones */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSave} onPress={handleGuardar}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonAdd: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  buttonSave: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ModalVacaciones;
