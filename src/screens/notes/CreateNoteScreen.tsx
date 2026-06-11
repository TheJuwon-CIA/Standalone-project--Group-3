import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { Button } from '../../components/common/Button';
import { Screen } from '../../components/common/Screen';
import { RADIUS, SHADOWS, SPACING, COLORS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useNoteStore } from '../../store/useNoteStore';

export default function CreateNoteScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const addNote = useNoteStore((state) => state.addNote);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const inputRef = useRef<TextInput>(null);

  const currentDateLabel = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase();

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, [recording]);

  const handleSave = () => {
    const note = addNote({ title, body, favorite: isFavorite, attachments });
    router.replace(`/note-detail?id=${note.id}` as any);
  };

  const insertText = (textToInsert: string) => {
    setBody((prev) => prev + textToInsert);
  };

  const handleMic = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        if (uri) {
          setAttachments([...attachments, { type: 'audio', uri }]);
        }
        setRecording(null);
      } else {
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording: newRecording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(newRecording);
      }
    } catch (err) {
      console.error('Failed to start/stop recording', err);
    }
  };

  const handleVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setAttachments([...attachments, { type: 'video', uri: result.assets[0].uri }]);
    }
  };

  const handleImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setAttachments([...attachments, { type: 'image', uri: result.assets[0].uri }]);
    }
  };

  const handleList = () => insertText('\n- ');
  const handleLink = () => insertText(' [Link Text](https://) ');
  const handleStats = () => {};

  const toolbarButtons = [
    { icon: recording ? 'stop-circle' : 'mic-outline', onPress: handleMic, color: recording ? '#EF4444' : theme.textSoft },
    { icon: 'videocam-outline', onPress: handleVideo, color: theme.textSoft },
    { icon: 'list', onPress: handleList, color: theme.textSoft },
    { icon: 'image-outline', onPress: handleImage, color: theme.textSoft },
    { icon: 'link', onPress: handleLink, color: theme.textSoft },
    { icon: 'stats-chart-outline', onPress: handleStats, color: theme.textSoft },
  ];

  return (
    <Screen scroll={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={26} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.logo, { color: theme.primary }]}>Noted</Text>
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)} style={[styles.iconButton, { marginRight: 8 }]}>
            <Ionicons name={isFavorite ? 'star' : 'star-outline'} size={26} color={theme.primary} />
          </TouchableOpacity>
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
          ref={inputRef}
          placeholder="Start writing your thoughts here..."
          placeholderTextColor={theme.label}
          value={body}
          onChangeText={setBody}
          multiline
          textAlignVertical="top"
          style={[styles.bodyInput, { color: theme.text }]}
        />

        {attachments.length > 0 && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.attachmentScroll}>
            {attachments.map((att, i) => (
              <View key={i} style={[styles.attachmentBox, { borderColor: theme.border, backgroundColor: theme.surface }]}>
                {att.type === 'image' ? (
                  <Image source={{ uri: att.uri }} style={styles.attachmentImage} />
                ) : (
                  <View style={styles.attachmentPlaceholder}>
                    <Ionicons name={att.type === 'video' ? 'videocam' : 'mic'} size={24} color={theme.primary} />
                    <Text style={[styles.attachmentText, { color: theme.textSoft }]}>{att.type}</Text>
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        )}

        <View style={[styles.toolbar, { backgroundColor: theme.surface, borderColor: theme.border }, SHADOWS.md]}>
          {toolbarButtons.map((btn, i) => (
            <TouchableOpacity key={i} style={styles.toolButton} onPress={btn.onPress}>
              <Ionicons name={btn.icon as any} size={22} color={btn.color} />
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
    minHeight: 150,
  },
  attachmentScroll: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  attachmentBox: {
    width: 80,
    height: 80,
    marginRight: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachmentImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  attachmentPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachmentText: {
    fontSize: 10,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  toolbar: {
    height: 58,
    borderWidth: 1,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.md,
  },
  toolButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
