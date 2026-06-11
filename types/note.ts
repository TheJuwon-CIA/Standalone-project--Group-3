export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface NoteStore {
  notes: Note[];
  addNote: (title: string, content: string) => boolean;
  deleteNote: (id: string) => void;
  updateNote: (id: string, title: string, content: string) => void;
}
