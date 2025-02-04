import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  Animated, // Importa Animated
} from "react-native";
import axios from "axios";
import BASE_URL from "src/Config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContratosModel } from "./ContratosTypes";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { Checkbox } from "react-native-paper";
import { stylesDetalle } from "./StylesDetalle";
import LoadingComponent from "../utils/LoadingComponent";

const ContratosPage = () => {
  const [contratos, setContratos] = useState<ContratosModel[]>([]);
  const [filteredContratos, setFilteredContratos] = useState<ContratosModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [filterState, setFilterState] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const [selectedStates, setSelectedStates] = useState<{ [key: string]: boolean }>({
    ACTIVO: false,
    INACTIVO: false,
  });
  const [searchAnim] = useState(new Animated.Value(0)); // Estado para la animación de búsqueda

  const navigation = useNavigation();

  // Función para animar la entrada de la barra de búsqueda
  useEffect(() => {
    Animated.timing(searchAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const fetchContratos = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (!token) {
        console.error("Token no disponible");
        return;
      }
      const response = await axios.get(`${BASE_URL}contratos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContratos(response.data as ContratosModel[]);
      setFilteredContratos(response.data as ContratosModel[]);
    } catch (error) {
      console.error("Error al cargar los contratos:", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchContratos();
  }, []);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text.trim() === "") {
      setFilteredContratos(contratos);
    } else {
      const filtered = contratos.filter(
        (item) =>
          item.persona.nombre1.toLowerCase().includes(text.toLowerCase()) ||
          item.persona.apellido1.toLowerCase().includes(text.toLowerCase()) ||
          item.numeroContrato.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredContratos(filtered);
    }
  };

  const applyFilter = () => {
    const statesSelected = Object.keys(selectedStates).filter(
      (state) => selectedStates[state]
    );
    if (statesSelected.length > 0) {
      const filtered = contratos.filter((item) =>
        statesSelected.includes(item.estado.estado)
      );
      setFilteredContratos(filtered);
    } else {
      setFilteredContratos(contratos);
    }
    setModalVisible(false);
  };

  const toggleState = (state: string) => {
    setSelectedStates((prev) => ({
      ...prev,
      [state]: !prev[state],
    }));
  };

  const renderContrato = ({ item }: { item: ContratosModel }) => (
    <TouchableOpacity
      style={stylesDetalle.card}
      onPress={() => navigation.navigate("DetalleContrato", { contrato: item })}
    >
      <View style={stylesDetalle.cardHeader}>
      <Image
          source={
            imageError || !item.persona.rutaFotoUrl
              ? require("../../../assets/images/avatar.png") // Imagen por defecto local
              : { uri: item.persona.rutaFotoUrl }
          }
          style={stylesDetalle.avatar}
          onError={() => setImageError(true)} // Si falla, cambia a la imagen por defecto
        />
        <View style={stylesDetalle.cardHeaderText}>
          <Text style={stylesDetalle.title}>{item.numeroContrato}</Text>
          <Text style={stylesDetalle.subtitle}>
            {item.persona.nombre1} {item.persona.apellido1}
          </Text>
          <Text style={stylesDetalle.jobTitle}>{item.persona.perfil}</Text>
        </View>
      </View>
      <Text style={stylesDetalle.info}>Fecha: {item.fechaContratacion}</Text>
      <Text
        style={[
          stylesDetalle.estado,
          item.estado.estado === "ACTIVO"
            ? stylesDetalle.activo
            : stylesDetalle.inactivo,
        ]}
      >
        {item.estado.estado}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return <LoadingComponent text="Cargando contratos..." color="#ff6347" />;
  }

  return (
    <View style={stylesDetalle.container}>
      {/* Animación en la barra de búsqueda */}
      <Animated.View style={[stylesDetalle.searchContainer, { opacity: searchAnim }]}>
        <Icon
          name="search"
          size={24}
          color="#666"
          style={stylesDetalle.searchIcon}
        />
        <TextInput
          style={stylesDetalle.searchInput}
          placeholder="Buscar contrato o persona..."
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon
            name="filter"
            size={24}
            color="#ff8c00"
            style={stylesDetalle.filterIcon}
          />
        </TouchableOpacity>
      </Animated.View>

      {/* Lista de contratos */}
      <FlatList
        data={filteredContratos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderContrato}
      />

      {/* Modal para filtrar */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={stylesDetalle.modalContainer}>
          <View style={stylesDetalle.modalContent}>
            <Text style={stylesDetalle.modalTitle}>Filtrar por estado</Text>
            <View style={stylesDetalle.checkboxContainer}>
              <View style={stylesDetalle.checkboxRow}>
                <Checkbox
                  status={selectedStates.ACTIVO ? "checked" : "unchecked"}
                  onPress={() => toggleState("ACTIVO")}
                />
                <Text style={stylesDetalle.checkboxLabel}>ACTIVO</Text>
              </View>
              <View style={stylesDetalle.checkboxRow}>
                <Checkbox
                  status={selectedStates.INACTIVO ? "checked" : "unchecked"}
                  onPress={() => toggleState("INACTIVO")}
                />
                <Text style={stylesDetalle.checkboxLabel}>INACTIVO</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={applyFilter}
              style={stylesDetalle.applyButton}
            >
              <Text style={stylesDetalle.applyButtonText}>Aplicar Filtro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={stylesDetalle.cancelButton}
            >
              <Text style={stylesDetalle.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ContratosPage;
