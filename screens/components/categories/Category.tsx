import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native"; // Importar hook para navegación
import color from "../../../src/constant/color";

const Category = () => {
  const navigation = useNavigation(); // Inicializar hook de navegación

  // Función para manejar la navegación a la pantalla de detalle
  const handleCategoryPress = (categoryName: string) => {
    navigation.navigate("CategoryDetail", { categoryName });
  };

  return (
    <View style={{ marginTop: 25 }}>
      <Text style={styles.title}>Explorar</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 18 }}
      >
        <View style={styles.row}>
          <Button
            image={require("@asset/category/aves.png")}
            label="Aves"
            onPress={() => handleCategoryPress("Aves")}
          />
          <Button
            image={require("@asset/category/dog.png")}
            label="Perros"
            onPress={() => handleCategoryPress("Perros")}
          />
          <Button
            image={require("@asset/category/cat.png")}
            label="Gatos"
            onPress={() => handleCategoryPress("Gatos")}
          />
          <Button
            image={require("@asset/category/chameleon.png")}
            label="Reptiles"
            onPress={() => handleCategoryPress("Reptiles")}
          />
          <Button
            image={require("@asset/category/fish.png")}
            label="Peces"
            onPress={() => handleCategoryPress("Peces")}
          />
          <Button
            image={require("@asset/category/rat.png")}
            label="Roedores"
            onPress={() => handleCategoryPress("Roedores")}
          />
          <Button
            image={require("@asset/category/1.png")}
            label="Otros"
            onPress={() => handleCategoryPress("Otros")}
          />
          <Button2 />
        </View>
      </ScrollView>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  title: {
    color: color.primaryColor,
    fontSize: 20,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonLabel: {
    marginTop: 8,
    fontSize: 12,
    color: color.primaryColor,
    textAlign: "center",
  },
});

interface ButtonProps {
  image: any;
  label: string;
  onPress: () => void; 
}

const Button = ({ image, label, onPress }: ButtonProps) => {
  return (
    <View style={{ alignItems: "center", marginHorizontal: 10 }}>
      <TouchableOpacity
        onPress={onPress} // Llamar la función onPress cuando se haga clic
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { height: 0.2, width: 0.2 },
          elevation: 1,
          padding: 12,
          borderRadius: 20,
          backgroundColor: color.white,
          height: 60,
          width: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={image}
          style={{
            width: 35,
            height: 35,
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <Text style={styles.buttonLabel}>{label}</Text>
    </View>
  );
};

const Button2 = () => {
  return (
    <View style={{ alignItems: "center", marginHorizontal: 10 }}>
      <TouchableOpacity
        style={{
          borderRadius: 20,
          backgroundColor: color.secondaryColor,
          height: 60,
          width: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: color.white, fontSize: 14 }}>Ver todas</Text>
      </TouchableOpacity>
      <Text style={styles.buttonLabel}>Ver todas</Text>
    </View>
  );
};
