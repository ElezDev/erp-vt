import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
const defaultImage = require('../../../assets/images/no-data.png'); 
const EmptyStateComponent = ({ text = "No hay datos disponibles.", style = {}, image = defaultImage }) => {
  return (
    <View style={[styles.emptyContainer, style]}>
      <Image source={image} style={styles.emptyImage} />
      <Text style={[styles.emptyText]}>{text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});

export default EmptyStateComponent;
