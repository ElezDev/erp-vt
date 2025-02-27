import React from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import color from "src/constant/color";


interface Props {
  isVisible: boolean;
  formData: any;
  showDatePicker: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setShowDatePicker: React.Dispatch<React.SetStateAction<any>>;
  handleDateChange: (event: any, selectedDate: Date | undefined, field: keyof any) => void;
  handleSubmit: () => void;
  closeModal: () => void;
  handlePickFile: () => void;
}

const ModalIncapacidad = ({
  isVisible,
  formData,
  showDatePicker,
  setFormData,
  setShowDatePicker,
  handleDateChange,
  handleSubmit,
  closeModal,
  handlePickFile,
}: Props) => {
  
  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View style={incapacidadesStyles.modalOverlay}>
        <View style={incapacidadesStyles.modalElegantContent}>
          <Text style={incapacidadesStyles.modalElegantTitle}>
            Registrar Incapacidad
          </Text>

          {/* Tipo de Incapacidad */}
          <Text style={incapacidadesStyles.modalLabel}>Tipo de Incapacidad</Text>
          <View style={incapacidadesStyles.modalPickerContainer}>
            <Picker
              selectedValue={formData.tipoIncapacidad}
              onValueChange={(itemValue) =>
                setFormData({ ...formData, tipoIncapacidad: itemValue })
              }
            >
              <Picker.Item label="Seleccione un tipo" value="" />
              <Picker.Item label="Médica" value="1" />
              <Picker.Item label="Laboral" value="2" />
              <Picker.Item label="Otro" value="3" />
            </Picker>
          </View>

          {/* Fecha Inicial */}
          <Text style={incapacidadesStyles.modalLabel}>Fecha Inicial</Text>
          <TouchableOpacity
            style={incapacidadesStyles.modalInputElegant}
            onPress={() =>
              setShowDatePicker({ ...showDatePicker, fechaInicial: true })
            }
          >
            <Text>{formData.fechaInicial.toISOString().split("T")[0]}</Text>
          </TouchableOpacity>
          {showDatePicker.fechaInicial && (
            <DateTimePicker
              value={formData.fechaInicial}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "calendar"}
              onChange={(event, date) =>
                handleDateChange(event, date, "fechaInicial")
              }
            />
          )}

          {/* Fecha Final */}
          <Text style={incapacidadesStyles.modalLabel}>Fecha Final</Text>
          <TouchableOpacity
            style={incapacidadesStyles.modalInputElegant}
            onPress={() =>
              setShowDatePicker({ ...showDatePicker, fechaFinal: true })
            }
          >
            <Text>{formData.fechaFinal.toISOString().split("T")[0]}</Text>
          </TouchableOpacity>
          {showDatePicker.fechaFinal && (
            <DateTimePicker

              value={formData.fechaFinal}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "calendar"}
              onChange={(event, date) =>
                handleDateChange(event, date, "fechaFinal")
              }
              
            />
          )}

          {/* Comentario */}
          <Text style={incapacidadesStyles.modalLabel}>Comentario</Text>
          <TextInput
            style={incapacidadesStyles.modalElegantTextInput}
            value={formData.comentario}
            onChangeText={(text) =>
              setFormData({ ...formData, comentario: text })
            }
            placeholder="Ingrese un comentario"
            placeholderTextColor="#888"
          />

          <TouchableOpacity
            style={incapacidadesStyles.modalButtonElegant}
            onPress={handlePickFile}
          >
            <Text style={incapacidadesStyles.modalButtonText}>
              Subir Soporte
            </Text>
          </TouchableOpacity>

          <View style={incapacidadesStyles.modalButtonRow}>
            <TouchableOpacity
              style={incapacidadesStyles.modalCancelButton}
              onPress={() => closeModal()}
            >
              <Text style={incapacidadesStyles.modalCancelButtonText}>
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={incapacidadesStyles.modalSubmitButton}
              onPress={handleSubmit}
            >
              <Text style={incapacidadesStyles.modalSubmitButtonText}>
                Guardar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalIncapacidad;

const incapacidadesStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalElegantContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  modalElegantTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a237e",
    marginBottom: 20,
    textAlign: "center",
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#424242",
    marginBottom: 10,
  },
  modalPickerContainer: {
    borderWidth: 1,
    borderColor: "#b0bec5",
    borderRadius: 8,
    marginBottom: 20,
    overflow: "hidden",
  },
  modalInputElegant: {
    borderWidth: 1,
    borderColor: "#b0bec5",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#f5f5f5",
  },
  modalElegantTextInput: {
    borderWidth: 1,
    borderColor: "#b0bec5",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  modalButtonElegant: {
    backgroundColor: color.accentColor,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalCancelButton: {
    backgroundColor: "#e57373",
    padding: 12,
    borderRadius: 8,
    flex: 0.45,
    alignItems: "center",
  },
  modalCancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalSubmitButton: {
    backgroundColor: "#43a047",
    padding: 12,
    borderRadius: 8,
    flex: 0.45,
    alignItems: "center",
  },
  modalSubmitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
