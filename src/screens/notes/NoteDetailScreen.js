import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Header } from '../../components/common/Header';
import { Screen } from '../../components/common/Screen';
import { RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useNoteStore } from '../../store/useNoteStore';

export default function NoteDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const noteId = Array.isArray(id) ? id[0] : id;
  const note = useNoteStore((state) => state.getNoteById(noteId));
  const updateNote = useNoteStore((state) => state.updateNote);
  const deleteNote = useNoteStore((state) => state.deleteNote);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');


  const handleEdit = () => {
    if (!note) return;
    setTitle(note.title);
    setBody(note.body || note.excerpt || '');
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!note) return;
    updateNote(note.id, { title, body });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!note) return;

    Alert.alert('Delete note?', 'This note will be removed from this device.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          deleteNote(note.id);
          router.replace('/(tabs)');
        },
      },
    ]);
  };

  if (!note) {
    return (
      <Screen>
        <Header showBack />
        <View style={[styles.article, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <Text style={[styles.title, { color: theme.text }]}>Note not found</Text>
          <Text style={[styles.paragraph, { color: theme.text }]}>This note may have been deleted.</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        showBack
        rightIcon="trash-outline"
        onRightPress={handleDelete}
        style={[styles.header, { backgroundColor: theme.surface, borderColor: theme.border }]}
      />
      <View style={styles.actionRow}>
        <View style={styles.metaRow}>
          <View style={[styles.tag, { backgroundColor: theme.chip }]}>
            <Text style={[styles.tagText, { color: theme.chipText }]}>{note.tags[0] || 'Personal'}</Text>
          </View>
          <Text style={[styles.meta, { color: theme.textSoft }]}>Edited {note.relativeTime}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={isEditing ? handleSave : handleEdit}
          style={[styles.editButton, { backgroundColor: theme.primary }]}
        >
          <Ionicons name={isEditing ? 'checkmark' : 'pencil'} size={17} color={theme.primaryText} />
          <Text style={[styles.editButtonText, { color: theme.primaryText }]}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>
      {isEditing ? (
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Note title"
          placeholderTextColor={theme.label}
          style={[styles.titleInput, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
        />
      ) : (
        <Text style={[styles.title, { color: theme.text }]}>{note.title}</Text>
      )}
      <View style={[styles.article, { backgroundColor: theme.surface, borderColor: theme.border }, SHADOWS.sm]}>
        {isEditing ? (
          <TextInput
            value={body}
            onChangeText={setBody}
            placeholder="Write your note..."
            placeholderTextColor={theme.label}
            multiline
            textAlignVertical="top"
            style={[styles.bodyInput, { color: theme.text }]}
          />
        ) : (
          <Text style={[styles.paragraph, { color: theme.text }]}>{note.body || note.excerpt}</Text>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  metaRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  tag: {
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
  },
  meta: {
    fontSize: 11,
    fontWeight: '600',
  },
  editButton: {
    minHeight: 36,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: '800',
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '900',
    marginVertical: SPACING.lg,
  },
  titleInput: {
    minHeight: 54,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    fontSize: 18,
    fontWeight: '900',
    marginVertical: SPACING.lg,
  },
  article: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 23,
    marginBottom: SPACING.lg,
  },
  bodyInput: {
    minHeight: 260,
    fontSize: 15,
    lineHeight: 23,
  },
});


