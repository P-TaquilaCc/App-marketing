import { View, Text } from 'react-native'
import React from 'react'

const DetailsScreen = ({ navigation, route }) => {
  const pet = route.params;
  console.log(pet);
  return <Text>This is {route.params.name}'s profile</Text>;
};

export default DetailsScreen