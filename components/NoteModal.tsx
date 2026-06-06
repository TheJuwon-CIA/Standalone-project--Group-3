import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Note } from '../types/note';
import { globalStyles } from '../styles/globalStyles';

interface NoteModalProps {
  visible: boolean;
  note: Note | null;
  onClose: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ visible, note, onClose }) => {
  if (!note) return null;

  const formattedDateTime = new Date(note.createdAt).toLocaleString(undefined, {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={globalStyles.modalOverlay}>
        <View style={globalStyles.modalContent}>
          <Text style={globalStyles.modalTitle}>{note.title}</Text>
          <Text style={globalStyles.modalDate}>{formattedDateTime}</Text>
          <Text style={globalStyles.modalBody}>{note.content}</Text>
          <TouchableOpacity style={globalStyles.closeButton} onPress={onClose}>
            <Text style={globalStyles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default NoteModal;
