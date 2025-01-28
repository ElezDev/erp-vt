import { StyleSheet } from "react-native";

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
      backgroundColor: "#10EB7DFF",
      padding: 15,
      borderRadius: 5,
      alignItems: "center",
      marginBottom: 10,
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
    }
  });
  