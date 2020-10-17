import React, { useState } from 'react';
import { ScrollView, View, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import styles from './styles';
import api from '../../../services/api';

interface Params {
  position: {
    latitude: number;
    longitude: number;
  }
}


export default function OrphanageData() {
  const route = useRoute();

  const { navigate } = useNavigation();

  const [data, setData] = useState({
    name: '',
    about: '',
    instructions: '',
    opening_hours: '',
    open_on_weekends: true,
  });

  const [images, setImages] = useState<string[]>([]);

  const params = route.params as Params;

  async function handleCreateOrphanage() {
    const { latitude, longitude } = params.position;

    const registers = new FormData();

    registers.append('name', data.name);
    registers.append('about', data.about);
    registers.append('instructions', data.instructions);
    registers.append('latitude', String(latitude));
    registers.append('longitude', String(longitude));
    registers.append('open_on_weekends', String(data.open_on_weekends));
    registers.append('opening_hours', data.opening_hours);

    images.forEach((image, index) => {
      registers.append('images', {
        type: 'image/jpg',
        uri: image,
        name: `image_${index}.jpg`
      } as any);
    });
    try {
      await api.post('orphanages', registers);
      navigate('OrphanagesMap');
    } catch (e) {
      alert('Desculpe, não conseguimos realizar o cadastro do orfanato');
      console.log(e);
    }
  }

  async function handleSelectImages() {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

    if (status !== 'granted') {
      alert('Eita, precisamos de acesso às suas fotos...');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if (result.cancelled) {
      return;
    }

    const { uri: image } = result;

    setImages([ ...images, image ]);
  }


  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={data.name}
        onChangeText={(text) => setData({ ...data, name: text })}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={data.about}
        onChangeText={(text) => setData({ ...data, about: text })}
      />

      {/*
      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      />
      */}

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.uploadedImagesContainer}>
        {images.map((image) => {
          return (
            <Image
              key={image}
              source={{ uri: image }}
              style={styles.uploadedImage}
            />
          );
        })}
      </View>

      <TouchableOpacity onPressIn={handleSelectImages} style={styles.imagesInput} onPress={() => {}}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={data.instructions}
        onChangeText={(text) => setData({ ...data, instructions: text })}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setData({ ...data, opening_hours: text })}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={data.open_on_weekends}
          onValueChange={(value) => setData({ ...data, open_on_weekends: value })}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

