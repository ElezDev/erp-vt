import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import color from "src/constant/color";
import * as Animatable from "react-native-animatable"; 

import { NavigationProp } from '@react-navigation/native';

const BannerNomina = ({ navigation }: { navigation: NavigationProp<any> }) => {

    const handleVerContratos = () => {
        navigation.navigate("Contratos");
      };
  return (
    <Animatable.View 
      animation="fadeInUp" 
      duration={1000}      
      delay={300}           
      style={{
        marginTop: 25,
        backgroundColor: color.primaryColor,
        padding: 20,
        borderRadius: 30,
      }}
    >
      <Text style={styles.title}>Ten el control general</Text>
      <Text style={styles.title}>Y gentiona todos los procesos</Text>

      <View style={{ flexDirection: "row", marginTop: 12 }}>
        <FeatureImage uri="https://cdn-icons-png.flaticon.com/128/2586/2586859.png" />
        <FeatureImage uri="https://cdn-icons-png.flaticon.com/128/7021/7021224.png" />
        <FeatureImage uri="https://cdn-icons-png.flaticon.com/128/7185/7185645.png" />
        <FeatureImage uri="https://cdn-icons-png.flaticon.com/128/4149/4149678.png" />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 12,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            paddingVertical: 5,
            paddingHorizontal: 12,
            backgroundColor: color.accentColor,
            borderRadius: 20,
          }}
        >
          <Text style={{ ...styles.title, fontSize: 14 }}>Novedades</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={handleVerContratos}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 14,
            backgroundColor: color.white,
            borderRadius: 15,
          }}
        >
          <Text
            style={{ ...styles.title, fontSize: 14, color: color.primaryColor }}>
            Ver contratos
          </Text>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

export default BannerNomina;

const styles = StyleSheet.create({
  title: {
    color: color.white,
    fontSize: 18,
    fontWeight: "700",
  },
});

const FeatureImage = ({ uri }: { uri: string }) => {
  return (
    <Image
      source={{
        uri,
      }}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: color.white,
        marginLeft: -10,
      }}
    />
  );
};
