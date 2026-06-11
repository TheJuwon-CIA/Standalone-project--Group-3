import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { truncate } from '../../utils/helpers';

export function NoteCard({ note, compact = false, featured = false }: any) {
  const router = useRouter();
  const { theme } = useTheme();
  const isLinkFeature = featured && note.title.includes('Design Inspiration');

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(`/note-detail?id=${note.id}` as any)}
      style={[
        styles.card,
        { backgroundColor: isLinkFeature ? theme.primary : theme.surface, borderColor: theme.border },
        SHADOWS.sm,
      ]}
    >
      {note.type === 'image' && <View style={styles.imageMock} />}
      <View style={styles.cardBody}>
        <View style={styles.topRow}>
          <Ionicons
            name={note.icon || 'document-text-outline'}
            size={compact ? 18 : 21}
            color={isLinkFeature ? theme.primaryText : theme.primary}
          />
          <Text style={[styles.time, { color: isLinkFeature ? '#E0E7FF' : theme.textSoft }]}>{note.relativeTime}</Text>
        </View>
        <Text style={[styles.title, { color: isLinkFeature ? theme.primaryText : theme.text }]}>{note.title}</Text>
        {isLinkFeature ? (
          <View style={styles.links}>
            <Text style={styles.linkLine}>behance.net/minimalist-ui-trends</Text>
            <Text style={styles.linkLine}>dribbble.com/bento-grid-exploration</Text>
          </View>
        ) : (
          <Text style={[styles.excerpt, { color: theme.text }]}>{truncate(note.excerpt, compact ? 96 : 138)}</Text>
        )}
        <View style={styles.footer}>
          <View style={styles.tagRow}>
            {note.tags.slice(0, 2).map((tag) => (
              <View key={tag} style={[styles.tag, { backgroundColor: isLinkFeature ? '#7068FF' : theme.chip }]}>
                <Text style={[styles.tagText, { color: isLinkFeature ? theme.primaryText : theme.chipText }]}>{tag}</Text>
              </View>
            ))}
          </View>
          <Ionicons
            name={note.favorite ? 'star' : 'star-outline'}
            size={20}
            color={isLinkFeature ? theme.primaryText : theme.primary}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
  },
  cardBody: {
    padding: SPACING.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '800',
    marginBottom: SPACING.sm,
  },
  excerpt: {
    fontSize: 14,
    lineHeight: 21,
  },
  time: {
    fontSize: 11,
    fontWeight: '600',
  },
  footer: {
    marginTop: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tagRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  tag: {
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
  },
  imageMock: {
    height: 96,
    backgroundColor: '#D7D2C3',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  links: {
    gap: SPACING.sm,
  },
  linkLine: {
    color: '#F8FAFC',
    backgroundColor: '#7068FF',
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: 12,
  },
});



