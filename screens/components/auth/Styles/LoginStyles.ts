import { StyleSheet } from "react-native";
import color from "src/constant/color";

export const stylesLogin = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color.primaryLighter,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    logo: {
      // width: 120,
      // height: 120,
       marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: color.primaryColor,
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 16,
      color: color.primaryDark,
      marginBottom: 30,
      textAlign: 'center',
    },
    input: {
      width: '100%',
      backgroundColor: color.white,
      borderRadius: 8,
      padding: 12,
      borderWidth: 1,
      borderColor: color.secondaryLight,
      marginBottom: 15,
      fontSize: 14,
      color: color.primaryDark,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      elevation: 1,
    },
    passwordContainer: {
      width: '100%',
      position: 'relative',
    },
    eyeIcon: {
      position: 'absolute',
      right: 15,
      top: 15,
    },
    button: {
      width: '100%',
      backgroundColor: color.accentColor,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 15,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },
    buttonText: {
      color: color.white,
      fontSize: 16,
      fontWeight: '500',
    },
    footerText: {
      fontSize: 14,
      color: color.primaryDark,
      marginTop: 10,
    },
    footerLink: {
      color: color.accentColor,
      fontWeight: '600',
    },
  });
  