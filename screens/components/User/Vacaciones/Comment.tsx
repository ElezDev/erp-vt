import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, StyleSheet, FlatList, Image, ActivityIndicator, RefreshControl 
} from 'react-native';
import axios from 'axios';
import BASE_URL from 'src/Config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useRoute } from '@react-navigation/native';

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={observaciones}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Image
              source={{ uri: item.usuario.persona.rutaFotoUrl || 'https://placehold.co/400' }}
              style={styles.avatar}
              onError={() => console.log("Image failed to load")}
            />
            <View style={styles.messageContent}>
              <Text style={styles.userName}>{`${item.usuario.persona.nombre1} ${item.usuario.persona.apellido1}`}</Text>
              <Text style={styles.messageText}>{item.observacion}</Text>
              <Text style={styles.messageDate}>
                {new Date(item.created_at).toLocaleDateString('es-ES', {
                  day: 'numeric', month: 'short', year: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay observaciones</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ObservacionesChat;