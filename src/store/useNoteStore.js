import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const nowLabel = () => {
  const date = new Date();
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

const makeExcerpt = (body) => {
  const cleaned = body.replace(/\s+/g, ' ').trim();
  return cleaned || 'No extra details yet.';
};

export const useNoteStore = create(
  persist(
    (set, get) => ({
      notes: [
        {
          id: 'welcome-note',
          title: 'Welcome to Noted',
          body: 'Use Noted for quick thoughts, reminders, ideas, and personal notes. Your notes are saved permanently on this device with AsyncStorage.',
          excerpt: 'Use Noted for quick thoughts, reminders, ideas, and personal notes.',
          date: nowLabel(),
          relativeTime: 'Just now',
          icon: 'document-text-outline',
          tags: ['Personal'],
          favorite: false,
          type: 'text',
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      ],
      addNote: ({ title, body, tags = ['Personal'] }) => {
        const timestamp = Date.now();
        const note = {
          id: `${timestamp}`,
          title: title.trim() || 'Untitled Note',
          body: body.trim(),
          excerpt: makeExcerpt(body),
          date: nowLabel(),
          relativeTime: 'Just now',
          icon: 'document-text-outline',
          tags,
          favorite: false,
          type: 'text',
          createdAt: timestamp,
          updatedAt: timestamp,
        };

        set((state) => ({ notes: [note, ...state.notes] }));
        return note;
      },
      updateNote: (id, updates) => {
        const timestamp = Date.now();
        set((state) => ({
          notes: state.notes.map((note) => {
            if (note.id !== id) return note;

            const nextTitle = updates.title?.trim() || 'Untitled Note';
            const nextBody = updates.body?.trim() || '';
            return {
              ...note,
              title: nextTitle,
              body: nextBody,
              excerpt: makeExcerpt(nextBody),
              relativeTime: 'Just now',
              updatedAt: timestamp,
            };
          }),
        }));
      },
      deleteNote: (id) => {
        set((state) => ({ notes: state.notes.filter((note) => note.id !== id) }));
      },
      toggleFavorite: (id) => {
        set((state) => ({
          notes: state.notes.map((note) => (
            note.id === id ? { ...note, favorite: !note.favorite, updatedAt: Date.now() } : note
          )),
        }));
      },
      getNoteById: (id) => get().notes.find((note) => note.id === id),
    }),
    {
      name: 'noted-personal-notes',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);