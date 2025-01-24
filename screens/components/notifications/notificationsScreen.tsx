import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { NotificationModel } from "./typesNotificatios";
import BASE_URL from "src/Config/config";

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

        console.log(response.data);
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.root}
      data={notifications}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const attachment = item.route ? (
          <Image style={styles.attachment} source={{ uri: item.route }} />
        ) : null;

        return (
          <TouchableOpacity style={styles.container}>
            <Image
              source={{
                uri:
                  item.personaRemitente.rutaFotoUrl ||
                  "https://bootdey.com/img/Content/avatar/avatar7.png",
              }}
              style={styles.avatar}
            />
            <View style={styles.content}>
              <View style={styles.mainContent}>
                <View style={styles.text}>
                  <Text style={styles.name}>
                    {`${item.personaRemitente.nombre1} ${item.personaRemitente.apellido1}` ||
                      "N/A"}
                  </Text>
                  <Text>{item.mensaje || "Mensaje no disponible"}</Text>
                </View>
                <Text style={styles.timeAgo}>2 hours ago</Text>
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

const styles = StyleSheet.create({
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
});
