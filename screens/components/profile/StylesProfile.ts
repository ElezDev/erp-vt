import { StyleSheet } from "react-native";
import color from "src/constant/color";

 export const  stylesProfile = StyleSheet.create({
    container: { padding: 20, backgroundColor: "#FAFAFA" },
    centeredContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FAFAFA",
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      alignSelf: "center",
      marginBottom: 10,
    },
    headerCard: {
      alignItems: "center",
      marginBottom: 20,
    },
    name: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
    },
    position: { fontSize: 14, color: "#666", marginTop: 4, textAlign: "center" },
    infoCard: {
      backgroundColor: "#FFF",
      borderRadius: 8,
      padding: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: "#ECECEC",
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#4A90E2",
      marginBottom: 5,
    },
    infoText: {
      fontSize: 14,
      color: "#444",
      marginBottom: 8,
      lineHeight: 20,
    },
    logoutButton: {
      backgroundColor: color.accentColor,
      paddingVertical: 12,
      borderRadius: 6,
      alignItems: "center",
      marginTop: 20,
    },
    buttonText: { color: "#FFF", fontSize: 14, fontWeight: "bold" },
    errorText: { fontSize: 14, color: "red", textAlign: "center" },
  });
  