import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { AppLoading } from 'expo';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

import mapMarker from './src/images/map-marker.png';

export default function App(): JSX.Element {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  });

  if (!fontsLoaded) {
    return <AppLoading />
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
            <Callout tooltip onPress={() => alert('oi')}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    justifyContent: 'center',
  },
  calloutText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
    fontSize: 14,
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: '#ffffff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 3,
  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3'
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
