import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SearchInput } from '../common/SearchInput';
import { RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useNotes } from '../../hooks/useNotes';

interface AddFavoriteModalProps {
  visible: boolean;
  onClose: () => void;
}

export function AddFavoriteModal({ visible, onClose }: AddFavoriteModalProps) {
  const { theme } = useTheme();
  const { notes, toggleFavorite } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter notes that are NOT favorites yet, and match the search query
  const availableNotes = notes.filter((note: any) => {
    if (note.favorite) return false;
    if (searchQuery.trim() === '') return true;
    return note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           note.body.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.noteItem, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={() => toggleFavorite(item.id)}
    >
      <View style={styles.noteContent}>
        <Text style={[styles.noteTitle, { color: theme.text }]} numberOfLines={1}>{item.title}</Text>
        <Text style={[styles.noteExcerpt, { color: theme.textSoft }]} numberOfLines={1}>{item.excerpt}</Text>
      </View>
      <Ionicons name="star-outline" size={24} color={theme.primary} />
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <Text style={[styles.title, { color: theme.text }]}>Add to Favorites</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={28} color={theme.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <SearchInput
            placeholder="Search notes to favorite..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <FlatList
          data={availableNotes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: theme.textSoft }]}>
                {searchQuery ? "No matching notes found." : "All your notes are already favorites!"}
              </Text>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.lg,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  closeButton: {
    position: 'absolute',
    right: SPACING.md,
    padding: SPACING.xs,
  },
  searchContainer: {
    padding: SPACING.lg,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  noteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderRadius: RADIUS.md,
  },
  noteContent: {
    flex: 1,
    paddingRight: SPACING.md,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  noteExcerpt: {
    fontSize: 14,
  },
  emptyContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
