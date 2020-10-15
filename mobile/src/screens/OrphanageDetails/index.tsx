import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrphanageDetails(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Olá</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})