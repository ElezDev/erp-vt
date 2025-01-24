import React, { useState } from 'react';
import { TouchableOpacity, View, Image, Text, FlatList, StyleSheet } from 'react-native';

const contactScreen = () => {
  const callsData = [
    { id: 3, name: "Edwin ledezma", date: "12 aug", time: "12:45 am", video: true, image: "https://bootdey.com/img/Content/avatar/avatar5.png" },
    { id: 4, name: "Carlos leder", date: "12 feb", time: "08:32 am", video: false, image: "https://bootdey.com/img/Content/avatar/avatar4.png" },
    { id: 5, name: "John Doe", date: "12 oct", time: "07:45 am", video: true, image: "https://bootdey.com/img/Content/avatar/avatar3.png" },
  ];

  const [calls, setCalls] = useState(callsData);

  interface CallItem {
    id: number;
    name: string;
    date: string;
    time: string;
    video: boolean;
    image: string;
  }

  const renderItem = ({ item }: { item: CallItem }) => {
    const callIcon = item.video
      ? "https://img.icons8.com/color/48/000000/video-call.png"
      : "https://img.icons8.com/color/48/000000/phone.png";

    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image source={{ uri: item.image }} style={styles.pic} />
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{item.name}</Text>
            </View>
            <View style={styles.end}>
              <Image
                style={[styles.icon, { marginLeft: 15, marginRight: 5, width: 14, height: 14 }]}
                source={{ uri: "https://img.icons8.com/small/14/000000/double-tick.png" }}
              />
              <Text style={styles.time}>
                {item.date} {item.time}
              </Text>
            </View>
          </View>
          <Image style={[styles.icon, { marginRight: 50 }]} source={{ uri: callIcon }} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        extraData={calls}
        data={calls}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default contactScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  pic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nameContainer: {
    justifyContent: 'center',
    marginLeft: 15,
  },
  nameTxt: {
    fontWeight: '600',
    fontSize: 16,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 13,
    color: '#a9a9a9',
  },
  icon: {
    width: 20,
    height: 20,
  },
});
