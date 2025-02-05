import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Card, Text, Avatar, Divider } from "react-native-paper";

const ObservacionesList = ({ observaciones }) => {
  const renderItem = ({ item }) => {
    const { fecha, observacion, usuario } = item;
    const { persona } = usuario;

    return (
      <Card style={styles.card}>
        <Card.Title
          title={`${persona.nombre1} ${persona.apellido1}`}
          subtitle={`Fecha: ${fecha}`}
          left={() => (
            <Avatar.Image
              size={48}
              source={{
                uri: persona.rutaFotoUrl,
              }}
            />
          )}
        />
        <Card.Content>
          <Text style={styles.observacionText}>
            {observacion === "null" ? "Sin observación" : observacion}
          </Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={observaciones}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <Divider />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  card: {
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#ffffff",
  },
  observacionText: {
    fontSize: 16,
    marginTop: 8,
    color: "#555555",
  },
});

export default ObservacionesList;
