import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App'; // Asegúrate de importar el tipo desde App.tsx

type NewsDetailRouteProp = RouteProp<RootStackParamList, 'NewsDetail'>;

const NewsDetailScreen = ({ route }: { route: NewsDetailRouteProp }) => {
  const { newsItem } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Animated.Image
        source={{ uri: newsItem.image }}
        style={styles.image}
        entering={FadeInUp.duration(800)}
      />
      <View style={styles.textContainer}>
        <Animated.Text style={styles.title} entering={FadeIn.duration(1000)}>
          {newsItem.title}
        </Animated.Text>
        <Animated.Text
          style={styles.description}
          entering={FadeIn.delay(300).duration(1200)}
        >
          {newsItem.description}
        </Animated.Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  textContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  description: {
    fontSize: 18,
    color: "#555",
    lineHeight: 24,
    letterSpacing: 0.5,
  },
});

export default NewsDetailScreen;
