import { FlatList, StyleSheet, Text, View } from 'react-native';
import { FloatingActionButton } from '../../components/common/FloatingActionButton';
import { Header } from '../../components/common/Header';
import { Screen } from '../../components/common/Screen';
import { NoteCard } from '../../components/notes/NoteCard';
import { SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useNotes } from '../../hooks/useNotes';

export default function RecentNotesScreen() {
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
            <Header showBack rightIcon="search" />
            <View style={styles.hero}>
              <Text style={[styles.title, { color: theme.text }]}>Recent Notes</Text>
              <Text style={[styles.subtitle, { color: theme.text }]}>Your latest thoughts and brainstorms, all in one place.</Text>
            </View>
          </>
        )}
        renderItem={({ item }) => <NoteCard note={item} />}
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
  hero: {
    marginVertical: SPACING.lg,
  },
  title: {
    fontSize: 25,
    fontWeight: '900',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    maxWidth: 300,
    fontSize: 16,
    lineHeight: 24,
  },
});