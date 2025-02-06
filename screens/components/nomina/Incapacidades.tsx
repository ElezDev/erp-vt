import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { incapacidadesStyles } from "./styles/IncapacidadesStyles";
import BASE_URL from "src/Config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IncapacidadModel } from "./types/IncapacidadModel";
import { ContratosModel } from "../Contratos/ContratosTypes";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { fetchIncapacidades } from "./Provider/IncapacidadesProvider";
import Toast from "react-native-toast-message";
import ModalIncapacidad from "./SoportesIncapacidad/SolicitarIncapacidadModal";
import DateTimePicker from "@react-native-community/datetimepicker";

type RouteParams = {
  IncapacidadesPage: {
    contrato: ContratosModel;
  };
};

const IncapacidadesPage = ({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) => {
  const route = useRoute<RouteProp<RouteParams, "IncapacidadesPage">>();
  const contrato = route.params.contrato;
  const [incapacidades, setIncapacidades] = useState<IncapacidadModel[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<IncapacidadModel[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fechaInicial: new Date(),
    fechaFinal: new Date(),
    idTipoIncapacidad: 2,
    comentario: "",
    soporte: null,
  });
  const [showDatePicker, setShowDatePicker] = useState({
    fechaInicial: false,
    fechaFinal: false,
  });

  interface FormData {
    fechaInicial: Date;
    fechaFinal: Date;
    idTipoIncapacidad: any;
    comentario: string;
    soporte: string | null;
  }

  const handleDateChange = (event: any, selectedDate: Date | undefined, field: keyof FormData) => {
    if (selectedDate) {
      setFormData({ ...formData, [field]: selectedDate });
    }
    setShowDatePicker({ ...showDatePicker, [field]: false });
  };

  const handlePickFile = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setFormData({ ...formData, soporte: result.assets[0].uri });
    }
  };

  const handleNavigatetosupports = () => {
    navigation.navigate("ObservacionesIncapacidad", { contrato });
  };

  useEffect(() => {
    const fetchIncapacidadesData = async () => {
      try {
        const data = await fetchIncapacidades(contrato.id);
        setIncapacidades(data);
        setResultados(data);
      } catch (error) {
        Toast.show({
          text1: "Error al cargar las incapacidades.",
          type: "error",
          topOffset: 100,
          bottomOffset: 50,
        });
      }
    };

    fetchIncapacidadesData();
  }, [contrato.id]);

  const handleBuscar = (texto: any) => {
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

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");

      const formDataToSend = new FormData();
      formDataToSend.append("fechaInicial", formData.fechaInicial.toISOString().split('T')[0]);
      formDataToSend.append("fechaFinal", formData.fechaFinal.toISOString().split('T')[0]);
      formDataToSend.append("idTipoIncapacidad", formData.idTipoIncapacidad);
      formDataToSend.append("comentario", formData.comentario);

      if (formData.soporte) {
        const soporteBlob = {
          uri: formData.soporte,
          type: "image/png",
          name: "soporte.jpg",
        } as any;
        formDataToSend.append("soporte", soporteBlob);
      }

      await axios.post(`${BASE_URL}solicitud_inc_personas`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setIsModalVisible(false);
      Toast.show({
        text1: "Incapacidad creada correctamente.",
        type: "success",
        topOffset: 100,
        bottomOffset: 50,
        text1Style: { fontSize: 13 },
        

      });
    } catch (error) {
      Toast.show({
        text1: "Error al crear la incapacidad.",
        type: "error",
        topOffset: 100,
        bottomOffset: 50,
        text1Style: { fontSize: 13 },

      });
    }
  };

  const calcularTotales = () => {
    const totalCantidad = resultados.length;
    const totalValor = resultados.reduce(
      (suma, incapacidad) =>
        suma + parseFloat(incapacidad.valor?.toString() || "0"),
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
        <Text style={incapacidadesStyles.input}>
          {item.valor.toLocaleString()}
        </Text>
      </View>

      <View style={incapacidadesStyles.inputRow}>
        <Text style={incapacidadesStyles.label}>Estado:</Text>
        <Text style={incapacidadesStyles.input}>{item.estado}</Text>
      </View>

      <View style={incapacidadesStyles.switchRow}>
        <TouchableOpacity
          style={incapacidadesStyles.buttonAdd}
          onPress={() =>
            navigation.navigate(`ObservacionesIncapacidad`, {
              idSolicitud: item.id,
            })
          }
        >
          <Text style={incapacidadesStyles.buttonText}>Soportes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={incapacidadesStyles.container}>
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

      <TouchableOpacity
        style={incapacidadesStyles.floatingButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <ModalIncapacidad
        isVisible={isModalVisible}
        formData={formData}
        showDatePicker={showDatePicker}
        setFormData={setFormData}
        setShowDatePicker={setShowDatePicker}
        handleDateChange={handleDateChange}
        handleSubmit={handleSubmit}
        closeModal={() => setIsModalVisible(false)}
        handlePickFile={handlePickFile}
      />

      {showDatePicker.fechaInicial && (
        <DateTimePicker
          value={formData.fechaInicial}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => handleDateChange(event, selectedDate, "fechaInicial")}
        />
      )}

      {showDatePicker.fechaFinal && (
        <DateTimePicker
          value={formData.fechaFinal}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => handleDateChange(event, selectedDate, "fechaFinal")}
        />
      )}
    </View>
  );
};

export default IncapacidadesPage;