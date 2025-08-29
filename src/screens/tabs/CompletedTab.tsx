import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

const CompletedTab: React.FC = () => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="titleLarge">Completed</Text>
    </View>
  );
};

export default CompletedTab;
