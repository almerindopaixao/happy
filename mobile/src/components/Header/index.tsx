import React from 'react';
import { View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


import styles from './styles';

interface Props {
  title: string;
  showCancel?: boolean;
}

export default function Header({ title, showCancel = true }: Props): JSX.Element {

  const { goBack, navigate } = useNavigation();

  function handleGoBackToHomepage() {
    navigate('OrphanagesMap');
  }

  return (
    <View style={styles.container} >
      <BorderlessButton onPress={goBack}>
        <Icon name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>

      <Text style={styles.title}>
        {title}
      </Text>

      {showCancel ? (
      <BorderlessButton onPress={handleGoBackToHomepage}>
        <Icon name="x" size={24} color="#ff669d" />
      </BorderlessButton>
      ): (
        <View />
      )}
    </View>
  );
}