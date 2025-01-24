// import React, { useEffect, useState } from "react";
// import { View, Text, Image, TouchableOpacity } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import * as Location from "expo-location";

// import { NavigationProp, DrawerActions } from '@react-navigation/native';
// import color from "src/constant/color";

// interface HeaderProps {
//   navigation: NavigationProp<any>;
// }

// const Header = ({ navigation }: HeaderProps) => {
//   const [location, setLocation] = useState<string | null>(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setLocation("Permiso denegado");
//         return;
//       }

//       let loc = await Location.getCurrentPositionAsync({});
//       let reverseGeocode = await Location.reverseGeocodeAsync(loc.coords);
//       let city = reverseGeocode[0]?.city || "Ubicación desconocida";
//       let country = reverseGeocode[0]?.country || "";
//       setLocation(`${city}, ${country}`);
//     })();
//   }, []);

//   return (
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 10,
//       }}
//     >
//       <TouchableOpacity >
//         <Image
//           source={require("@asset/icon/menu.png")}
//           style={{ width: 30, height: 30 }}
//         />
//       </TouchableOpacity>
//       <View
//         style={{
//           flexDirection: "row",
//           alignItems: "center",
//           gap: 4,
//         }}
//       >
//         <MaterialIcons name="location-on" size={24} color={color.primaryColor} />
//         <Text style={{ color: color.black, fontSize: 14 }}>
//           {location || "Cargando..."}
//         </Text>
//       </View>
//     </View>
//   );
// };

// export default Header;


import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationProp, DrawerActions } from "@react-navigation/native";
import color from "src/constant/color";

interface HeaderProps {
  navigation: NavigationProp<any>;
}

const Header = ({ navigation }: HeaderProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      {/* Botón para abrir el Drawer */}
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Image
          source={require("@asset/icon/menu.png")}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>

      {/* Título del Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        }}
      >
        <MaterialIcons name="location-on" size={24} color={color.primaryColor} />
        <Text style={{ color: color.black, fontSize: 14 }}>
          Mi Aplicación
        </Text>
      </View>
    </View>
  );
};

export default Header;
