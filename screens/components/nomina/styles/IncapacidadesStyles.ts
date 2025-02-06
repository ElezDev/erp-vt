import { StyleSheet } from "react-native";
import color from "src/constant/color";

export const incapacidadesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    elevation: 0.5,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
  input: {
    fontSize: 14,
    color: "#333",
    flex: 2,
    textAlign: "right",
  },
  buttonAdd: {
    backgroundColor: color.accentColor,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  totalContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    marginBottom: 16,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  switchRow: {},
  floatingButton: {
  position: "absolute",
  bottom: 20,
  right: 20,
  backgroundColor: color.accentColor,
  borderRadius: 50,
  width: 60,
  height: 60,
  justifyContent: "center",
  alignItems: "center",
  elevation: 5,
},
modalContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  zIndex: 100,
  overflow: "hidden", 
  width: "100%",

},
modalContent: {
  width: "85%",
  backgroundColor: "#fff",
  borderRadius: 5,
  padding: 25,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 6, // Sombra más pronunciada en Android
},
modalTitle: {
  fontSize: 22,
  fontWeight: "bold",
  marginBottom: 20,
  color: "#b38602", // Usar primaryDark para un toque empresarial
},
modalInput: {
  width: "100%",
  backgroundColor: "#ffee9c", // Usar primaryLighter para inputs
  borderRadius: 10,
  padding: 12,
  marginBottom: 15,
  fontSize: 16,
  borderColor: "#b38602", // Borde en primaryDark
  borderWidth: 1,
},
modalButton: {
  backgroundColor: "#ffc502", // Botón en primaryColor
  borderRadius: 10,
  padding: 12,
  marginTop: 10,
  width: "100%",
  alignItems: "center",
},
modalButtonCancel: {
  backgroundColor: "#ff6605", 
  borderRadius: 10,
  padding: 12,
  marginTop: 10,
  width: "100%",
  alignItems: "center",
},
modalButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},
modalFileText: {
  fontSize: 14,
  color: "#333",
  marginBottom: 10,
  textAlign: "center",
},
modalLabel: {
  fontSize: 16,
  color: "#333",
  fontWeight: "600",
  marginBottom: 5,
},



});
