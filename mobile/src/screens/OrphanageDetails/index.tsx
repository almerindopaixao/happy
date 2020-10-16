import React, { useEffect, useState } from 'react';
import { Image, View, ScrollView, Text, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

import mapMarkerImg from '../../images/map-marker.png';
// import { RectButton } from 'react-native-gesture-handler';

import replaceLocalhost from '../../utils/replaceLocalhost';

import styles from './styles';
import api from '../../services/api';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface OrphanageDetailsRoutesParams {
  id: number;
}

interface Orphanage {
  id: string;
  name: string;
  latitude: string;
  longitude: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>
}

export default function OrphanageDetails() {
  const route = useRoute();
  const [orphanage, setOrphanage] = useState<Orphanage>();

  const params = route.params as OrphanageDetailsRoutesParams;

  useEffect(() => {
    api.get(`/orphanages/${params.id}`).then((response) => {
      setOrphanage(response.data);
    });
  }, [params.id]);

  if (!orphanage){
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Carregando...
        </Text>
      </View>
    );
  }

  function handleOpenGoogleMapsRoutes() {
    Linking.openURL(`https://www.google.com/maps/dir/api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`)
  }


  return (
    <ScrollView style={styles.container}>
        {orphanage.images.length > 0 ? (
          orphanage.images.map((image) => {
            return (
              <View style={styles.imagesContainer}>
                <ScrollView horizontal pagingEnabled>
                  <Image
                    key={image.id}
                    style={styles.image}
                    source={{ uri: replaceLocalhost(image.url) }}
                  />
                </ScrollView>
              </View>
            );
          })
        ) : (
          null
        )}

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{orphanage.name}</Text>
        <Text style={styles.description}>{orphanage.about}</Text>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={{
              latitude: parseFloat(orphanage.latitude),
              longitude: parseFloat(orphanage.longitude),
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker
              icon={mapMarkerImg}
              coordinate={{
                latitude: parseFloat(orphanage.latitude),
                longitude: parseFloat(orphanage.longitude),
              }}
            />
          </MapView>

          <TouchableOpacity
            style={styles.routesContainer}
            onPress={handleOpenGoogleMapsRoutes}
          >
            <Text style={styles.routesText}>Ver rotas no Google Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <Text style={styles.title}>Instruções para visita</Text>
        <Text style={styles.description}>{orphanage.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>Segunda à Sexta {orphanage.opening_hours}</Text>
          </View>

          { orphanage.open_on_weekends ? (
            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
              <Feather name="info" size={40} color="#39CC83" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Atendemos fim de semana</Text>
            </View>
          ) : (
            <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
              <Feather name="info" size={40} color="#FF669D" />
              <Text style={[styles.scheduleText, styles.scheduleTextRed]}>Não atendemos fim de semana</Text>
            </View>
          )}

        </View>

        {/*
        <RectButton style={styles.contactButton} onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton>
        */}
      </View>
    </ScrollView>
  )
}

