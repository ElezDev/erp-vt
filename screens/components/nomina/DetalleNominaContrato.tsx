import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

import { stylesDetalleNomina } from './styles/DetalleNominaStyles';
import ModalVacaciones from './ModalVacaciones';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { NavigationProp } from '@react-navigation/native';


const contrato = {
  numContrato: "12345",
  denegacion: "No aplica",
  netoPagado: 5000000,
  totalSegSocial: 1200000,
  parafiscales: 800000,
  apropiaciones: 1500000,
  costoTrabajador: 8500000,
};

const DetalleNominaContrato = ({ navigation }: { navigation: NavigationProp<any> }) => {
  // const [modalVisible, setModalVisible] = useState(false);

  const handleVacaciones = () => {
    navigation.navigate("Vacaciones");
  };

  const handleIncapacidades = () => {
    navigation.navigate("Incapacidades");
  }


  return (
    <ScrollView style={stylesDetalleNomina.container}>
      {/* Encabezado */}
      <View style={stylesDetalleNomina.headerContainer}>
      </View>

      {/* Datos del Contrato */}
      <View style={stylesDetalleNomina.card}>
        <Text style={stylesDetalleNomina.title}>Datos del Contrato</Text>
        <View style={stylesDetalleNomina.row}>
          <Text style={stylesDetalleNomina.label}>Número de Contrato:</Text>
          <Text style={stylesDetalleNomina.value}>{contrato.numContrato}</Text>
        </View>
        <View style={stylesDetalleNomina.row}>
          <Text style={stylesDetalleNomina.label}>Denegación:</Text>
          <Text style={stylesDetalleNomina.value}>{contrato.denegacion}</Text>
        </View>
      </View>

      {/* Cálculos Financieros */}
      <View style={stylesDetalleNomina.card}>
        <Text style={stylesDetalleNomina.title}>Cálculos Financieros</Text>
        <View style={stylesDetalleNomina.row}>
          <Text style={stylesDetalleNomina.label}>Neto Pagado:</Text>
          <Text style={stylesDetalleNomina.value}>${contrato.netoPagado.toLocaleString()}</Text>
        </View>
        <View style={stylesDetalleNomina.row}>
          <Text style={stylesDetalleNomina.label}>Total Seg. Social:</Text>
          <Text style={stylesDetalleNomina.value}>${contrato.totalSegSocial.toLocaleString()}</Text>
        </View>
        <View style={stylesDetalleNomina.row}>
          <Text style={stylesDetalleNomina.label}>Parafiscales:</Text>
          <Text style={stylesDetalleNomina.value}>${contrato.parafiscales.toLocaleString()}</Text>
        </View>
        <View style={stylesDetalleNomina.row}>
          <Text style={stylesDetalleNomina.label}>Apropiaciones:</Text>
          <Text style={stylesDetalleNomina.value}>${contrato.apropiaciones.toLocaleString()}</Text>
        </View>
        <View style={stylesDetalleNomina.row}>
          <Text style={stylesDetalleNomina.label}>Costo Trabajador:</Text>
          <Text style={stylesDetalleNomina.value}>${contrato.costoTrabajador.toLocaleString()}</Text>
        </View>
      </View>

      {/* Acciones */}
      <View style={stylesDetalleNomina.actionsContainer}>
        <TouchableOpacity style={stylesDetalleNomina.actionButton} onPress={handleVacaciones}>
          <Icon name="beach-access" size={28} color="#fff" />
          <Text style={stylesDetalleNomina.actionText}>Vacaciones</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesDetalleNomina.actionButton} onPress={handleVacaciones}>
        <Entypo name="info" size={24} color="#fff" />
          <Text style={stylesDetalleNomina.actionText}>Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesDetalleNomina.actionButton} onPress={handleIncapacidades}>
        <FontAwesome5 name="briefcase-medical" size={24} color="#fff" />
          <Text style={stylesDetalleNomina.actionText}>Incapacidades</Text>
        </TouchableOpacity>
        <TouchableOpacity style={stylesDetalleNomina.actionButton} onPress={handleVacaciones}>
        <FontAwesome5 name="comments-dollar" size={24} color="#fff" />
          <Text style={stylesDetalleNomina.actionText}>Retenciones</Text>
        </TouchableOpacity>
      </View>
      

      {/* Modal para Vacaciones */}
      <View>
      {/* <ModalVacaciones
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      /> */}
    </View>
    </ScrollView>
  );
};

export default DetalleNominaContrato;
