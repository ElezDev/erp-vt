import React, { useEffect, useState } from 'react';
import { SafeAreaView, ActivityIndicator, StyleSheet, Alert, Text, View } from 'react-native';
import axios from 'axios';
import ObservacionesList from './ObservacionesIncapacidadList';
import BASE_URL from 'src/Config/config';
import { RouteProp, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingComponent from 'screens/components/utils/LoadingComponent';
import EmptyStateComponent from 'screens/components/utils/EmptyStateComponent';

const ObservacionesIncapacidadPage = () => {
  const [observaciones, setObservaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  type RouteParams = {
    params: { idSolicitud: string };
    key: string;
    name: string;
  };

  const route = useRoute<RouteProp<{ route: RouteParams }, 'route'>>();
  const { idSolicitud } = route.params;

  useEffect(() => {
    const fetchObservaciones = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");

        const response = await axios.get(
          `${BASE_URL}observacion_inc_personas?idSolicitud=${idSolicitud}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setObservaciones(response.data);
      } catch (error) {
        Alert.alert(
          'Error',
          (error as any).response?.data?.message || 'Error al obtener las observaciones'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchObservaciones();
  }, []);

  if (loading) {
    return (
      <LoadingComponent text="Cargando Observaciones..." color="#ff6347" />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1}}>
      {observaciones.length > 0 ? (
        <ObservacionesList observaciones={observaciones} />
      ) : (
        <View style={styles.emptyContainer}>
         <EmptyStateComponent
        text="No se encontraron observaciones para esta solicitud." 
        style={{
          container: { backgroundColor: '#fff' },
          text: { color: '#888' },
        }} 
      />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ObservacionesIncapacidadPage;
