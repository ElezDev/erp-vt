import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';
import color from 'src/constant/color';
import LoadingComponent from './LoadingComponent';

type Props = NativeStackScreenProps<RootStackParamList, 'Indicator'>;

const IndicatorScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const checkToken = async () => {
      setTimeout(async () => {
        const token = await AsyncStorage.getItem('access_token');
        if (token) {
          navigation.replace('Main');
        } else {
          navigation.replace('Login');
        }
      }, 2000);
    };

    checkToken();
  }, []);
 
  return <LoadingComponent text="Espere un momento..." color="#ff6347" />;



};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.secondaryLight,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: color.primaryDark,
  },
});

export default IndicatorScreen;
