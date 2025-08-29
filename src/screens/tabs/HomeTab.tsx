// src/screens/tabs/HomeScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, FAB, SegmentedButtons, List } from 'react-native-paper';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../navigation/RootNavigator';
import { getNotes, deleteNote, Note } from '../../database/db';
import { useAppTheme } from '../../theme';

type Props = BottomTabScreenProps<MainTabParamList, 'HomeTab'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { mode, setMode, colors } = useAppTheme();
  useEffect(() => {
    loadNotes();
    const unsubscribe = navigation.addListener('focus', () => {
      loadNotes();
    });
    return unsubscribe;
  }, [navigation]);

  const loadNotes = () => {
    getNotes(data => setNotes(data));
  };

  const handleDelete = (id: number) => {
    deleteNote(id, () => loadNotes());
  };

  const renderNote = ({ item }: { item: Note }) => (
    <Card
      style={{ marginVertical: 8, borderRadius: 12 }}
      onPress={() =>
        navigation.getParent()?.navigate('AddEditTask', { taskId: item.id })
      }
    >
      <Card.Title
        title={item.title}
        subtitle={item.content}
        right={() => (
          <TouchableOpacity onPress={() => handleDelete(item.id!)}>
            <Text style={{ color: colors.text, marginRight: 12 }}>Delete</Text>
          </TouchableOpacity>
        )}
      />
    </Card>
  );

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
      <Text variant="titleLarge" style={{ marginBottom: 12 }}>
        My Notes
      </Text>

      <FlatList
        data={notes}
        keyExtractor={item => item.id?.toString() ?? Math.random().toString()}
        renderItem={renderNote}
        ListEmptyComponent={<Text>No notes yet</Text>}
      />

      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: colors.primary,
        }}
        color={colors.text}
        onPress={() => navigation.getParent()?.navigate('AddEditTask')}
      />
    </View>
  );
};

export default HomeScreen;
