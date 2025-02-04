import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Menu, Dialog, Portal, Button } from 'react-native-paper';
import color from "src/constant/color";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface CustomHeaderProps {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  onBackPress,
  showBackButton = false,
}) => {
  const navigation = useNavigation<any>();
  const [menuVisible, setMenuVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false); 
  const [loading, setLoading] = useState(false); 

  const handleNotificationsPress = () => {
    navigation.navigate('Notification');
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const showDialog = () => {
    setDialogVisible(true); 
  };

  const hideDialog = () => {
    setDialogVisible(false); 
  };

  const handleLogout = async () => {
    setLoading(true);

    setTimeout(async () => {
      await AsyncStorage.removeItem("access_token");
      setLoading(false); 

      navigation.reset({
        index: 0,
        routes: [{ name: "Login" as never }],
      });
    }, 2000); 
  };

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>

      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={handleNotificationsPress} style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color="#FFF" />
        </TouchableOpacity>

        {/* Menu Button */}
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={toggleMenu} style={styles.iconButton}>
              <Ionicons name="ellipsis-vertical" size={24} color="#FFF" />
            </TouchableOpacity>
          }
          style={styles.menu}
        >
          <Menu.Item
            style={styles.logout}
            onPress={showDialog} 
            title="Cerrar sesión"
            titleStyle={styles.menuItemText}
            leadingIcon={() => <Ionicons name="log-out" size={24} color="#ff6605" />}
          />
        </Menu>
      </View>

      {/* Custom Dialog */}
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog} style={styles.dialog}>
          <Dialog.Title style={styles.dialogTitle}>Cerrar sesión</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>¿Estás seguro de que deseas cerrar sesión?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} labelStyle={styles.cancelButton}>Cancelar</Button>
            <Button 
              onPress={handleLogout} 
              mode="contained" 
              buttonColor={color.primaryColor} 
              labelStyle={styles.logoutButton}
              loading={loading} 
              disabled={loading} 
            >
              {loading ? "Cerrando sesión..." : "Cerrar sesión"} {/* Cambiar texto según el estado de carga */}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: color.primaryColor,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    elevation: 4,
    justifyContent: "space-between",
  },
  backButton: {
    marginRight: 160,
  },
  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "left",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 12,
  },
  menu: {
    marginTop: 60,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 4,
  },
  menuItemText: {
    fontSize: 16,
    color: "#000", 
  },
  logout: {
    borderBottomWidth: 4,
    borderBottomColor: color.primaryColor,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  // Estilos para el diálogo
  dialog: {
    borderRadius: 10,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 20,
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: color.primaryColor,
  },
  dialogText: {
    fontSize: 16,
    color: "#333",
  },
  cancelButton: {
    color: color.primaryColor,
  },
  logoutButton: {
    color: "#FFF",
  },
});

export default CustomHeader;
