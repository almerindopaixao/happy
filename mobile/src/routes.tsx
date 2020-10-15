import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OrphanagesMap from './screens/OrphanagesMap';
import OrphanageDetails from './screens/OrphanageDetails';

export default function Routes(): JSX.Element {

  const { Screen, Navigator } = createStackNavigator();

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{ headerShown: false }} initialRouteName="OrphanagesMap"
      >
        <Screen
          name="OrphanagesMap"
          component={OrphanagesMap}
        />
        <Screen
          name="OrphanageDetails"
          component={OrphanageDetails}
        />
      </Navigator>
    </NavigationContainer>
  );
}