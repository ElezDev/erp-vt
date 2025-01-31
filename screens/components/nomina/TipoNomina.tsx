import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Alert } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const Banners = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const handlePersonalPress = () => {
    navigation.navigate('NominaGeneral');
  };

  const handleEmpresarialPress = () => {
    navigation.navigate('NominaGeneral');
  };

  return (
    <View style={styles.container}>
      {/* Banner de Nómina Personal */}
      <TouchableOpacity onPress={handlePersonalPress} style={styles.banner}>
        <Image
          source={require('././../../../assets/images/nominaPersonal.jpg')}
          style={styles.bannerImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.bannerText}>Nómina Personal</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleEmpresarialPress} style={styles.banner}>
        <Image
          source={require('././../../../assets/images/Software-de-nomina.png')}
          style={styles.bannerImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.bannerText}>Nómina Empresarial</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
  },
  banner: {
    width: screenWidth - 40, 
    height: 150, 
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  bannerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Banners;