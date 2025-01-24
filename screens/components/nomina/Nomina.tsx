import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';

const Nomina = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nómina de la Empresa</Text>
      </View>

      {/* Resumen de la Nómina */}
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Resumen de la Nómina</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Empleados activos:</Text>
          <Text style={styles.summaryValue}>15</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Salario promedio:</Text>
          <Text style={styles.summaryValue}>$2900</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Total nómina:</Text>
          <Text style={styles.summaryValue}>$43500</Text>
        </View>
      </View>

      {/* Lista de Empleados */}
      <Text style={styles.sectionTitle}>Lista de Empleados</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Empleado 1</Text>
        <Text style={styles.cardSubText}>Salario: $2500</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Empleado 2</Text>
        <Text style={styles.cardSubText}>Salario: $3200</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Empleado 3</Text>
        <Text style={styles.cardSubText}>Salario: $2800</Text>
      </View>

      {/* Acciones */}
      <TouchableOpacity style={styles.actionButton} onPress={() => alert('Agregar nuevo empleado')}>
        <Text style={styles.actionButtonText}>Agregar Empleado</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => alert('Generar reporte')}>
        <Text style={styles.actionButtonText}>Generar Reporte</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Nomina;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  header: {
    backgroundColor: '#007BFF',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  summary: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#555',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardSubText: {
    fontSize: 16,
    color: '#666',
  },
  actionButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    marginBottom: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  actionButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
