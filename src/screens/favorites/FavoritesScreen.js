import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { FloatingActionButton } from '../../components/common/FloatingActionButton';
import { Header } from '../../components/common/Header';
import { Screen } from '../../components/common/Screen';
import { SearchInput } from '../../components/common/SearchInput';
import { NoteCard } from '../../components/notes/NoteCard';
import { SPACING } from '../../constants/theme';
import { useNotes } from '../../hooks/useNotes';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites } = useNotes();

  return (
    <Screen scroll={false}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={(
          <>
            <Header showMenu title="Favorites" rightIcon="search" onRightPress={() => router.push('/(tabs)/search')} />
            <SearchInput placeholder="Search favorites..." style={styles.search} />
          </>
        )}
        renderItem={({ item }) => <NoteCard note={item} compact />}
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
  search: {
    marginTop: SPACING.md,
    marginBottom: SPACING.xl,
    backgroundColor: 'transparent',
  },
});
