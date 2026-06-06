import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/globalStyles';

const NoteCard = ({ note, onPress, onDelete }) => {
  const formattedDate = new Date(note.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.content} onPress={onPress} activeOpacity={0.7}>
        <Text style={styles.title}>{note.title}</Text>
        <Text numberOfLines={2} style={styles.preview}>
          {note.content}
        </Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 4,
  },
  preview: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#aaa',
  },
  deleteBtn: {
    padding: 8,
  },
  deleteText: {
    fontSize: 20,
  },
});

export default NoteCard;
