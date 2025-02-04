import { StyleSheet } from "react-native";

 export  const stylesCommnet = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f4f8',
      padding: 16,
    },
    listContent: {
      paddingBottom: 16,
    },
    messageContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 16,
      backgroundColor: '#ffffff',
      padding: 16,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 16,
      borderWidth: 2,
      borderColor: '#e0e0e0',
    },
    messageContent: {
      flex: 1,
    },
    userName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      marginBottom: 8,
    },
    messageText: {
      fontSize: 14,
      color: '#555',
      marginBottom: 8,
      lineHeight: 20,
    },
    messageDate: {
      fontSize: 12,
      color: '#888',
      textAlign: 'right',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f4f8',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f4f8',
    },
    errorText: {
      fontSize: 16,
      color: '#ff4444',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f4f8',
    },
    emptyText: {
      fontSize: 16,
      color: '#888',
    },
    loadingText:{
      marginTop: 10,
      fontSize: 16,
      color: '#333',
    }
  });