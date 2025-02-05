import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Feather'; 
import { RootStackParamList } from 'App';
import BASE_URL from 'src/Config/config';
import color from "src/constant/color";
import { stylesLogin } from './Styles/LoginStyles';
import LoadingComponent from '../utils/LoadingComponent';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSavedCredentials = async () => {
      const savedEmail = await AsyncStorage.getItem('email');
      const savedPassword = await AsyncStorage.getItem('password');
      if (savedEmail && savedPassword) {
        setEmail(savedEmail);
        setPassword(savedPassword);
      }
    };
    loadSavedCredentials();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        text1: 'Por favor, complete los campos',
        type: 'info',
        position: 'bottom',
        topOffset: 50,
        visibilityTime: 3000,
        text1Style: { fontSize: 18 },
        text2Style: { fontSize: 10 },
      })
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post<{ access_token: string; user: any; payload: { roles: any; permissions: any; company: any } }>(`${BASE_URL}login`, { email, password });
  
      const { access_token, user, payload } = response.data;
      
      if (!access_token) {
        throw new Error('Token de acceso no recibido');
      }
      await AsyncStorage.setItem('access_token', access_token);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      await AsyncStorage.setItem('user', JSON.stringify(user)); 
      await AsyncStorage.setItem('roles', JSON.stringify(payload.roles)); 
      await AsyncStorage.setItem('permissions', JSON.stringify(payload.permissions));
      await AsyncStorage.setItem('company', JSON.stringify(payload.company)); 
  
      navigation.replace('Main');
    } catch (error) {
      Toast.show({
        text1: 'Error al iniciar sesión',
        text2: 'Credenciales incorrectas problema en el servidor',
        type: 'error',
        position: 'top',
        topOffset: 50,
        visibilityTime: 3000,
        text1Style: { fontSize: 18 },
        text2Style: { fontSize: 10 },
      })
    } finally {
      
      setLoading(false);
    }
  };
  

  const toggleSecureText = () => setSecureText(!secureText);

  return (
    <View style={stylesLogin.container}>
      <Image
        source={require('@asset/icon/logo-login.png')} 
        style={stylesLogin.logo}
      />
      <Text style={stylesLogin.title}>Inicio de Sesión</Text>
      <Text style={stylesLogin.subtitle}>Accede a tu panel empresarial</Text>

      <TextInput
        style={stylesLogin.input}
        placeholder="Correo empresarial"
        placeholderTextColor={color.secondaryLight}
        value={email}
        onChangeText={setEmail}
      />

      <View style={stylesLogin.passwordContainer}>
        <TextInput
          style={stylesLogin.input}
          placeholder="Contraseña"
          placeholderTextColor={color.secondaryLight}
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={toggleSecureText} style={stylesLogin.eyeIcon}>
          <Icon name={secureText ? 'eye-off' : 'eye'} size={20} color={color.primaryDark} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <LoadingComponent text="Iniciando sesión..." color={color.accentColor} />
      ) : (
        <TouchableOpacity style={stylesLogin.button} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={stylesLogin.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      )}

      <Text style={stylesLogin.footerText}>
        ¿Olvidaste tu contraseña?{' '}
        <Text style={stylesLogin.footerLink}>
          Recuperar
        </Text>
      </Text>
    </View>
  );
};


export default LoginScreen;
