import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FloatingActionButton } from '../../components/common/FloatingActionButton';
import { Header } from '../../components/common/Header';
import { Screen } from '../../components/common/Screen';
import { SearchInput } from '../../components/common/SearchInput';
import { RecentNoteCard } from '../../components/notes/RecentNoteCard';
import { SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useNotes } from '../../hooks/useNotes';

export default function NotesScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { notes } = useNotes();

  return (
    <Screen scroll={false}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={(
          <>
            <Header showMenu avatar onRightPress={() => router.push('/profile-settings')} />
            <SearchInput />
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Notes</Text>
              <TouchableOpacity activeOpacity={0.75} onPress={() => router.push('/recent-notes')}>
                <Text style={[styles.viewAll, { color: theme.primary }]}>View all  <Ionicons name="chevron-forward" /></Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        renderItem={({ item }) => <RecentNoteCard note={item} />}
        ListEmptyComponent={(
          <TouchableOpacity style={[styles.emptyCard, { borderColor: theme.border }]} onPress={() => router.push('/create-note')}>
            <Ionicons name="add-circle-outline" size={22} color={theme.label} />
            <Text style={[styles.emptyText, { color: theme.label }]}>Start a new thought...</Text>
          </TouchableOpacity>
        )}
        ListFooterComponent={notes.length > 0 ? (
          <TouchableOpacity style={[styles.emptyCard, { borderColor: theme.border }]} onPress={() => router.push('/create-note')}>
            <Ionicons name="add-circle-outline" size={22} color={theme.label} />
            <Text style={[styles.emptyText, { color: theme.label }]}>Start a new thought...</Text>
          </TouchableOpacity>
        ) : null}
      />
      <FloatingActionButton />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 14,
    paddingBottom: 104,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  viewAll: {
    fontSize: 13,
    fontWeight: '600',
  },
  emptyCard: {
    height: 86,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyText: {
    fontSize: 13,
    fontWeight: '700',
  },
});