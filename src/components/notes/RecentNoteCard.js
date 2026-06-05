import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { truncate } from '../../utils/helpers';

export function RecentNoteCard({ note }) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(`/note-detail?id=${note.id}`)}
      style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }, SHADOWS.sm]}
    >
      {note.type === 'image' && <View style={styles.imageMock} />}
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: theme.text }]}>{note.title}</Text>
          <Ionicons name={note.icon || 'document-text-outline'} size={21} color={theme.textSoft} />
        </View>
        <Text style={[styles.excerpt, { color: theme.text }]}>{truncate(note.excerpt, 104)}</Text>
        <View style={styles.dateRow}>
          <Ionicons name="time-outline" size={13} color={theme.textSoft} />
          <Text style={[styles.date, { color: theme.textSoft }]}>{note.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  body: {
    padding: SPACING.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
  },
  excerpt: {
    fontSize: 14,
    lineHeight: 21,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: SPACING.md,
  },
  date: {
    fontSize: 11,
    fontWeight: '600',
  },
  imageMock: {
    height: 100,
    backgroundColor: '#D8D6CC',
  },
});
