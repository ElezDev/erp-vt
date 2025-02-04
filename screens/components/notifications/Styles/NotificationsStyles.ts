import { StyleSheet } from "react-native";

 export const stylesNotificacion = StyleSheet.create({
    root: {
      backgroundColor: "#FFFFFF",
    },
    container: {
      padding: 16,
      flexDirection: "row",
      borderBottomWidth: 1,
      borderColor: "#FFFFFF",
      alignItems: "flex-start",
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    text: {
      marginBottom: 5,
      flexDirection: "row",
      flexWrap: "wrap",
    },
    content: {
      flex: 1,
      marginLeft: 16,
      marginRight: 0,
    },
    mainContent: {
      marginRight: 60,
    },
    attachment: {
      position: "absolute",
      right: 0,
      height: 50,
      width: 50,
    },
    separator: {
      height: 1,
      backgroundColor: "#CCCCCC",
    },
    timeAgo: {
      fontSize: 12,
      color: "#696969",
    },
    name: {
      fontSize: 16,
      color: "#1E90FF",
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyText: {
        fontSize: 16,
        color: '#656565FF',
        fontWeight: 'bold',
      },
      
  });
  