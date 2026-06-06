import React, { useState } from 'react';
import { SafeAreaView, FlatList, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import useNoteStore from './store/noteStore';
import NoteInput from './components/NoteInput';
import NoteCard from './components/NoteCard';
import NoteModal from './components/NoteModal';
import { globalStyles } from './styles/globalStyles';

export default function App() {
  const { notes, addNote, deleteNote } = useNoteStore();
  const [selectedNote, setSelectedNote] = useState(null);

  const handleAddNote = (title, content) => {
    return addNote(title, content);
  };

  const handleDeleteNote = (id) => {
    deleteNote(id);
    if (selectedNote?.id === id) setSelectedNote(null);
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar style="auto" />
      <NoteInput onAddNote={handleAddNote} />

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteCard
            note={item}
            onPress={() => setSelectedNote(item)}
            onDelete={() => handleDeleteNote(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={globalStyles.emptyText}>
            ✨ No notes yet. Tap above to add one.
          </Text>
        }
      />

      <NoteModal
        visible={!!selectedNote}
        note={selectedNote}
        onClose={() => setSelectedNote(null)}
      />
    </SafeAreaView>
  );
}
