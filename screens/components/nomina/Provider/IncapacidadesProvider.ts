import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "src/Config/config";

export const fetchIncapacidades = async (contratoId: number) => {
  try {
    const token = await AsyncStorage.getItem("access_token");
    const response = await axios.get(`${BASE_URL}get_my_solicitudes_worker/${contratoId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = (response.data || []).map(item => ({
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

    return data;
  } catch (error) {
    console.error("Error al cargar las incapacidades:", error);
    throw error;
  }
};

export const handleSubmitIncapacidad = async (formData:any) => {
  try {
    const token = await AsyncStorage.getItem("access_token");

    const formDataToSend = new FormData();
    formDataToSend.append("fechaInicial", formData.fechaInicial.toISOString());
    formDataToSend.append("fechaFinal", formData.fechaFinal.toISOString());
    formDataToSend.append("idTipoIncapacidad", formData.idTipoIncapacidad);
    formDataToSend.append("comentario", formData.comentario);

    if (formData.soporte) {
      const soporteBlob = {
        uri: formData.soporte,
        type: "image/jpeg",
        name: "soporte.jpg",
      };

      formDataToSend.append("soporte", soporteBlob);
    }

    await axios.post(`${BASE_URL}crear_incapacidad`, formDataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error al crear la incapacidad:", error);
    return { success: false, error };
  }
};
