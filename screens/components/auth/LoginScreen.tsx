import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Feather'; 
import { RootStackParamList } from 'App';
import BASE_URL from 'src/Config/config';
import color from "src/constant/color";

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
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post<{ access_token: string }>(`${BASE_URL}login`, {
        email,
        password,
      });

      const { access_token } = response.data;
      if (!access_token) {
        throw new Error('Token de acceso no recibido');
      }

      await AsyncStorage.setItem('access_token', access_token);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);

      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas o problema en el servidor');
      console.error('Error en el inicio de sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSecureText = () => setSecureText(!secureText);

  return (
    <View style={styles.container}>
      <Image
        source={require('@asset/icon/logo-login.png')} 
        style={styles.logo}
      />
      <Text style={styles.title}>Inicio de Sesión</Text>
      <Text style={styles.subtitle}>Accede a tu panel empresarial</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo empresarial"
        placeholderTextColor={color.secondaryLight}
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor={color.secondaryLight}
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={toggleSecureText} style={styles.eyeIcon}>
          <Icon name={secureText ? 'eye-off' : 'eye'} size={20} color={color.primaryDark} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={color.accentColor} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.footerText}>
        ¿Olvidaste tu contraseña?{' '}
        <Text style={styles.footerLink}>
          Recuperar
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primaryLighter,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    // width: 120,
    // height: 120,
     marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: color.primaryColor,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: color.primaryDark,
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: color.white,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: color.secondaryLight,
    marginBottom: 15,
    fontSize: 14,
    color: color.primaryDark,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  button: {
    width: '100%',
    backgroundColor: color.accentColor,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buttonText: {
    color: color.white,
    fontSize: 16,
    fontWeight: '500',
  },
  footerText: {
    fontSize: 14,
    color: color.primaryDark,
    marginTop: 10,
  },
  footerLink: {
    color: color.accentColor,
    fontWeight: '600',
  },
});

export default LoginScreen;
