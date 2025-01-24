import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import color from "../../../src/constant/color";

const news = [
  {
    id: 1,
    title: "New Pet Adoption Policies",
    description:
      "Learn about the new pet adoption policies in your area to help more pets find a forever home.",
    image: "https://picsum.photos/200",
  },
  {
    id: 2,
    title: "Meet Our Latest Adoptees",
    description:
      "These adorable pets are ready for adoption. Check out their profiles and find your new best friend!",
    image: "https://picsum.photos/200",
  },
  {
    id: 3,
    title: "Volunteer With Us!",
    description:
      "We are looking for passionate volunteers to help at our adoption center. Join us and make a difference!",
    image: "https://picsum.photos/200",
  },
  {
    id: 4,
    title: "Adopt a Senior Pet",
    description:
      "Senior pets need love too! Consider adopting a senior pet for a lifetime of joy and companionship.",
    image: "https://picsum.photos/200",
  },
  {
    id: 5,
    title: "Pet Health Tips",
    description:
      "Check out these essential pet health tips to keep your furry friends healthy and happy.",
    image: "https://picsum.photos/200",
  },
];

const NewsSection = () => {
  const navigation = useNavigation();

  const handleDetailNews = (newsItem: typeof news[0]) => {
    navigation.navigate("NewsDetail", { newsItem });
  };

  return (
    <View style={{ marginTop: 25 }}>
      <Text style={styles.title}>Latest News</Text>

      {news.map((item, index) => (
        <Pressable key={index} onPress={() => handleDetailNews(item)} style={styles.newsCard}>
          <Image source={{ uri: item.image }} style={styles.newsImage} />
          <View style={styles.textContainer}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDescription}>{item.description}</Text>
          </View>
          <TouchableOpacity
            style={styles.readMoreButton}
            onPress={() => handleDetailNews(item)} // This will navigate with the newsItem
          >
            <Feather name="chevron-right" size={24} color={color.primaryColor} />
          </TouchableOpacity>
        </Pressable>
      ))}
      <View style={{ paddingBottom: 100 }}></View>
    </View>
  );
};

export default NewsSection;

const styles = StyleSheet.create({
  title: {
    color: color.primaryColor,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },
  newsCard: {
    flexDirection: "row",
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: color.white,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { height: 0.2, width: 0.2 },
    elevation: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  newsImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  newsTitle: {
    fontWeight: "bold",
    color: color.black,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  newsDescription: {
    fontWeight: "400",
    color: "gray",
    fontSize: 12,
    marginTop: 4,
  },
  readMoreButton: {
    padding: 10,
    backgroundColor: color.primaryLight,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
