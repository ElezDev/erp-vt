import React from "react";
import { StyleSheet, ScrollView, Animated } from "react-native";

import { NavigationProp } from '@react-navigation/native';
import Category from "../Categories/Category";
import Header from "../Navigations/Header";
import HeadLine from "../Navigations/HeadLine";
import Search from "../utils/Search";
import BannerERP from "./BannerERP";
import GraficosResumen from "../Graficos/GraficosResumen";
import Stories from "../Stories/StoriesScreen";

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
      {/* <Header navigation={navigation} /> */}
      </Animated.View>
      {/* <Search /> */}
      <Stories/>
      <BannerERP />
      <GraficosResumen />
      </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 11,
    paddingTop: 10,
  },
});


