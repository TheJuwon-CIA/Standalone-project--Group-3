import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { Header } from '../../components/common/Header';
import { Screen } from '../../components/common/Screen';
import { SearchInput } from '../../components/common/SearchInput';
import { NoteCard } from '../../components/notes/NoteCard';
import { SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useNotes } from '../../hooks/useNotes';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const { theme } = useTheme();
  const { notes } = useNotes();
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return notes;
    return notes.filter((note) => `${note.title} ${note.excerpt} ${note.tags.join(' ')}`.toLowerCase().includes(normalized));
  }, [notes, query]);

  return (
    <Screen scroll={false}>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={(
          <>
            <Header showMenu title="Search" rightIcon="close" />
            <SearchInput placeholder="Search notes, tags, ideas..." value={query} onChangeText={setQuery} style={styles.search} />
            <Text style={[styles.label, { color: theme.textSoft }]}>{results.length} results</Text>
          </>
        )}
        renderItem={({ item }) => <NoteCard note={item} compact />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 14,
    paddingBottom: 104,
  },
  search: {
    marginTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  label: {
    marginBottom: SPACING.md,
    fontSize: 13,
    fontWeight: '700',
  },
});

