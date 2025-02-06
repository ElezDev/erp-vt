import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "src/Config/config";
import { Vacacion, VacacionesResponse } from "screens/components/nomina/types/VacacionesModel";
import Toast from "react-native-toast-message";

export const fetchVacaciones = async (contratoId: number): Promise<Vacacion[]> => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    const response = await axios.get<VacacionesResponse>(`${BASE_URL}vacaciones`, {
      
      params: {
        periodo: "",
        idSolicitud: "",
        idContrato: contratoId,
        estado: "",
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.vacaciones;
    
  } catch (error) {
     Toast.show({
            type: "error",
            text1: "Error",
            text2: "Error al obtener las vacaciones.",
            position: 'top', 
            visibilityTime: 4000,
            text1Style: { fontSize: 20,color: 'red' }, 
            text2Style: { fontSize: 18, color: 'black',}, 
          });
    return [];
  }

};

export const enviarSolicitudVacaciones = async (data: any): Promise<boolean> => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    const response = await axios.post(`${BASE_URL}create_solicitud_vacaciones`, data, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return response.status === 201;
  } catch (error) {
    console.error("Error enviando la solicitud:", error);
    return false;
  }
};
