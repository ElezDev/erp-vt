import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  FlatList,
  TextInput,
  Button,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { stylesVacaciones } from "screens/components/nomina/styles/VacacionesStyles";
import axios from "axios";
import {
  Vacacion,
  VacacionesResponse,
} from "screens/components/nomina/types/VacacionesModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "src/Config/config";
import color from "src/constant/color";
import { ContratosModel } from "screens/components/contratos/ContratosTypes";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { EventRegister } from "react-native-event-listeners";


const estadoColors: { [key: string]: string } = {
  PENDIENTE: "#FDFDFDFF",
  LIQUIDADO: "#32CD32",
  PORAUTORIZAR: color.accentColor,
};

type RouteParams = {
  UserVacacionesView: {
    contrato: ContratosModel;
  };
};




const VacacionesUserView = ( {navigation}: {
  navigation: NavigationProp<any>;
}) => {

  const route = useRoute<RouteProp<RouteParams, "UserVacacionesView">>();
  const contrato = route.params.contrato;
  const [vacaciones, setVacaciones] = useState<Vacacion[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [busqueda, setBusqueda] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [fechaInicial, setFechaInicial] = useState<Date>(new Date());
  const [comentario, setComentario] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    const fetchVacaciones = async (): Promise<Vacacion[]> => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        const response = await axios.get<VacacionesResponse>(
          `${BASE_URL}vacaciones`,
          {
            params: {
              periodo: "",
              idSolicitud: "",
              idContrato: contrato.id, 
              estado: "",
            },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(contrato.id);
        return response.data.vacaciones;
      } catch (error) {
        console.error("Error fetching vacaciones:", error);
        return [];
      }
    };
  
    fetchVacaciones().then((data) => setVacaciones(data));
  }, [contrato.id]); 

  const handleBuscar = (texto: string) => {
    setBusqueda(texto);
  };

  const handleSeleccionar = (id: number) => {
    const nuevosSeleccionados = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];
    setSelectedIds(nuevosSeleccionados);
  };
  
  const handleEnviar = async () => {
    if (selectedIds.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Debes seleccionar al menos un período de vacaciones.",
      });
      return;
    }
  
    const datos = {
      periodos: selectedIds,
      fechaInicial: fechaInicial.toISOString().split("T")[0],
      comentario,
    };
  
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await axios.post(`${BASE_URL}create_solicitud_vacaciones`, datos, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
  
      if (response.status === 201) {
        Toast.show({
          type: "success",
          text1: "Éxito",
          text2: "Solicitud enviada correctamente.",
          position: 'top', 
          visibilityTime: 3000,
          text1Style: { fontSize: 20 }, 
          text2Style: { fontSize: 18 }, 
        });
        EventRegister.emit("nuevaObservacion", {});
        setSelectedIds([]);
        setFechaInicial(new Date());
        setComentario("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error("Error enviando la solicitud:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo enviar la solicitud.",
        position: 'top', 
          visibilityTime: 3000,
          text1Style: { fontSize: 20 }, 
          text2Style: { fontSize: 18 }, 
      });
    }
  };
  
  

  const vacacionesFiltradas = busqueda
    ? vacaciones.filter((v) => v.periodo.toString().includes(busqueda))
    : vacaciones;

    const renderVacacion = ({ item }: { item: Vacacion }) => (
      <View
        style={[
          stylesVacaciones.card,
          { backgroundColor: estadoColors[item.estado] },
        ]}
      >
        <Text style={stylesVacaciones.cardTitle}>Período: {item.periodo}</Text>
        <Text style={stylesVacaciones.label}>Estado: {item.estado}</Text>
    
        {/* Switch para seleccionar vacaciones */}
        <Switch
          style={stylesVacaciones.switch}
          value={!!item.idSolicitud || selectedIds.includes(item.id)}
          onValueChange={() => {
            if (!item.idSolicitud) {
              handleSeleccionar(item.id);
            } else {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Este período ya tiene una solicitud asociada.",
              });
            }
          }}
          thumbColor={selectedIds.includes(item.id) ? "#ff6605" : "#f4f4f4"}
          trackColor={{
            false: "#ccc",
            true: "#ff6605",
          }}
          disabled={!!item.idSolicitud} 
        />
    
        {/* Botón para ver observaciones */}
        <TouchableOpacity
          style={stylesVacaciones.buttonObservaciones}
          onPress={() => {
            navigation.navigate("ObservacionesVacaciones", {
              idSolicitud: item.idSolicitud,
            });
          }}
        >
          <Text style={stylesVacaciones.buttonText}>Ver Observaciones</Text>
        </TouchableOpacity>
      </View>
    );
    
  const periodosSeleccionados = vacaciones
    .filter((v) => selectedIds.includes(v.id))
    .map((v) => v.periodo)
    .join(", ");

  return (
    <View style={stylesVacaciones.container}>
      {/* Buscador */}
      <View style={stylesVacaciones.searchContainer}>
        <Icon
          name="search"
          size={20}
          color="#888"
          style={stylesVacaciones.searchIcon}
        />
        <TextInput
          style={stylesVacaciones.searchBar}
          value={busqueda}
          onChangeText={handleBuscar}
          placeholder="Buscar por período"
        />
      </View>
      <View style={stylesVacaciones.totalContainer}>
        <Text style={stylesVacaciones.totalText}>
          Total de Vacaciones: {vacaciones.length}
        </Text>
      </View>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={vacacionesFiltradas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVacacion}
      />

      <TouchableOpacity
        style={[
          stylesVacaciones.buttonAdd,
          selectedIds.length === 0 && stylesVacaciones.buttonDisabled,
        ]}
        onPress={() => setModalVisible(true)}
        disabled={selectedIds.length === 0}
      >
        <Text style={stylesVacaciones.buttonText}>Continuar</Text>
      </TouchableOpacity>

      {/* Modal para fecha y comentario */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={stylesVacaciones.modalContainer}>
          <View style={stylesVacaciones.modalContent}>
            <Text style={stylesVacaciones.modalTitle}>Confirmar Solicitud</Text>

            {/* Mostrar los períodos seleccionados */}
            <Text style={stylesVacaciones.modalText}>
              Períodos seleccionados: {periodosSeleccionados}
            </Text>

            {/* Selector de fecha */}
            <TouchableOpacity
              style={stylesVacaciones.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>
                Seleccionar Fecha Inicial: {fechaInicial.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={fechaInicial}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setFechaInicial(selectedDate);
                  }
                }}
              />
            )}

            {/* Campo de comentario */}
            <TextInput
              style={stylesVacaciones.comentarioInput}
              value={comentario}
              onChangeText={setComentario}
              placeholder="Escribe un comentario..."
              multiline
            />

            {/* Botones del modal */}
            <View style={stylesVacaciones.modalButtons}>
              <TouchableOpacity
                style={stylesVacaciones.modalButtonCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={stylesVacaciones.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={stylesVacaciones.modalButtonConfirm}
                onPress={handleEnviar}>
                <Text style={stylesVacaciones.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VacacionesUserView;
