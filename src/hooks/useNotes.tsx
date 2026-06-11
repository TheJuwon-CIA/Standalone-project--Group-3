import { useNoteStore } from '../store/useNoteStore';

export function useNotes() {
  const notes = useNoteStore((state: any) => state.notes);
  const toggleFavorite = useNoteStore((state: any) => state.toggleFavorite);
  const favorites = notes.filter((note: any) => note.favorite);

  return {
    notes,
    favorites,
    recent: notes.slice(0, 5),
    findNote: (id: string) => notes.find((note: any) => note.id === id) || notes[0],
    toggleFavorite,
  };
}


