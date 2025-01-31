import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const storiesData = [
  {
    id: '1',
    username: 'compleaños',
    imageUrl: 'https://img.freepik.com/foto-gratis/tienes-unete-nosotros-sonriente-mujer-asertiva-apuntando-al-frente-invitando-trabajar-empresa-o-al-evento-alabando-buen-trabajo-gesto-bien-hecho-pie-sobre-pared-blanca_176420-37967.jpg?t=st=1738196049~exp=1738199649~hmac=b0656a11326069a3d5ab7a5cd335b2982287ff8710df6ac0ec50e7e435d4e961&w=1060',
  },
  {
    id: '2',
    username: 'Novedad',
    imageUrl: 'https://cdn-icons-png.flaticon.com/128/2586/2586859.png',
  },
  {
    id: '3',
    username: 'pago',
    imageUrl: 'https://cdn-icons-png.flaticon.com/128/7021/7021224.png',
  },
  {
    id: '4',
    username: 'Edwin',
    imageUrl: 'https://cdn-icons-png.flaticon.com/128/7185/7185645.png',
  },
  {
    id: '5',
    username: 'Edwin',
    imageUrl: 'https://cdn-icons-png.flaticon.com/128/4149/4149678.png',
  },
];

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';


const Story = ({ item, index, stories }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'StoryDetail'>>();

  const handlePress = () => {
    navigation.navigate('StoryDetail', {
      stories,
      initialIndex: index,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.storyContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.storyImage} />
      <Text style={styles.username}>{item.username}</Text>
    </TouchableOpacity>
  );
};

const Stories = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={storiesData}
        renderItem={({ item, index }) => (
          <Story item={item} index={index} stories={storiesData} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={110}
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  storyContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  storyImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#ff8501',
  },
  username: {
    marginTop: 5,
    fontSize: 12,
    color: '#000',
  },
});

export default Stories;
