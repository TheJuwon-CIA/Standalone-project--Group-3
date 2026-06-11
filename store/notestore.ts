import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, NoteStore } from '../types/note';

const useNoteStore = create<NoteStore>()(
  persist(
    (set, get) => ({
      notes: [],

      addNote: (title: string, content: string): boolean => {
        if (!content.trim()) return false;
        const newNote: Note = {
          id: Date.now().toString(),
          title: title.trim() || 'Untitled',
          content: content.trim(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ notes: [newNote, ...state.notes] }));
        return true;
      },

      deleteNote: (id: string): void => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }));
      },

      updateNote: (id: string, title: string, content: string): void => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, title: title.trim() || 'Untitled', content: content.trim() }
              : note
          ),
        }));
      },
    }),
    {
      name: 'notes-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useNoteStore;
