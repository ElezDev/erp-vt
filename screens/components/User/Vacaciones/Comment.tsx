import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, FlatList, Image, ActivityIndicator, RefreshControl 
} from 'react-native';
import axios from 'axios';
import BASE_URL from 'src/Config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useRoute } from '@react-navigation/native';
import { stylesCommnet } from './Styles/commentStyles';

const ObservacionesChat = () => {
  type RouteParams = {
    params: { idSolicitud: string };
    key: string;
    name: string;
  };

  const route = useRoute<RouteProp<{ route: RouteParams }, 'route'>>();
  const { idSolicitud } = route.params;

  interface Observacion {
    id: number;
    observacion: string;
    created_at: string;
    usuario: {
      persona: {
        nombre1: string;
        apellido1: string;
        rutaFotoUrl: string;
      };
    };
  }

  const [observaciones, setObservaciones] = useState<Observacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchObservaciones = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await axios.get(
        `${BASE_URL}observaciones_solicitud_vacaciones?idSolicitud=${idSolicitud}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setObservaciones(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch observaciones');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [idSolicitud]);

  useEffect(() => {
    if (idSolicitud) {
      fetchObservaciones();
    }
  }, [idSolicitud, fetchObservaciones]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchObservaciones();
  }, [fetchObservaciones]);

  if (loading) {
    return (
      <View style={stylesCommnet.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={stylesCommnet.errorContainer}>
        <Text style={stylesCommnet.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={stylesCommnet.container}>
      <FlatList
        data={observaciones}
        renderItem={({ item }) => (
          <View style={stylesCommnet.messageContainer}>
            <Image
              source={{ uri: item.usuario.persona.rutaFotoUrl || 'https://placehold.co/400' }}
              style={stylesCommnet.avatar}
              onError={() => console.log("Image failed to load")}
            />
            <View style={stylesCommnet.messageContent}>
              <Text style={stylesCommnet.userName}>{`${item.usuario.persona.nombre1} ${item.usuario.persona.apellido1}`}</Text>
              <Text style={stylesCommnet.messageText}>{item.observacion}</Text>
              <Text style={stylesCommnet.messageDate}>
                {new Date(item.created_at).toLocaleDateString('es-ES', {
                  day: 'numeric', month: 'short', year: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={stylesCommnet.listContent}
        ListEmptyComponent={
          <View style={stylesCommnet.emptyContainer}>
            <Text style={stylesCommnet.emptyText}>No hay observaciones</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};



export default ObservacionesChat;