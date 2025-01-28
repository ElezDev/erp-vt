import { StyleSheet } from "react-native";
import color from "src/constant/color";

export const stylesDetalleNomina = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f9f9f9',
    },
    headerContainer: {
      marginBottom: 20,
      alignItems: 'center',
    },
    header: {
      fontSize: 26,
      fontWeight: 'bold',
      color: '#34495e',
      textAlign: 'center',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: '#2c3e50',
      marginBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#e1e1e1',
      paddingBottom: 4,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 6,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: '#7f8c8d',
    },
    value: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#34495e',
    },
    actionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 20,
    },
    actionButton: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: color.accentColor,
      borderRadius: 10,
      paddingVertical: 14,
      paddingHorizontal: 20,
      margin: 6,
      shadowColor: '#fff',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 0.3,
      width: '45%', 
    },
    actionText: {
      fontSize: 14,
      color: '#fff',
      marginTop: 6,
      fontWeight: '500',
      textAlign: 'center',
    },
    modalContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    modalText: {
      fontSize: 16,
      color: '#333',
      marginBottom: 20,
    },

closeButton:{
  marginTop: 20,
  marginBottom: 10,
  backgroundColor: '#34495e',
  borderRadius: 10,
  padding: 12,
  color: '#fff',
  fontWeight: 'bold',
  textAlign: 'center',
},
closeButtonText:{
  fontSize: 16,
  color: '#fff',
}

  });