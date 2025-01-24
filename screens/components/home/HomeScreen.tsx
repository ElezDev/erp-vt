import React from "react";
import { StyleSheet, ScrollView, Animated } from "react-native";

import { NavigationProp } from '@react-navigation/native';
import Category from "../categories/Category";
import Header from "../navigations/Header";
import HeadLine from "../navigations/HeadLine";
import Search from "../utils/Search";
import BannerERP from "./BannerERP";
import GraficosResumen from "../graficos/GraficosResumen";

const HomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const headerAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <Animated.View
        style={{
          opacity: headerAnim,
          transform: [
            {
              translateY: headerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        }}
      >
      <Header navigation={navigation} />
      </Animated.View>
      <Search />
      <BannerERP />
      <GraficosResumen />
      </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});


