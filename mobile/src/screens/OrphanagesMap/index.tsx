import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { Text, View, TouchableOpacity  } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import mapMarker from '../../images/map-marker.png';
import api from '../../services/api';

interface Orphanage {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}

const OrphanagesMap = (): JSX.Element => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    api.get('/orphanages').then((response) => {
      setOrphanages(response.data);
    });
  }, [])

  function handleNavigateToOrphanageDetails(id: number) {
    navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToCreateOrphanage() {
    navigation.navigate('SelectMapPosition');
  }


  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -11.946635,
          longitude: -38.0737231,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}>
          {orphanages.map((orphanage) => {
            return (
              <Marker
                key={orphanage.id}
                icon={mapMarker}
                calloutAnchor={{
                  x: 3,
                  y: 0.8,
                }}
                coordinate={{
                  latitude: parseFloat(orphanage.latitude),
                  longitude: parseFloat(orphanage.longitude),
                }}
              >
                <Callout
                  tooltip
                  onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}
                >
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>
                      {orphanage.name}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            )
          })}
        </MapView>

        <View style={styles.footer}>
        <Text style={styles.footerText}>{orphanages.length} Orfanatos encontrados</Text>

          <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
            <Feather name="plus" size={20} color="#fff" />
          </RectButton>
        </View>
      <StatusBar style="auto" />
    </View>
  );
}

export default OrphanagesMap;