import React, { useState, useEffect } from "react";
import { FlatList, View, TouchableOpacity, Image, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { NotificationModel } from "./typesNotificatios";
import BASE_URL from "src/Config/config";
import LoadingComponent from "../utils/LoadingComponent";
import { stylesNotificacion } from "./Styles/NotificationsStyles";
import EmptyStateComponent from "../utils/EmptyStateComponent";

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (!token) {
          console.error("Token no disponible");
          return;
        }
        const response = await axios.get<NotificationModel[]>(
          `${BASE_URL}notificaciones`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <LoadingComponent text="Cargando notificaciones..." color="#ff6347" />
    );
  }

  if (notifications.length === 0) {
    return (
      <EmptyStateComponent
        text="No hay notificaciones disponibles." 
        style={{
          container: { backgroundColor: '#fff' },
          text: { color: '#888' },
        }} 
      />
    );
  }

  return (
    <FlatList
      style={stylesNotificacion.root}
      data={notifications}
      ItemSeparatorComponent={() => (
        <View style={stylesNotificacion.separator} />
      )}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const attachment = item.route ? (
          <Image
            style={stylesNotificacion.attachment}
            source={{ uri: item.route }}
          />
        ) : null;

        return (
          <TouchableOpacity style={stylesNotificacion.container}>
            <Image
              source={{
                uri:
                  item.personaRemitente.rutaFotoUrl ||
                  "https://bootdey.com/img/Content/avatar/avatar7.png",
              }}
              style={stylesNotificacion.avatar}
            />
            <View style={stylesNotificacion.content}>
              <View style={stylesNotificacion.mainContent}>
                <View style={stylesNotificacion.text}>
                  <Text style={stylesNotificacion.name}>
                    {`${item.personaRemitente.nombre1} ${item.personaRemitente.apellido1}` ||
                      "N/A"}
                  </Text>
                  <Text>{item.mensaje || "Mensaje no disponible"}</Text>
                </View>
                <Text style={stylesNotificacion.timeAgo}>2 hours ago</Text>
              </View>
              {attachment}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default NotificationsScreen;
