import React from 'react';
import { StatusBar } from 'expo-status-bar';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { Text, View, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import mapMarker from '../../images/map-marker.png';

const OrphanagesMap = (): JSX.Element => {
  const navigation = useNavigation();

  function handleNavigateToOrphanageDetails() {
    navigation.navigate('OrphanageDetails');
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
          <Marker
            icon={mapMarker}
            calloutAnchor={{
              x: 3,
              y: 0.8,
            }}
            coordinate={{
              latitude: -11.946635,
              longitude: -38.0737231,
            }}
          >
            <Callout
              tooltip
              onPress={handleNavigateToOrphanageDetails}
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>
                  Lar das meninas
                </Text>
              </View>
            </Callout>
          </Marker>
        </MapView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>2 Orfanatos encontrados</Text>

          <TouchableOpacity style={styles.createOrphanageButton}>
            <Feather name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

      <StatusBar style="auto" />
    </View>
  );
}

export default OrphanagesMap;