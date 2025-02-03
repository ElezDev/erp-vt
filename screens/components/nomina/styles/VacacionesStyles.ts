import { StyleSheet } from "react-native";
import color from "src/constant/color";

 export const stylesVacaciones = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f9f9f9",
      padding: 20,
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
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 0.6,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    label: {
      flex: 1,
      fontSize: 16,
      color: "#333",
    },
    input: {
      flex: 2,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 8,
    },
    switchRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 10,
    },
    buttonAdd: {
      backgroundColor: color.accentColor,
      paddingVertical: 12,
      borderRadius: 8,
      marginTop: 8,
      alignItems: "center",
    },
    buttonSave: {
      backgroundColor: "#4caf50",
      padding: 15,
      borderRadius: 5,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    switch:{
        backfaceVisibility: "hidden",
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "90%",
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 20,
    },
    datePickerButton: {
      padding: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      marginBottom: 20,
    },
    comentarioInput: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
      height: 100,
    },
    modalButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    modalButtonCancel: {
      backgroundColor: color.primaryColor,
      padding: 10,
      borderRadius: 5,
      flex: 1,
      marginRight: 10,
    },
    modalButtonConfirm: {
      backgroundColor: color.accentColor,
        padding: 10,
      borderRadius: 5,
      flex: 1,
    },
    modalButtonText: {
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
    },
    
    buttonDisabled:{
    backgroundColor: "#ccc",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
    },
    modalText: {
      fontSize: 16,
      marginBottom: 20,
    }
  });

  