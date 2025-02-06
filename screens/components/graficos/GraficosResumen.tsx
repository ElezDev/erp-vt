import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { LineChart, ProgressChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import color from "src/constant/color";
import * as Animatable from "react-native-animatable"; 

const { width } = Dimensions.get("window");

const GraficosResumen = () => {
  const dataIngresos = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        data: [5000, 10000, 7500, 12000, 15000, 17000],
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, 
      },
    ],
  };

  const progresoData = {
    labels: ["Proyectos", "Usuarios", "Inventario"],
    data: [0.8, 0.6, 0.4],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen Empresarial</Text>
      
      {/* Animación para el LineChart */}
      <Animatable.View 
        animation="fadeInUp"  
        duration={1000}        
        delay={500}        
      >
        <LineChart
          data={dataIngresos}
          width={width - 40}
          height={200}
          chartConfig={{
            backgroundColor: color.primaryColor,
            backgroundGradientFrom: color.primaryColor,
            backgroundGradientTo: color.accentColor,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: () => "#fff",
          }}
          style={{
            marginVertical: 10,
            borderRadius: 15,
          }}
        />
      </Animatable.View>
      
      {/* Animación para el ProgressChart */}
      <Animatable.View 
        animation="fadeInUp"  
        duration={1000}       
        delay={1000}          
      >
        
        <ProgressChart
          data={progresoData}
          width={width - 40}
          height={150}
          strokeWidth={8}
          radius={32}
          chartConfig={{
            backgroundColor: color.primaryColor,
            backgroundGradientFrom: color.primaryColor,
            backgroundGradientTo: color.accentColor,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: () => "#fff",
          }}
          style={{
            marginVertical: 1,
            borderRadius: 15,
            
          }}
        />
      </Animatable.View>
    </View>
  );
};

export default GraficosResumen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 20,
    alignItems: "center",
    backgroundColor: color.primaryColor,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: color.white,
    marginBottom: 15,
    textAlign: "center",
  },
});
