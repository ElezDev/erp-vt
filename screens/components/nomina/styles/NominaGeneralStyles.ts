import { StyleSheet } from "react-native";
import color from "src/constant/color";

export const stylesGeneral = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F5F5F5",
      padding: 20,
    },
    // title: {
    //   fontSize: 26,
    //   fontWeight: "bold",
    //   color: "#333",
    //   textAlign: "center",
    //   marginBottom: 5,
    // },
    card: {
      backgroundColor: "#FFF",
      padding: 20,
      borderRadius: 10,
      marginBottom: 10,
      elevation: 0.5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 10,
    },
    dataRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    dataText: {
      fontSize: 16,
      marginLeft: 10,
      color: "#555",
    },
    dataValue: {
      fontWeight: "bold",
      color: "#000",
    },
    buttonContainer: {
      marginTop: 20,
      gap: 10,
    },
  
    buttonNomina: {
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: color.accentColor, 
      padding: 10,
      borderRadius: 5,
    },
    
    buttonNominaText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },
  });