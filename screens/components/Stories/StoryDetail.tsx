import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import color from 'src/constant/color';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type StoryDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "StoryDetail"
>;
type StoryDetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "StoryDetail"
>;

interface StoryDetailProps {
  route: StoryDetailScreenRouteProp;
  navigation: StoryDetailScreenNavigationProp;
}


const StoryDetail = ({ route, navigation }: StoryDetailProps) => {
  const { stories, initialIndex } = route.params; // Recibe las historias y el índice inicial
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const progress = useRef(new Animated.Value(0)).current;

  // Avanzar a la siguiente historia
  const goToNextStory = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      progress.setValue(0);
    } else {
      navigation.goBack(); 
    }
  };

  const goToPreviousStory = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      progress.setValue(0); 
    }
  };

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000, 
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        goToNextStory(); 
      }
    });
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      {/* Imagen de la historia */}
      <Image
        source={{ uri: stories[currentIndex].imageUrl }}
        style={styles.storyImage}
      />

      {/* Barra de progreso */}
      <View style={styles.progressBarContainer}>
        {stories.map((_, index) => (
          <View key={index} style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width:
                    index === currentIndex
                      ? progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                        })
                      : index < currentIndex
                      ? '100%'
                      : '0%',
                },
              ]}
            />
          </View>
        ))}
      </View>

      {/* Controles para navegar entre historias */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={goToPreviousStory}
        />
        <TouchableOpacity
          style={styles.controlButton}
          onPress={goToNextStory}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  storyImage: {
    width: screenWidth,
    height: screenHeight,
    resizeMode: 'cover',
  },
  progressBarContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: color.accentColor
  },
  progressBarBackground: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 2,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: color.accentColor
  },
  controlsContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  controlButton: {
    flex: 1,
    height: '100%',
  },
});

export default StoryDetail;