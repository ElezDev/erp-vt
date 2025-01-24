import { StyleSheet } from 'react-native';

export const stylesContrato = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f7f7f7",
      padding: 16,
    },
    body: {
      flexDirection: "row",
      paddingVertical: 10,
    },
    leftSide: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#f7f7f7",
    },
    logo: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 16,
    },
    rightSide: {
      flex: 2,
      paddingLeft: 20,
      backgroundColor: "#ffffff",
      borderRadius: 12,
      padding: 20,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 16,
    },
    cardHeaderText: {
      flex: 1,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
    },
    subtitle: {
      fontSize: 16,
      color: "#666",
      marginBottom: 6,
    },
    jobTitle: {
      fontSize: 14,
      color: "#888",
    },
    detailsContainer: {
      marginTop: 12,
    },
    info: {
      fontSize: 16,
      color: "#555",
      marginBottom: 8,
    },
    activo: {
      color: "#28a745",
      fontWeight: "bold",
    },
    inactivo: {
      color: "#dc3545",
      fontWeight: "bold",
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    loadingText: {
      marginTop: 12,
      fontSize: 16,
      color: "#888",
    },
    errorText: {
      fontSize: 16,
      color: "#dc3545",
      textAlign: "center",
      marginTop: 20,
    },
  
    cardGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginTop: 20,
    },
    cardItem: {
      backgroundColor: "#ffffff",
      width: "48%",
      marginBottom: 16,
      flex: 12,
      paddingLeft: 20,
      borderRadius: 12,
      padding: 20,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
    },
    cardContent: {
      fontSize: 14,
      color: "#555",
      marginTop: 8,
    },
    actionButtons:{
      marginBottom: 16,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    infoItem: {
      flexDirection: 'row',               // Alinea los elementos en fila (icono + texto)
      alignItems: 'center',               // Centra verticalmente el contenido
      marginBottom: 10,                   // Espacio entre cada ítem de información
      paddingHorizontal: 15,              // Espaciado en los lados (de izquierda a derecha)
      paddingVertical: 5,                 // Espaciado vertical
      backgroundColor: 'rgba(255, 140, 0, 0.1)', // Fondo suave para que se destaque
      borderRadius: 8,                    // Bordes redondeados para un look más moderno
      shadowColor: '#000',                // Sombra para dar un efecto de profundidad
      shadowOffset: { width: 0, height: 2 },  // Sombra en la parte inferior
      shadowOpacity: 0.1,                 // Opacidad de la sombra
      shadowRadius: 4,                   // Radio de la sombra
    },
    errorContainer: {
      backgroundColor: '#ff4d4d',          // Fondo rojo suave para denotar error
      padding: 15,                         // Espaciado alrededor del mensaje
      borderRadius: 8,                     // Bordes redondeados
      marginVertical: 10,                  // Espacio vertical entre otros elementos
      marginHorizontal: 20,                // Espaciado horizontal
      borderWidth: 1,                      // Borde para definir bien el contenedor
      borderColor: '#ff0000',              // Borde rojo oscuro para resaltar el error
      flexDirection: 'row',                // Para alinear icono y mensaje (si los tienes)
      alignItems: 'center',                // Alineación vertical central
      shadowColor: '#ff0000',              // Sombra roja para dar profundidad
      shadowOffset: { width: 0, height: 3 }, // Sombra hacia abajo
      shadowOpacity: 0.2,                  // Sombra suave
      shadowRadius: 5,                     // Radio de la sombra
    },
    errorMessage: {
      fontSize: 16,                        // Tamaño de la fuente para que sea legible
      color: '#fff',                       // Texto blanco para buen contraste
      flex: 1,                             // Hace que el texto ocupe todo el espacio disponible
    },
    errorIcon: {
      width: 20,                           // Tamaño del ícono de error (si usas uno)
      height: 20,
      marginRight: 10,                     // Espacio entre el ícono y el texto
    },
    bold:{
      fontWeight: 'bold',                      // Estilo en negrita para resaltar el texto  
    }    

  });