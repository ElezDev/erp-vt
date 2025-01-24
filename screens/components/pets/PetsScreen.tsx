// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator } from "react-native";
// import Swiper from "react-native-deck-swiper";
// import axios from "axios";
// import BASE_URL from "src/Config/config";

// const { width, height } = Dimensions.get("window");

// const PetsScreen = () => {
//   const [pets, setPets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [action, setAction] = useState<string | null>(null);
//   const [cardIndex, setCardIndex] = useState(0);

//   useEffect(() => {
//     const fetchPets = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}all_pets`);
//         setPets(response.data);
//       } catch (error) {
//         console.error("Error fetching pets:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPets();
//   }, []);

//   interface Pet {
//     id: number;
//     name: string;
//     age: string;
//     breed: string;
//     location: string;
//     images: { image_url: string }[];
//     user: { name: string };
//   }

//   const renderCard = (item: Pet) => {
//     return (
//       <View style={styles.card}>
//         <Image
//           source={{ uri: item.images[0]?.image_url }}
//           style={styles.image}
//         />
//         <View style={styles.cardContent}>
//           <Text style={styles.petName}>{item.name}, {item.age}</Text>
//           <Text style={styles.petBreed}>{item.breed}</Text>
//           <Text style={styles.petLocation}>📍 {item.location}</Text>
//           <Text style={styles.owner}>Publicado por: {item.user.name}</Text>
//         </View>
//       </View>
//     );
//   };

//   const handleSwiped = (direction: string) => {
//     if (cardIndex + 1 < pets.length) {
//       setAction(direction === "left" ? "Rechazado 👎" : "Interesado ❤️");
//       setCardIndex(cardIndex + 1);
//     } else {
//       setAction("No hay más publicaciones");
//     }
//   };

//   if (loading) {
//     return (
//       <View style={[styles.container, { justifyContent: "center" }]}>
//         <ActivityIndicator size="large" color="#6200ee" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Mascotas Disponibles</Text>
//       {action && (
//         <Text style={styles.actionText}>
//           {action}
//         </Text>
//       )}
//       {pets.length > 0 ? (
//         <Swiper
//           cards={pets}
//           renderCard={renderCard}
//           onSwipedLeft={() => handleSwiped("left")}
//           onSwipedRight={() => handleSwiped("right")}
//           cardIndex={cardIndex}
//           backgroundColor="transparent"
//           stackSize={3}
//           stackSeparation={10} 
//           cardVerticalMargin={10}
//           disableTopSwipe
//           disableBottomSwipe
//           overlayLabels={{
//             left: {
//               title: "NOPE",
//               style: {
//                 label: {
//                   backgroundColor: "red",
//                   color: "white",
//                   fontSize: 24,
//                   borderRadius: 10,
//                   padding: 10,
//                 },
//                 wrapper: {
//                   position: "absolute",
//                   top: 10,
//                   left: 20,
//                   zIndex: 1,
//                 },
//               },
//             },
//             right: {
//               title: "LIKE",
//               style: {
//                 label: {
//                   backgroundColor: "green",
//                   color: "white",
//                   fontSize: 24,
//                   borderRadius: 10,
//                   padding: 10,
//                 },
//                 wrapper: {
//                   position: "absolute",
//                   top: 2,
//                   right: 20,
//                   zIndex: 1,
//                 },
//               },
//             },
//           }}
//         />
//       ) : (
//         <Text style={styles.noMoreText}>No hay más publicaciones disponibles</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     alignItems: "center", // Centrar horizontalmente
//     paddingHorizontal: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#6200ee",
//     textAlign: "center",
//     marginVertical: 20,
//   },
//   actionText: {
//     fontSize: 20,
//     textAlign: "center",
//     color: "gray",
//     marginBottom: 10,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     overflow: "hidden",
//     elevation: 5,
//     width: width * 0.9,
//     height: height * 0.7,
//   },
//   image: {
//     width: "100%",
//     height: "70%",
//   },
//   cardContent: {
//     padding: 15,
//   },
//   petName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#000",
//   },
//   petBreed: {
//     fontSize: 16,
//     color: "gray",
//     marginVertical: 5,
//   },
//   petLocation: {
//     fontSize: 14,
//     color: "#6200ee",
//     marginVertical: 5,
//   },
//   owner: {
//     fontSize: 14,
//     color: "gray",
//     marginTop: 5,
//   },
//   noMoreText: {
//     fontSize: 18,
//     color: "gray",
//     textAlign: "center",
//     marginTop: 20,
//   },
// });

// export default PetsScreen;
