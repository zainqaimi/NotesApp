import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { addNote, updateNote, getNotes, Note } from '../../database/db';

type Props = NativeStackScreenProps<RootStackParamList, 'AddEditTask'>;

const AddEditTaskScreen: React.FC<Props> = ({ navigation, route }) => {
  const taskId = route.params?.taskId; // ✅ ab TS error nahi karega
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (taskId) {
      // agar edit hai to note load karo
      getNotes(notes => {
        const found = notes.find(n => n.id === taskId);
        if (found) {
          setNote(found);
          setTitle(found.title);
          setContent(found.content);
        }
      });
    }
  }, [taskId]);

  const handleSave = () => {
    if (note) {
      updateNote({ ...note, title, content }, () => navigation.goBack());
    } else {
      addNote({ title, content }, () => navigation.goBack());
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="titleLarge" style={{ marginBottom: 16 }}>
        {taskId ? 'Edit Task' : 'Add Task'}
      </Text>

      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        style={{ marginBottom: 12 }}
      />

      <TextInput
        label="Content"
        value={content}
        onChangeText={setContent}
        multiline
        numberOfLines={5}
        style={{ marginBottom: 16 }}
      />

      <Button mode="contained" onPress={handleSave}>
        Save
      </Button>
    </View>
  );
};

export default AddEditTaskScreen;
