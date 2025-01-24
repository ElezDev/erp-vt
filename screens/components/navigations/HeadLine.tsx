import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import color from "src/constant/color";

const BannerAdopcion = () => {
  return (
    <View
      style={{
        marginTop: 25,
        backgroundColor: color.primaryColor,
        padding: 20,
        borderRadius: 30,
      }}
    >
      <Text style={styles.title}>Encuentra tu compañero</Text>
      <Text style={styles.title}>perfecto para adoptar</Text>

      <View style={{ flexDirection: "row", marginTop: 12 }}>
        <Image
          source={{
            uri: "https://www.shutterstock.com/image-photo/adorable-puppy-posing-adoption-concept-600nw-1945323485.jpg",
          }}
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            borderWidth: 2,
            borderColor: color.white,
          }}
        />

        <PetImage uri="https://img.freepik.com/free-photo/adorable-kitten-playing-with-toy_58466-15612.jpg" />

        <PetImage uri="https://www.shutterstock.com/image-photo/little-dog-wearing-red-collar-600nw-2169838055.jpg" />

        <PetImage uri="https://img.freepik.com/free-photo/happy-dog-isolated-yellow-background_88135-43505.jpg" />
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
            backgroundColor: "#6D55B2",
            borderRadius: 20,
          }}
        >
          <Text style={{ ...styles.title, fontSize: 14 }}>+200 Mascotas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 14,
            backgroundColor: color.white,
            borderRadius: 15,
          }}
        >
          <Text
            style={{ ...styles.title, fontSize: 14, color: color.primaryColor }}
          >
            Adoptar Ahora
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BannerAdopcion;

const styles = StyleSheet.create({
  title: {
    color: color.white,
    fontSize: 18,
    fontWeight: "700",
  },
});

const PetImage = ({ uri }: { uri: string }) => {
  return (
    <Image
      source={{
        uri,
      }}
      style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: color.white,
        marginLeft: -10,
      }}
    />
  );
};
