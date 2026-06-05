import { useNoteStore } from '../store/useNoteStore';

export function useNotes() {
  const notes = useNoteStore((state) => state.notes);
  const favorites = notes.filter((note) => note.favorite);

  return {
    notes,
    favorites,
    recent: notes.slice(0, 5),
    findNote: (id) => notes.find((note) => note.id === id) || notes[0],
  };
}
