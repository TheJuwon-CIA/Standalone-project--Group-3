import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

interface NoteInputProps {
  onAddNote: (title: string, content: string) => boolean;
}

const NoteInput: React.FC<NoteInputProps> = ({ onAddNote }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleAdd = () => {
    const success = onAddNote(title, content);
    if (success) {
      setTitle('');
      setContent('');
    }
  };

  return (
    <View style={globalStyles.inputContainer}>
      <TextInput
        style={globalStyles.titleInput}
        placeholder="Title (optional)"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={globalStyles.contentInput}
        placeholder="Write your note..."
        multiline
        value={content}
        onChangeText={setContent}
      />
      <TouchableOpacity style={globalStyles.addButton} onPress={handleAdd}>
        <Text style={globalStyles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoteInput;
