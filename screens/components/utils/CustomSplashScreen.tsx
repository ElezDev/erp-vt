// import React, { useEffect } from 'react';
// import { View, StyleSheet, ImageBackground } from 'react-native';
// import LottieView from 'lottie-react-native';

// export default function CustomSplashScreen({ navigation }: any) {
//   useEffect(() => {
//     // Navega a la pantalla principal después de 3 segundos
//     const timer = setTimeout(() => {
//       navigation.replace('Login');
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [navigation]);

//   return (
//     <ImageBackground
//       source={require('./../../../assets/paw.png')}
//       style={styles.container}
//     >
//       <LottieView
//         source={require('./../../../assets/animations/paw.json')}
//         autoPlay
//         loop
//         style={styles.animation}
//       />
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   animation: {
//     width: 200,
//     height: 200,
//   },
// });
