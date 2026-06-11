import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button } from '../../components/common/Button';
import { Screen } from '../../components/common/Screen';
import { RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useNoteStore } from '../../store/useNoteStore';

export default function CreateNoteScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const addNote = useNoteStore((state) => state.addNote);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const currentDateLabel = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase();

  const handleSave = () => {
    const note = addNote({ title, body });
    router.replace(`/note-detail?id=${note.id}` as any);
  };

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={26} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.logo, { color: theme.primary }]}>Noted</Text>
          <Button title="Save" onPress={handleSave} style={styles.saveButton} />
        </View>
        <View style={styles.metaRow}>
          <Ionicons name="calendar-outline" size={19} color={theme.label} />
          <Text style={[styles.meta, { color: theme.label }]}>{currentDateLabel}</Text>
          <Text style={[styles.dot, { color: theme.label }]}>•</Text>
          <Ionicons name="pricetag-outline" size={19} color={theme.label} />
          <Text style={[styles.meta, { color: theme.label }]}>PERSONAL</Text>
        </View>
        <TextInput
          placeholder="Note Title"
          placeholderTextColor={theme.label}
          value={title}
          onChangeText={setTitle}
          style={[styles.titleInput, { color: theme.text }]}
        />
        <TextInput
          placeholder="Start writing your thoughts here..."
          placeholderTextColor={theme.label}
          value={body}
          onChangeText={setBody}
          multiline
          textAlignVertical="top"
          style={[styles.bodyInput, { color: theme.text }]}
        />
        <View style={[styles.toolbar, { backgroundColor: theme.surface, borderColor: theme.border }, SHADOWS.md]}>
          {['bold', 'italic', 'list', 'image-outline', 'link', 'stats-chart-outline'].map((icon) => (
            <TouchableOpacity key={icon} style={styles.toolButton}>
              <Ionicons name={icon as any} size={22} color={theme.textSoft} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    fontSize: 30,
    fontWeight: '900',
    marginLeft: SPACING.lg,
  },
  saveButton: {
    width: 96,
    height: 40,
    borderRadius: RADIUS.full,
  },
  metaRow: {
    marginTop: 54,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  meta: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
  },
  dot: {
    fontSize: 20,
  },
  titleInput: {
    marginTop: 34,
    fontSize: 28,
    fontWeight: '900',
  },
  bodyInput: {
    flex: 1,
    marginTop: SPACING.lg,
    fontSize: 20,
    lineHeight: 29,
  },
  toolbar: {
    height: 58,
    borderWidth: 1,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: SPACING.lg,
  },
  toolButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
});



