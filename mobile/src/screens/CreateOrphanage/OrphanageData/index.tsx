import React, { useState } from 'react';
import { ScrollView, View, Switch, Text, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

import styles from './styles';

interface Params {
  position: {
    latitude: number;
    longitude: number;
  }
}


export default function OrphanageData() {
  const route = useRoute();

  const [data, setData] = useState({
    name: '',
    about: '',
    instructions: '',
    opening_hours: '',
    open_on_weekends: true,
  });

  const params = route.params as Params;


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
      <TouchableOpacity style={styles.imagesInput} onPress={() => {}}>
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

      <RectButton style={styles.nextButton} onPress={() => {}}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

