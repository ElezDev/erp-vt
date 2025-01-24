import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CategoryDetailScreen = ({ route }: any) => {
  const { categoryName } = route.params;  // Recuperamos el parámetro pasado

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de {categoryName}</Text>
      {/* Aquí puedes agregar más contenido relacionado con la categoría */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CategoryDetailScreen;
