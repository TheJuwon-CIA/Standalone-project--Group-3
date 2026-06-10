import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/common/Header';
import { Screen } from '../../components/common/Screen';
import { RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useNoteStore } from '../../store/useNoteStore';


const renderMenuPopup = (activeMenu, theme, handleIconPress) => {
  if (!activeMenu) return null;

  switch (activeMenu) {
    case 'image':
      return (
        <View style={styles.popupBox}>
          <TouchableOpacity style={styles.popupOption}>
            <Ionicons name="camera-outline" size={20} color={theme.text} />
            <Text style={styles.popupText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.popupOption}>
            <Ionicons name="image-outline" size={20} color={theme.text} />
            <Text style={styles.popupText}>Choose from Album</Text>
          </TouchableOpacity>
        </View>
      );

    case 'audio':
      return (
        <View style={styles.popupBox}>
          <TouchableOpacity style={styles.popupOption}>
            <Ionicons name="mic-outline" size={20} color={theme.text} />
            <Text style={styles.popupText}>Record</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.popupOption}>
            <Ionicons name="folder-outline" size={20} color={theme.text} />
            <Text style={styles.popupText}>Choose from Recordings</Text>
          </TouchableOpacity>
        </View>
      );

    case 'text':
      return (
        <View style={[styles.popupBox, styles.textFormattingBox]}>
          <TouchableOpacity style={styles.textButton}><Text style={styles.boldText}>B</Text></TouchableOpacity>
          <TouchableOpacity style={styles.textButton}><Text style={styles.italicText}>I</Text></TouchableOpacity>
          <TouchableOpacity style={styles.textButton}><Text style={styles.underlineText}>U</Text></TouchableOpacity>
          <TouchableOpacity style={styles.textButton} onPress={() => handleIconPress(null)}>
            <Ionicons name="close" size={20} color={theme.textSoft} />
          </TouchableOpacity>
        </View>
      );

    default:
      return null;
  }
};

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


  const [activeMenu, setActiveMenu] = useState(null);
  const handleIconPress = (iconType) => {
    if (activeMenu === iconType) {
      setActiveMenu(null);
    } else {
      setActiveMenu(iconType);
    }
  };

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
    setActiveMenu(null);
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
    <Screen scroll={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 45}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
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
          
          <View style={{ flex: 1 }}>
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
            
            <View style={[styles.article, { backgroundColor: theme.surface, borderColor: theme.border, flex: isEditing ? 1 : undefined }, SHADOWS.sm]}>
              {isEditing ? (
                <TextInput
                  value={body}
                  onChangeText={setBody}
                  placeholder="Write your note..."
                  placeholderTextColor={theme.label}
                  multiline
                  textAlignVertical="top"
                  style={[styles.bodyInput, { color: theme.text, flex: 1 }]}
                />
              ) : (
                <Text style={[styles.paragraph, { color: theme.text }]}>{note.body || note.excerpt}</Text>
              )}
            </View>
          </View>

          {isEditing && renderMenuPopup(activeMenu, theme, handleIconPress)}

         
          {isEditing && (
            <SafeAreaView edges={['bottom']}>
              <View style={[styles.toolbar, { backgroundColor: theme.surface, borderColor: theme.border }, SHADOWS.md]}>
                <TouchableOpacity onPress={() => handleIconPress('audio')}>
                  <Ionicons name="mic-outline" size={22} color={theme.textSoft} />
                </TouchableOpacity>
          
                <TouchableOpacity onPress={() => handleIconPress('text')}>
                  <Ionicons name="text-outline" size={22} color={theme.textSoft} />
                </TouchableOpacity>
          
                <TouchableOpacity onPress={() => handleIconPress('image')}>
                  <Ionicons name="image-outline" size={22} color={theme.textSoft} />
                </TouchableOpacity>

                {['list', 'link', 'stats-chart-outline'].map((icon) => (
                  <TouchableOpacity key={icon} style={styles.toolButton}>
                    <Ionicons name={icon} size={22} color={theme.textSoft} />
                  </TouchableOpacity>
                ))}
              </View>
            </SafeAreaView>
          )}

        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    fontSize: 15,
    lineHeight: 23,
  },
  toolbar: {
    height: 58,
    borderWidth: 1,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: SPACING.lg,
    marginBottom: Platform.OS === 'android' ? 10 : 0, 
  },
  toolButton: {
    padding: SPACING.xs,
  },
  popupBox: {
    backgroundColor: '#1E1E1E',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginHorizontal: SPACING.lg,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  popupOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  popupText: {
    color: '#FFFFFF',
    marginLeft: SPACING.md,
    fontSize: 16,
  },
  textFormattingBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textButton: {
    padding: SPACING.sm,
  },
  boldText: { color: '#FFF', fontWeight: 'bold', fontSize: 18 },
  italicText: { color: '#FFF', fontStyle: 'italic', fontSize: 18 },
  underlineText: { color: '#FFF', textDecorationLine: 'underline', fontSize: 18 },
});